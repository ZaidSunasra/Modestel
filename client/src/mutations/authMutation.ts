import { addAccount, deleteAccount, login, logout } from "@/api/authApi";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogin = () => {

    const {toast } = useToast();
    const navigate =  useNavigate();
    
    return useMutation({
        mutationFn: login,
        onSuccess: (data: any) => {
            localStorage.setItem("Role", data.userData.role);
            localStorage.setItem("Username", data.userData.username);
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

export const AddUserAccount = () => {

    const {toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addAccount,
        onSuccess: (data: any) => {
            toast({
                variant: "default",
                title: data.msg,
                duration: 3000
            });
            queryClient.invalidateQueries({ queryKey: ['all-accounts']});
        },
        onError: (error: any) => {
            toast({
                variant: "destructive",
                title: error.response.data.msg,
                duration: 3000
            })
        },
    });
}

export const DeleteUserAccount = () => {
    const {toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAccount,
        onSuccess: (data: any) => {
            toast({
                variant: "default",
                title: data.msg,
                duration: 3000
            });
            queryClient.invalidateQueries({ queryKey: ['all-accounts']});
        },
        onError: (error: any) => {
            toast({
                variant: "destructive",
                title: error.response.data.msg,
                duration: 3000
            })
        },
    });
}

export const useLogout = () => {

    const {toast } = useToast();
    const navigate =  useNavigate();
    
    return useMutation({
        mutationFn: logout,
        onSuccess: (data: any) => {
            localStorage.setItem("Role", "");
            localStorage.setItem("Username", "");
            toast({
                variant: "default",
                title: data.msg,
                duration: 3000
            });
            navigate("/");
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