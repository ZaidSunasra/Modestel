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

export const addExpense = async (data: any) : Promise<any> => {
    const response = await axiosInstance.post("/expense/add", data);
    return response.data;
}

export const editExpense = async ({data, id} : {data: any, id: string})  :Promise<any> => {
    const response = await axiosInstance.put(`/expense/edit/${id}`, data);
    return response.data;
}

export const deleteExpense = async(id: string): Promise<any> => {
    const response = await axiosInstance.delete(`/expense/delete/${id}`);
    return response.data;
}