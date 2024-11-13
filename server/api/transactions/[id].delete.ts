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
    await db.delete(transactions)
    .where(
      and(
        eq(transactions.id, +id),
        eq(transactions.user_id, user!.id)
      )
    )

    return {
      message: 'Transaksi berhasil dihapus',
    }
  } catch (error: any) {
    console.error(error)
    throw createError({
      statusCode: error.status,
      statusMessage: error.message || error.data?.message || 'Internal Server Error',
    })
  }
})
