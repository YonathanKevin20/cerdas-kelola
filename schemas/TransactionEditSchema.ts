import { z } from 'zod'

export const TransactionEditSchema = z.object({
  category_name: z.string().min(1, 'Silakan pilih kategori'),
  amount: z.string().min(1, 'Silakan masukkan jumlah'),
  transaction_date: z.string(),
  description: z.string(),
})

export type TransactionEdit = z.output<typeof TransactionEditSchema>
