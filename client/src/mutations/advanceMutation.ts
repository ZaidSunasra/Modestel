import { addAdvance, deleteAdvance, editAdvance } from "@/api/advanceApi";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const customMutation =<T> (mutationFn : (data: T) => Promise<any>) => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: (data: any) => {
            toast({
                variant: "default",
                title: data.msg,
                duration: 3000
            });
            queryClient.invalidateQueries({ queryKey: ['advances'] });
            queryClient.invalidateQueries({ queryKey: ['daily-advance-total'] });
            navigate("/dailyExpense");
        },
        onError: (error: any) => {
            toast({
                variant: "destructive",
                title: error.response?.data?.msg || "An error occurred",
                duration: 3000
            });
            navigate("/dailyExpense");
        }
    });
}

export const useAddAdvance = () => customMutation(addAdvance);
export const useEditAdvance = () => customMutation(editAdvance);
export const useDeleteAdvance = () => customMutation(deleteAdvance);