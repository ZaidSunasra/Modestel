import { AddExpenseInput, EditExpenseInput } from "@/lib/types";
import axiosInstance from "./axiosInstance";

export  const fetchExpenses = async (): Promise<any> => {
    const response = await axiosInstance.get("/expense/get");
    return response.data;
}

export  const dailyExpenseTotal = async (): Promise<any> => {
    const response = await axiosInstance.get("/expense/daily-total");
    return response.data;
}

export const dailyExpenseTotalByCategory = async() : Promise<any> => {
    const response = await axiosInstance.get("/expense/daily-totals/by-category");
    return response.data;
}

export const addExpense = async (data: AddExpenseInput) : Promise<any> => {
    data.name = data.name.toLowerCase();
    const response = await axiosInstance.post("/expense/add", data);
    return response.data;
}

export const editExpense = async ({data, id} : {data: EditExpenseInput, id: string})  :Promise<any> => {
    data.name = data.name.toLowerCase();
    const response = await axiosInstance.put(`/expense/edit/${id}`, data);
    return response.data;
}

export const deleteExpense = async(id: string): Promise<any> => {
    const response = await axiosInstance.delete(`/expense/delete/${id}`);
    return response.data;
}

export const monthlyExpenseByCategory = async () : Promise<any> => {
    const response = await axiosInstance.get("/expense/monthly-totals/by-category");
    return response.data;
}

export const monthlyTotalExpense = async () : Promise<any> => {
    const response = await axiosInstance.get("/expense/monthly-total");
    return response.data;
}