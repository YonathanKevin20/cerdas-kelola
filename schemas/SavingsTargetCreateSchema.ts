import { z } from 'zod'

export const SavingsTargetCreateSchema = z.object({
  target_name: z.string().min(1, 'Silakan masukkan target yang ingin dicapai'),
  target_amount: z.string().min(1, 'Silakan masukkan jumlah target'),
  current_amount: z.string().min(1, 'Silakan masukkan jumlah yang dipunya saat ini'),
  start_date: z.string()
    .refine(date => !isNaN(new Date(date).getTime()), {
      message: 'Tanggal mulai harus berupa tanggal yang valid',
    })
    .refine(date => {
      const today = new Date()
      today.setHours(0, 0, 0, 0) // Clear time portion
      return new Date(date) >= today
    }, {
      message: 'Tanggal mulai tidak boleh kurang dari hari ini',
    }),
  target_date: z.string()
    .refine(date => !isNaN(new Date(date).getTime()), {
      message: 'Tanggal target harus berupa tanggal yang valid',
    }),
}).refine((data) => {
  const startDate = new Date(data.start_date)
  const targetDate = new Date(data.target_date)
  const minimumTargetDate = new Date(startDate)
  minimumTargetDate.setDate(minimumTargetDate.getDate() + 7)
  return targetDate >= minimumTargetDate
}, {
  message: 'Tanggal target harus minimal 7 hari setelah tanggal mulai',
  path: ['target_date'],
})

export type SavingsTargetCreate = z.output<typeof SavingsTargetCreateSchema>
