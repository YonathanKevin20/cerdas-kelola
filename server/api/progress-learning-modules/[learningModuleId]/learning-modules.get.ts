import { serverSupabaseUser } from '#supabase/server'
import { db } from '~/server/database/connection'
import { and, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const learningModuleId = getRouterParam(event, 'learningModuleId')

  if (!learningModuleId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    })
  }

  const user = await serverSupabaseUser(event)

  const items = await db.select({
    id: progressLearningModules.id,
    completed_at: progressLearningModules.completed_at,
  })
  .from(progressLearningModules)
  .where(
    and(
      eq(progressLearningModules.learning_module_id, +learningModuleId),
      eq(progressLearningModules.user_id, user!.id)
    )
  )
  .limit(1)

  if (items.length === 0) {
    return {
      is_completed: false,
    }
  }

  const item = items.map((item) => ({
    is_completed: !!item.completed_at,
  }))[0]

  return item
})
