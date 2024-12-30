import { Transaction } from "@/types/transaction"
import { axiosClient } from "@/lib/client"

export const getAllTransactionsQuery = () => {
  return axiosClient.get<{
    error: false
    transactions: Transaction[]
  }>("/transactions")
}
