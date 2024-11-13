import { serverSupabaseUser } from '#supabase/server'
import { db } from '~/server/database/connection'
import { and, desc, eq, gte, lte } from 'drizzle-orm'
import dayjs from 'dayjs'

const getDatetimeRange = (year: number, month: number) => {
  const start = dayjs().year(year).month(month - 1).startOf('month')
  const end = start.clone().endOf('month')

  return {
    start: start.format('YYYY-MM-DD'),
    end: end.format('YYYY-MM-DD'),
  }
}

export default defineEventHandler(async (event) => {
  const { year, month } = getQuery(event)

  if (!year || !month) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    })
  }

  const { start, end } = getDatetimeRange(+year, +month)

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
      eq(transactions.user_id, user!.id),
      and(
        gte(transactions.transaction_date, start),
        lte(transactions.transaction_date, end)
      )
    )
  )
  .orderBy(desc(transactions.transaction_date), desc(transactions.created_at))

  return items
})
