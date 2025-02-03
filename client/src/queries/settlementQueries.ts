import { monthlySettlement } from "@/api/settlementApi"
import { useQuery } from "@tanstack/react-query"

export const getMonthlySettlement = () => {
    return useQuery({
        queryKey: ['settlement-monthly'],
        queryFn: monthlySettlement
    })
}