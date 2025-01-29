import { AddReportInputs } from "@/lib/types";
import axiosInstance from "./axiosInstance";

export  const fetchReports = async() : Promise<any> => {
    const response = await axiosInstance.get("/report/get");
    return response.data;
}

export const deleteReport = async(id: string): Promise<any> => {
    const response = await axiosInstance.delete(`/report/delete/${id}`);
    return response.data;
}

export const addReport = async (data: AddReportInputs) : Promise<any>  => {
    const response = await axiosInstance.post("/report/add", data);
    return response.data;
}

export const editReport = async (data: any, id: string) : Promise<any> => {
    const response = await axiosInstance.put(`/report/edit/${id}`, data);
    return response.data;
} 