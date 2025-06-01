import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3).max(25),
  password: z.string().min(6),
  role: z.enum(['admin', 'manager', 'user']),
});

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});
