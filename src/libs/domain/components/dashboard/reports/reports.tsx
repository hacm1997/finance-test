import { useTransactions } from '@/libs/hooks/use-transactions';
import { Graphic } from './graphic/graphic';

export default function Reports() {
  const { transactions } = useTransactions();
  return (
    <div className="flex flex-col gap-20 w-full">
      <h2 className="font-bold text-3xl text-black">
        Sistema de gestión de Ingresos y Gastos
      </h2>
      <div className="flex gap-8">
        <Graphic transactions={transactions} />
      </div>
    </div>
  );
}
