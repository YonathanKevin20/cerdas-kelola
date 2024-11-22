import { sql } from 'drizzle-orm'
import { bigint, bigserial, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'

export const progressLearningModules = pgTable('progress_learning_modules', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  created_at: timestamp({ withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
  user_id: uuid().default(sql`auth.uid()`).notNull(),
  learning_module_id: bigint({ mode: 'number' }).notNull(),
  completed_at: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
})

export type SelectProgressLearningModule = typeof progressLearningModules.$inferSelect
export type InsertProgressLearningModule = typeof progressLearningModules.$inferInsert
