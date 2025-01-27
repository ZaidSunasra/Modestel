import { fetchReports } from "@/api/reportApi";
import { useQuery } from "@tanstack/react-query";

export const fetchDailyReport = () => {
    return useQuery({
        queryKey: ['reports'],
        queryFn: fetchReports
    })
}