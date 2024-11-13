import { z } from 'zod'

export const TransactionCreateSchema = z.object({
  category_name: z.string().min(1, 'Silakan pilih kategori'),
  amount: z.string().min(1, 'Silakan masukkan jumlah'),
  transaction_date: z.string(),
  description: z.string(),
})

export type TransactionCreate = z.output<typeof TransactionCreateSchema>
