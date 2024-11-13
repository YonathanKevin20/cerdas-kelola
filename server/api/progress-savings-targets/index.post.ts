import { serverSupabaseUser } from '#supabase/server'
import { db } from '~/server/database/connection'
import { and, eq, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const user = await serverSupabaseUser(event)

  const isProgressDoneTodayItems = await db.select({
    id: progressSavingsTargets.id,
  })
  .from(progressSavingsTargets)
  .where(
    and(
      eq(progressSavingsTargets.user_id, user!.id),
      eq(progressSavingsTargets.savings_target_id, body.savings_target_id),
      sql<string>`DATE(${progressSavingsTargets.created_at}) = CURRENT_DATE`,
    )
  )
  .limit(1)

  const isTargetJustCreatedItems = await db.select({
    id: savingsTargets.id,
  })
  .from(savingsTargets)
  .where(
    and(
      eq(savingsTargets.id, body.savings_target_id),
      eq(savingsTargets.user_id, user!.id),
      sql<string>`DATE(${savingsTargets.created_at}) = CURRENT_DATE`,
    )
  )

  const isProgressDoneTodayItem = isProgressDoneTodayItems[0]
  const isTargetJustCreatedItem = isTargetJustCreatedItems[0]

  if (isProgressDoneTodayItem || isTargetJustCreatedItem) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Progres target tabungan hari ini sudah dibuat',
    })
  }

  try {
    await db.insert(progressSavingsTargets)
    .values({
      user_id: user!.id,
      savings_target_id: body.savings_target_id,
      amount: body.amount,
    })

    setResponseStatus(event, 201)
    return {
      message: 'Progres target tabungan berhasil dibuat',
    }
  } catch (error: any) {
    console.error(error)
    throw createError({
      statusCode: error.status,
      statusMessage: error.message || error.data?.message || 'Internal Server Error',
    })
  }
})
