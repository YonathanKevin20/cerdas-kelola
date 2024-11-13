import { sql } from 'drizzle-orm'
import { bigserial, date, numeric, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const categoryTypeEnum = pgEnum('category_type', ['income', 'expense'])

export const transactions = pgTable('transactions', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  created_at: timestamp({ withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
  user_id: uuid().default(sql`auth.uid()`).notNull(),
  category_name: varchar({ length: 50 }).notNull(),
  category_type: categoryTypeEnum().notNull(),
  amount: numeric({ precision: 10, scale: 2 }).notNull(),
  transaction_date: date({ mode: 'string' }).notNull(),
  description: text(),
})

export type SelectTransaction = typeof transactions.$inferSelect
export type InsertTransaction = typeof transactions.$inferInsert
