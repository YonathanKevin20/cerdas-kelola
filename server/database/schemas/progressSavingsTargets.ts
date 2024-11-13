import { sql } from 'drizzle-orm'
import { bigint, bigserial, numeric, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'

export const progressSavingsTargets = pgTable('progress_savings_targets', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  created_at: timestamp({ withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
  user_id: uuid().default(sql`auth.uid()`).notNull(),
  savings_target_id: bigint({ mode: 'number' }).notNull().references(() => savingsTargets.id, { onDelete: 'cascade' }),
  amount: numeric({ precision: 10, scale: 2 }).notNull(),
})

export type SelectProgressSavingTarget = typeof progressSavingsTargets.$inferSelect
export type InsertProgressSavingTarget = typeof progressSavingsTargets.$inferInsert
