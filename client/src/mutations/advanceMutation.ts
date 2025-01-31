import { addAdvance, deleteAdvance, editAdvance } from "@/api/advanceApi";
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
            queryClient.invalidateQueries({ queryKey: ['advances'] });
            queryClient.invalidateQueries({ queryKey: ['daily-advance-total'] });
            queryClient.invalidateQueries({ queryKey: ['monthly-advance']});
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

export const useAddAdvance = () => customMutation(addAdvance);
export const useEditAdvance = () => customMutation(editAdvance);
export const useDeleteAdvance = () => customMutation(deleteAdvance);