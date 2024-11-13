import { serverSupabaseUser } from '#supabase/server'
import { db } from '~/server/database/connection'
import { desc, eq, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  const items = await db.select({
    id: savingsTargets.id,
    target_name: savingsTargets.target_name,
    target_amount: savingsTargets.target_amount,
    current_amount: savingsTargets.current_amount,
    start_date: savingsTargets.start_date,
    target_date: savingsTargets.target_date,
    progress_amount: sql<string>`COALESCE(SUM(${progressSavingsTargets.amount}), 0)`.as('progress_amount'),
    is_progress_done_today: sql<boolean>`
      CASE WHEN SUM(
        CASE WHEN DATE(${progressSavingsTargets.created_at}) = CURRENT_DATE OR DATE(${savingsTargets.created_at}) = CURRENT_DATE
        THEN 1
        ELSE 0 END
      ) > 0 THEN TRUE ELSE FALSE END
    `.as('is_progress_done_today'),
  })
  .from(savingsTargets)
  .leftJoin(progressSavingsTargets, eq(savingsTargets.id, progressSavingsTargets.savings_target_id))
  .where(eq(savingsTargets.user_id, user!.id))
  .groupBy(savingsTargets.id)
  .orderBy(desc(savingsTargets.created_at))

  return items
})
