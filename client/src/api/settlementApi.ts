import axiosInstance from "./axiosInstance"

export const addSettlement = async (data: any) : Promise<any> => {
    const response = await axiosInstance.post("/settlement/add", data);
    return response.data;
}

export const editSettlement = async ({data, id} : {data: any, id:string})  :Promise<any> => {
    const response = await axiosInstance.put(`/settlement/edit/${id}`, data);
    return response.data;
}

export const deleteSettlement = async (date: string) : Promise<any> => {
    const response = await axiosInstance.delete(`/settlement/delete/${date}`);
    return response.data;
}

export const monthlySettlement = async () : Promise<any> => {
    const response = await axiosInstance.get("/settlement/monthly-total/day-wise");
    return response.data;
}
