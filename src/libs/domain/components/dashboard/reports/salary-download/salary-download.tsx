import React from 'react';
import { SalaryDownloadProps } from './salary-download.model';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const SalaryDownload = ({
    reportConcept,
    exportToCSV,
}: SalaryDownloadProps) => {
    const [loading, setLoading] = React.useState(false);
    const totalAmount = (reportConcept ?? []).reduce(
        (sum, { amount }) => sum + amount,
        0
    );
    const downloadReport = () => {
        setLoading(true);
        try {
            exportToCSV();
            toast('Descargado terminada');
        } catch (error) {
            console.error('Error descargando reporte:', error);
            toast('Error al descargar reporte');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col gap-10">
            <span>${totalAmount.toLocaleString('es-CO')}</span>
            <Button
                className="cursor-pointer w-[180px]"
                onClick={downloadReport}
                disabled={loading}
            >
                {!loading ? 'Descargar CSV' : 'Cargando...'}
            </Button>
        </div>
    );
};
