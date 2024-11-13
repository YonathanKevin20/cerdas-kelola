import { sql } from 'drizzle-orm'
import { bigserial, date, numeric, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const savingsTargets = pgTable('savings_targets', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  created_at: timestamp({ withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
  user_id: uuid().default(sql`auth.uid()`).notNull(),
  target_name: varchar({ length: 50 }).notNull(),
  target_amount: numeric({ precision: 10, scale: 2 }).notNull(),
  current_amount: numeric({ precision: 10, scale: 2 }).notNull(),
  start_date: date({ mode: 'string' }).notNull(),
  target_date: date({ mode: 'string' }).notNull(),
})

export type SelectSavingTarget = typeof savingsTargets.$inferSelect
export type InsertSavingTarget = typeof savingsTargets.$inferInsert
