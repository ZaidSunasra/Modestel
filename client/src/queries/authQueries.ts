import { getAllAccount } from "@/api/authApi"
import { useQuery } from "@tanstack/react-query"

export const fetchAllAccounts = () => {
    return useQuery({
        queryFn: getAllAccount,
        queryKey: ['all-accounts']
    }) 
}