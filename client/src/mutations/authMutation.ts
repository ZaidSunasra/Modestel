import axiosInstance from "@/api/axiosInstance"
import { useToast } from "@/hooks/use-toast";
import { LoginInputs } from "@/lib/types"
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogin = () => {

    const {toast } = useToast();
    const navigate =  useNavigate();

    const login = async (data: LoginInputs): Promise<any> => {
        const response = await axiosInstance.post("/auth/login", data);
        return response.data;
    }

    return useMutation({
        mutationFn: login,
        onSuccess: (data: any) => {
            localStorage.setItem("Role", data.userData.role);
            toast({
                variant: "default",
                title: data.msg,
                duration: 3000
            });
            navigate("/dashboard");
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