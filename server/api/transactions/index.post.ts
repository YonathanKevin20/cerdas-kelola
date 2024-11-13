import { serverSupabaseUser } from '#supabase/server'
import { db } from '~/server/database/connection'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const user = await serverSupabaseUser(event)

  try {
    await db.insert(transactions)
    .values({
      user_id: user!.id,
      category_name: body.category_name,
      category_type: body.category_type,
      amount: body.amount,
      transaction_date: body.transaction_date,
      description: body.description.trim() || null,
    })

    setResponseStatus(event, 201)
    return {
      message: 'Transaksi berhasil ditambahkan',
    }
  } catch (error: any) {
    console.error(error)
    throw createError({
      statusCode: error.status,
      statusMessage: error.message || error.data?.message || 'Internal Server Error',
    })
  }
})
