import { fetchReports, getReportById } from "@/api/reportApi";
import { useQuery } from "@tanstack/react-query";

export const fetchDailyReport = () => {
    return useQuery({
        queryKey: ['reports'],
        queryFn: fetchReports
    })
}

export const fetchReportById = (id : string) => {
    return useQuery({
        queryKey: ['report-by-id', id],
        queryFn: () => getReportById(id),
        enabled: !!id
    })
}