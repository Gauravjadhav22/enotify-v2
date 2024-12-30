import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
]);


const resellerSchema = z.object({
  id: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
});

const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string().optional(),
  name: z.string().optional(),
  userStatus: z.string().optional(),
  timezone: z.string().optional(),
  phoneNumber: z.string(),
  quota: z.number().optional(),
  unlimitedMonths:  z.number().optional(),
  bulkMessageAllowed:  z.boolean().optional(),
  advancedApiAllowed:  z.boolean().optional(),
  rechargeType: z.string().optional(),
  quotaValidity: z.string().optional(),
  unlimitedValidity: z.string().optional(),
  notificationId: z.string().optional(),
  reseller: resellerSchema.optional(),
  status: userStatusSchema,
  role: userRoleSchema, // Strict validation
  createdAt: z.coerce.date().or(z.string()),
  updatedAt: z.coerce.date().or(z.string()),
});

export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
