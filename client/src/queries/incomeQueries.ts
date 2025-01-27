import { dailyCashTotal, dailyIncomeByBookingMode, dailyIncomeByPaymentMode, dailyIncomeBySources } from "@/api/incomeApi"
import { useQuery } from "@tanstack/react-query"

export const getDailyCashTotal = () => {
    return useQuery({
        queryKey: ['daily-cash-total'],
        queryFn: dailyCashTotal
    })
}

export const getDailyIncomeByPaymentMode = () => {
    return useQuery({
        queryKey: ['daily-income-payment-mode'],
        queryFn: dailyIncomeByPaymentMode
    })
}

export const getDailyIncomeByBookingMode = () => {
    return useQuery({
        queryKey: ['daily-income-payment-mode'],
        queryFn: dailyIncomeByBookingMode
    })
}

export const getDailyIncomeBySources = () => {
    return useQuery({
        queryKey: ['daily-income-source'],
        queryFn: dailyIncomeBySources
    })
}