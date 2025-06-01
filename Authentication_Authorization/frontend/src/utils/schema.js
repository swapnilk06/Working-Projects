import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username required"),
  password: z.string().min(6, "Password must be 6+ chars"),
  role: z.enum(["admin", "manager", "user"]),
});

export const loginSchema = z.object({
  username: z.string().min(3, "Username required"),
  password: z.string().min(6, "Password must be 6+ chars"),
});
