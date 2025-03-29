import { useTransactions } from '@/libs/hooks/use-transactions';
import { Graphic } from './graphic/graphic';
import { SalaryDownload } from './salary-download/salary-download';
import { ROLES } from '@/libs/utils/constant';
import { useReportConcept } from '@/libs/hooks/use-reports-concept';

interface Props {
  user_role: string | undefined
}
export default function Reports({ user_role }: Props) {
  const { reportConcept, exportToCSV } = useReportConcept();
  return (
    <>
      {user_role === ROLES.ADMIN &&
        <div className="flex flex-col gap-20 w-full">
          <h2 className="font-bold text-3xl text-black">
            Sistema de gestión de Ingresos y Gastos
          </h2>
          <div className="flex justify-between px-16 gap-8 w-full">
            <div className='flex flex-col gap-6'>
              <h3 className="font-bold text-xl text-black">Movimientos</h3>
              <Graphic reportConcept={reportConcept} />
            </div>
            <div className='flex flex-col gap-6'>
              <h3 className="font-bold text-xl text-black">Saldo</h3>
              <SalaryDownload reportConcept={reportConcept} exportToCSV={exportToCSV} />
            </div>
          </div>
        </div>
      }
    </>
  );
}
