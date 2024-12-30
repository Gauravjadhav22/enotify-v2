import { z } from 'zod';

const resellerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  phoneNumber: z.string(),
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type UserStatus = z.infer<typeof userStatusSchema>
const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  phoneNumber: z.string(),
  reseller: resellerSchema,
});

export const userQueueItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  connectedNumeber: z.string(),
  isLoggedIn: z.boolean(),
  profileName: z.string(),
  profilePicture: z.string().url(),
  date: z.string().datetime(),
  queueCount: z.number().int(),
  dateNormal: z.string(),
  user: userSchema,
});

export type UserQueueItem = z.infer<typeof userQueueItemSchema>;

export const userQueueListSchema = z.array(userQueueItemSchema);
