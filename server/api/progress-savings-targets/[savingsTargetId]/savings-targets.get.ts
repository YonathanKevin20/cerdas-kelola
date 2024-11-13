import { serverSupabaseUser } from '#supabase/server'
import { db } from '~/server/database/connection'
import { and, asc, eq, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const savingsTargetId = getRouterParam(event, 'savingsTargetId')

  if (!savingsTargetId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    })
  }

  const user = await serverSupabaseUser(event)

  const items = await db.select({
    id: progressSavingsTargets.id,
    date: sql<string>`DATE(${progressSavingsTargets.created_at})`.as('date'),
    amount: progressSavingsTargets.amount,
  })
  .from(progressSavingsTargets)
  .where(
    and(
      eq(progressSavingsTargets.savings_target_id, +savingsTargetId),
      eq(progressSavingsTargets.user_id, user!.id)
    )
  )
  .orderBy(asc(progressSavingsTargets.created_at))

  const savingTargetsItem = await db.select({
    date: sql<string>`DATE(${savingsTargets.created_at})`.as('date'),
    amount: savingsTargets.current_amount,
  })
  .from(savingsTargets)
  .where(
    and(
      eq(savingsTargets.id, +savingsTargetId),
      eq(savingsTargets.user_id, user!.id)
    )
  )
  .limit(1)

  const mergedItems = savingTargetsItem.concat(items)

  return mergedItems
})
