import { addSettlement, deleteSettlement, editSettlement } from "@/api/settlementApi";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCustomMutation =<T> (mutationFn: (data: T) => Promise<any>) => {
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
            queryClient.invalidateQueries({ queryKey: ['settlement-monthly'] });
        },
        onError: (error: any) => {
            toast({
                variant: "destructive",
                title: error.response?.data?.msg || "An error occurred",
                duration: 3000
            });
        }
    });
};

export const useDeleteSettlement = () => useCustomMutation(deleteSettlement);
export const useAddSettlement = () => useCustomMutation(addSettlement);
export const useEditSettlement = () => useCustomMutation(editSettlement);