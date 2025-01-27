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
