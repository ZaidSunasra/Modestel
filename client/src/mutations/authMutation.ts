import { login } from "@/api/authApi";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogin = () => {

    const {toast } = useToast();
    const navigate =  useNavigate();
    
    return useMutation({
        mutationFn: login,
        onSuccess: (data: any) => {
            localStorage.setItem("Role", data.userData.role);
            toast({
                variant: "default",
                title: data.msg,
                duration: 3000
            });
            navigate("/dailyReport");
        },
        onError: (error: any) => {
            toast({
                variant: "destructive",
                title: error.response.data.msg,
                duration: 3000
            })
        },
    });
};