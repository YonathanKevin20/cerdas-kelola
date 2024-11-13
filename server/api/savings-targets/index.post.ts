import { serverSupabaseUser } from '#supabase/server'
import { db } from '~/server/database/connection'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const user = await serverSupabaseUser(event)

  try {
    await db.insert(savingsTargets)
    .values({
      user_id: user!.id,
      target_name: body.target_name,
      target_amount: body.target_amount,
      current_amount: body.current_amount,
      start_date: body.start_date,
      target_date: body.target_date,
    })

    setResponseStatus(event, 201)
    return {
      message: 'Target tabungan berhasil dibuat',
    }
  } catch (error: any) {
    console.error(error)
    throw createError({
      statusCode: error.status,
      statusMessage: error.message || error.data?.message || 'Internal Server Error',
    })
  }
})
