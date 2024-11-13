import { serverSupabaseUser } from '#supabase/server'
import { db } from '~/server/database/connection'
import { and, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    })
  }

  const user = await serverSupabaseUser(event)

  try {
    await db.delete(progressSavingsTargets)
    .where(
      and(
        eq(progressSavingsTargets.id, +id),
        eq(progressSavingsTargets.user_id, user!.id)
      )
    )

    return {
      message: 'Progres target tabungan berhasil dihapus',
    }
  } catch (error: any) {
    console.error(error)
    throw createError({
      statusCode: error.status,
      statusMessage: error.message || error.data?.message || 'Internal Server Error',
    })
  }
})
