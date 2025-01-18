import { z } from 'zod';

export const addExpenseSchema = z.object({
    voucher: z.enum(['hotel', 'room service', 'kitchen', 'auto expense', 'cash discount']),
    name: z.string(),
    amount: z.coerce.number(),
    date: z.coerce.date()
})

export const editExpenseSchema = z.object({
    voucher: z.enum(['hotel', 'room service', 'kitchen', 'auto expense', 'cash discount']).optional(),
    name: z.string().optional(),
    amount: z.coerce.number().optional(),
})