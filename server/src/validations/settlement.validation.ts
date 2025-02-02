import { z } from "zod";

export const addSettlementSchema = z.object({
    hotel: z.coerce.number(),
    bank: z.coerce.number(),
    date: z.coerce.date()
})

export const editSettlementSchema = z.object({
    hotel: z.coerce.number(),
    bank: z.coerce.number(),
})