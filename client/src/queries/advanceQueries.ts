import { dailyAdvanceTotal, fetchAdvances } from "@/api/advanceApi";
import { useQuery } from "@tanstack/react-query";

export const fetchDailyAdvance = () => {
    return useQuery({
        queryKey: ['advances'],
        queryFn: fetchAdvances
    })
}

export const getDailyAdvanceTotal = () => {
    return useQuery({
        queryKey: ['daily-advance-total'],
        queryFn: dailyAdvanceTotal
    })
}