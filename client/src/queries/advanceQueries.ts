import { dailyAdvanceTotal, fetchAdvances, monthlyAdvance } from "@/api/advanceApi";
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

export const getMonthlyAdvance = () => {
    return useQuery({
        queryKey: ['monthly-advance'],
        queryFn: monthlyAdvance
    }) 
}