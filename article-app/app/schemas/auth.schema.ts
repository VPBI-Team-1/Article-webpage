import { z } from "zod";

export const registerSchema = z.object({
  email: z.email({ error: "Email format not valid" }),
  name: z.string().min(4, { error: "Name has 4 length minimun" }),
  password: z.string().min(8, { error: "Password has 8 length minimum" }),
});

export const loginSchema = z.object({
  email: z.email({ error: "Email format not valid" }),
  password: z.string().min(8, { error: "Password has 8 length minimum" }),
});
