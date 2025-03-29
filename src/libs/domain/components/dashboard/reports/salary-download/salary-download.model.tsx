import { ReportTransaction } from "@/libs/shared/api/requests/react-query";

export interface SalaryDownloadProps {
    reportConcept: ReportTransaction[];
    exportToCSV: () => void;
}