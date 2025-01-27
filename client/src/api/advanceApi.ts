import axiosInstance from "./axiosInstance";

export  const fetchAdvances = async () : Promise<any> => {
    const response = await axiosInstance.get("/advance/get");
    return response.data;
}

export const dailyAdvanceTotal = async () : Promise<any> => {
    const response = await axiosInstance.get("/advance/daily-total");
    return response.data;
}