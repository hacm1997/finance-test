import { Transaction } from '@/libs/shared/api/requests/react-query';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { FaArrowsUpDown } from 'react-icons/fa6';
import 'dayjs/locale/es';

dayjs.locale('es');

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'concept',
    header: 'Concepto',
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Monto
          <FaArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatPrice = row.original.amount;
      return <p className="pl-4">${formatPrice.toLocaleString('es-CO')}</p>;
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Fecha
          <FaArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.date;
      return dayjs(Number(date)).format('MMMM-DD-YYYY');
    },
  },
  {
    accessorKey: 'user.name',
    header: 'Usuario',
  },
  {
    accessorKey: 'user.role',
    header: 'Rol de usuario',
  },
];
