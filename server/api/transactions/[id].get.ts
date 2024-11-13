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

  const items = await db.select({
    id: transactions.id,
    category_name: transactions.category_name,
    category_type: transactions.category_type,
    amount: transactions.amount,
    transaction_date: transactions.transaction_date,
    description: transactions.description,
  })
  .from(transactions)
  .where(
    and(
      eq(transactions.id, +id),
      eq(transactions.user_id, user!.id)
    )
  )
  .limit(1)

  if (items.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    })
  }

  const item = items[0]

  return item
})
