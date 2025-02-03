import { AddUserInput, LoginInputs } from "@/lib/types";
import axiosInstance from "./axiosInstance";

export  const login = async (data: LoginInputs): Promise<any> => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
}

export const addAccount = async(data: AddUserInput) : Promise<any> => {
    const response = await axiosInstance.post("/auth/add-user", data);
    return response.data;
}

export const deleteAccount = async(id: string) : Promise<any> => {
    const response = await axiosInstance.delete(`/auth/delete-account/${id}`);
    return response.data; 
}

export const getAllAccount = async() : Promise<any> => {
    const response = await axiosInstance.get("/auth/get/all-user");
    return response.data;
}

export const logout = async() : Promise<any> => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
}