'use client';
import { useTransactions } from '@/libs/hooks/use-transactions';
import { DataTable } from './data-table';
import { columns } from './Columns';
import { Button } from '@/components/ui/button';
import { CreateTransaction } from './modal';
import { useState } from 'react';
import { useMe } from '@/libs/hooks/use-me';
import { ROLES } from '@/libs/utils/constant';

export default function Transaction() {
  const { transactions, refetch } = useTransactions();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useMe();

  const onClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="text-black">
        <h2 className="font-bold text-3xl">Ingresos y egresos</h2>
      </div>
      {user && user.user.role === ROLES.ADMIN && (
        <div className="text-black flex justify-end pr-4">
          <Button
            className="cursor-pointer w-28"
            onClick={() => setIsOpen(!isOpen)}
          >
            Nuevo
          </Button>
        </div>
      )}
      <div className="container mx-auto py-10">
        {transactions && <DataTable columns={columns} data={transactions} />}
      </div>

      <CreateTransaction isOpen={isOpen} onClose={onClose} refetch={refetch} />
    </div>
  );
}
