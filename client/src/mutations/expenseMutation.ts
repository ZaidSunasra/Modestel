import { addExpense, deleteExpense, editExpense } from "@/api/expenseApi";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const customMutation =<T> (mutationFn : (data: T) => Promise<any>) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: (data: any) => {
            toast({
                variant: "default",
                title: data.msg,
                duration: 3000
            });
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            queryClient.invalidateQueries({ queryKey: ['daily-expense-total'] });
            queryClient.invalidateQueries({ queryKey: ['daily-expense-category'] });
        },
        onError: (error: any) => {
            toast({
                variant: "destructive",
                title: error.response?.data?.msg || "An error occurred",
                duration: 3000
            });
        }
    });
}

export const useAddExpense = () => customMutation(addExpense);
export const useEditExpense = () => customMutation(editExpense);
export const useDeleteExpense = () => customMutation(deleteExpense);