import { z } from 'zod';

export const addReportSchema = z.object({
    room_no: z.string(),
    bill_no: z.string(),
    tariff: z.coerce.number(),
    c_gst: z.coerce.number(),
    s_gst: z.coerce.number(),
    food: z.coerce.number(),
    laundry: z.coerce.number(),
    extra: z.coerce.number(),
    total: z.coerce.number(),
    payment_mode: z.enum(['cash', 'card swipe', 'bank transfer', 'wallet', 'ota pay']),
    booking_mode: z.enum(['walking', 'ota', 'company', 'banquet', 'wastage', 'extra']),
    date: z.coerce.date()
});

export const editReportSchema = z.object({
    room_no: z.string().optional(),
    bill_no: z.string().optional(),
    tariff: z.coerce.number().optional(),
    c_gst: z.coerce.number().optional(),
    s_gst: z.coerce.number().optional(),
    food: z.coerce.number().optional(),
    laundry: z.coerce.number().optional(),
    extra: z.coerce.number().optional(),
    total: z.coerce.number().optional(),
    payment_mode: z.enum(['cash', 'card swipe', 'bank transfer', 'wallet', 'ota pay']).optional(),
    booking_mode: z.enum(['walking', 'ota', 'company', 'banquet', 'wastage', 'extra']).optional()
});