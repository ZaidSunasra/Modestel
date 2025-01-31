import axiosInstance from "./axiosInstance";

export  const fetchAdvances = async () : Promise<any> => {
    const response = await axiosInstance.get("/advance/get");
    return response.data;
}

export const dailyAdvanceTotal = async () : Promise<any> => {
    const response = await axiosInstance.get("/advance/daily-total");
    return response.data;
}

export const addAdvance = async (data: any) : Promise<any> => {
    const response =await axiosInstance.post("/advance/add", data);
    return response.data;
}

export const deleteAdvance = async(id: string) : Promise<any> => {
    const response = await axiosInstance.delete(`/advance/delete/${id}`);
    return response.data;
}

export const editAdvance = async({data, id}: {data: any, id: string}) : Promise<any> => {
    const response = await axiosInstance.put(`/advance/edit/${id}`, data);
    return response.data;
}

export const monthlyAdvance = async() : Promise<any> => {
    const response = await axiosInstance.get("/advance/by-month");
    return response.data;
}

export const monthlyTotalAdvance = async() : Promise<any> => {
    const response = await axiosInstance.get("/advance/monthly-total");
    return response.data;
}