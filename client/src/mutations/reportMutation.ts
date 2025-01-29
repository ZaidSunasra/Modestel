import { addReport, deleteReport, editReport } from "@/api/reportApi"
import { useToast } from "@/hooks/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router";

const useCustomMutation =<T> (mutationFn: (data: T) => Promise<any>) => {
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
            queryClient.invalidateQueries({ queryKey: ['reports'] });
            queryClient.invalidateQueries({ queryKey: ['daily-cash-total'] });
            queryClient.invalidateQueries({ queryKey: ['daily-income-payment-mode'] });
            queryClient.invalidateQueries({ queryKey: ['daily-income-booking-mode'] });
            queryClient.invalidateQueries({ queryKey: ['daily-income-source'] });
            navigate("/dailyReport");
        },
        onError: (error: any) => {
            toast({
                variant: "destructive",
                title: error.response?.data?.msg || "An error occurred",
                duration: 3000
            });
            navigate("/dailyReport");
        }
    });
};

export const useDeleteReport = () => useCustomMutation(deleteReport);
export const useAddReport = () => useCustomMutation(addReport);
export const useEditReport = () => useCustomMutation(editReport);