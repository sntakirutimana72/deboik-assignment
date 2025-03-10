import { z } from 'zod'

import { saltAndHashPassword } from './password-strategy'

export const zz = {
  // Optional or not set
  optionalOrNotSet: (primary: z.ZodSchema, r?: null) => z.optional(
    z.union([
      primary,
      z.string().refine((val) => !val.trim()).transform(() => r),
    ])
  ),
  // Ensure provided string value ain't empty
  notEmpty: (message = 'invalid input') => (
    z
      .string()
      .refine(val => !!val.trim(), { message })
  ),
}

export const employeeSchemas = {
  create: z.object({
    firstname: zz.notEmpty("Firstname can't be empty"),
    lastname: zz.notEmpty("Lastname can't be empty"),
    email: z.string().email('Invalid email'),
    phone: z.string().regex(/^(\+[1-9](\d{1,2})?)?\d{7,10}/),
    role: z.enum(['Admin', 'Staff']),
  }),
  patch: z.object({
    firstname: zz.optionalOrNotSet(zz.notEmpty("Firstname can't be empty")),
    lastname: zz.optionalOrNotSet(zz.notEmpty("Lastname can't be empty")),
    phone: zz.optionalOrNotSet(z.string().regex(/^(\+[1-9](\d{1,2})?)?\d{7,10}/)),
  }),
}
export type EmployeeCreatePayload = z.infer<typeof employeeSchemas.create>
export type EmployeePatchPayload = z.infer<typeof employeeSchemas.patch>

export const userSchemas = {
  create: z.object({
    email: z.string().email('Invalid email'),
    password: zz.notEmpty().transform(saltAndHashPassword),
  }),
  credentials: z.object({
    email: z.string().email('Invalid email'),
    password: zz.notEmpty(),
  }),
}
export type UserCreatePayload = z.infer<typeof userSchemas.create>
export type UserCredsPayload = z.infer<typeof userSchemas.credentials>
