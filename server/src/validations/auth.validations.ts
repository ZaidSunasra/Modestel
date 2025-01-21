import z from 'zod';

export const signupSchema = z.object({
    username: z.string(),
    password: z.string(),
    role: z.enum(['admin', 'user', 'receptionist'])
})

export const loginSchema = z.object({
    username: z.string(),
    password: z.string()
})