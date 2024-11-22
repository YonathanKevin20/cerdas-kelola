import { serverSupabaseUser } from '#supabase/server'
import { db } from '~/server/database/connection'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  const items = await db.select({
    learning_module_id: progressLearningModules.learning_module_id,
    completed_at: progressLearningModules.completed_at,
  })
  .from(progressLearningModules)
  .where(
    eq(progressLearningModules.user_id, user!.id)
  )

  return items
})
