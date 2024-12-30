import React from 'react';
import { Transaction } from '@/types/transaction.ts';

export type TransactionDialogType = 'view' | 'edit' | 'delete'|'invite';

interface TransactionContextType {
  open: TransactionDialogType | null;
  setOpen: (type: TransactionDialogType | null) => void;
  currentTransaction: Transaction | null;
  setCurrentTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
}

const TransactionContext = React.createContext<TransactionContextType | null>(null);

interface Props {
  children: React.ReactNode;
  value: TransactionContextType;
}

export default function TransactionContextProvider({ children, value }: Props) {
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTransactionContext = () => {
  const transactionContext = React.useContext(TransactionContext);

  if (!transactionContext) {
    throw new Error(
      'useTransactionContext must be used within <TransactionContext.Provider>'
    );
  }

  return transactionContext;
};
