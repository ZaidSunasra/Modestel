import {z} from 'zod';

export const addAdvanceSchema = z.object({
    name: z.string(),
    amount: z.coerce.number(),
    date: z.coerce.date()
})

export const editAdvanceSchema = z.object({
    name: z.string().optional(),
    amount: z.coerce.number().optional()
})