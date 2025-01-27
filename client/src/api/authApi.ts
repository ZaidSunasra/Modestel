import { LoginInputs } from "@/lib/types";
import axiosInstance from "./axiosInstance";

export  const login = async (data: LoginInputs): Promise<any> => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
}