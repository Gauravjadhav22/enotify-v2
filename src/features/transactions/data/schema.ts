import { z } from 'zod';

const transactionSchema = z.object({
  id: z.string().uuid(), // Transaction ID
  fromUserId: z.string().uuid(), // ID of the user initiating the transaction
  toUserId: z.string().uuid(), // ID of the user receiving the transaction
  amount: z.number().positive(), // Positive transaction amount
  type: z.enum(['CREDIT', 'DEBIT']), // Transaction type
  unlimitedMonths: z.number().int().nonnegative(), // Number of unlimited months
  unlimitedVoucherId: z.string().uuid().nullable().optional(), // Optional voucher ID
  timestamp: z.string().datetime(), // ISO datetime for transaction timestamp
  toUser: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
    })
    .nullable()
    .optional(), // Optional recipient user information
  fromUser: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
    })
    .nullable()
    .optional(), // Optional sender user information
  instanceId: z.string().uuid().nullable().optional(), // Optional instance ID
  instance: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
    })
    .nullable()
    .optional(), // Optional instance information
});

export type Transaction = z.infer<typeof transactionSchema>;
export const TransactionListSchema = z.array(transactionSchema);
