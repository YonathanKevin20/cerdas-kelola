import { z } from 'zod'

export const ProgressSavingsTargetCreateSchema = z.object({
  amount: z.string().min(1, 'Silakan masukkan jumlah'),
})

export type ProgressSavingsTargetCreate = z.output<typeof ProgressSavingsTargetCreateSchema>
