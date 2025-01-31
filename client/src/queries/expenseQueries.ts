import { dailyExpenseTotal, dailyExpenseTotalByCategory, fetchExpenses, monthlyExpenseByCategory, monthlyTotalExpense } from "@/api/expenseApi";
import { useQuery } from "@tanstack/react-query";

export const fetchDailyExpense = () => {
    return useQuery({
        queryKey: ['expenses'],
        queryFn: fetchExpenses
    })
}

export const getDailyExpenseTotal = () => {
    return useQuery({
        queryKey: ['daily-expense-total'],
        queryFn: dailyExpenseTotal
    })
}

export const getDailyExpenseByCategory = () => {
    return useQuery({
        queryKey: ['daily-expense-category'],
        queryFn: dailyExpenseTotalByCategory
    })
}

export const getMonthlyExpenseByCategory = () => {
    return useQuery({
        queryKey: ['monthly-expense-category'],
        queryFn: monthlyExpenseByCategory
    })
}

export const getMonthlyTotalExpense = () => {
    return useQuery({
        queryKey: ['monthly-total-expense'],
        queryFn: monthlyTotalExpense
    })
}