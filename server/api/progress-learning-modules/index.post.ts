import { serverSupabaseUser } from '#supabase/server'
import { db } from '~/server/database/connection'
import { and, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const user = await serverSupabaseUser(event)

  const isAlreadyCompletedItems = await db.select({
    id: progressLearningModules.id,
  })
  .from(progressLearningModules)
  .where(
    and(
      eq(progressLearningModules.user_id, user!.id),
      eq(progressLearningModules.learning_module_id, body.learning_module_id),
    )
  )
  .limit(1)

  const isAlreadyCompletedItem = isAlreadyCompletedItems[0]

  if (isAlreadyCompletedItem) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Progres jalur pembelajaran sudah dibuat',
    })
  }

  try {
    await db.insert(progressLearningModules)
    .values({
      user_id: user!.id,
      learning_module_id: body.learning_module_id,
      completed_at: new Date().toISOString(),
    })

    setResponseStatus(event, 201)
    return {
      message: 'Progres jalur pembelajaran berhasil dibuat',
    }
  } catch (error: any) {
    console.error(error)
    throw createError({
      statusCode: error.status,
      statusMessage: error.message || error.data?.message || 'Internal Server Error',
    })
  }
})
