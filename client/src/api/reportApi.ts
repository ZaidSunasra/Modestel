import axiosInstance from "./axiosInstance";

export  const fetchReports = async() : Promise<any> => {
    const response = await axiosInstance.get("/report/get");
    return response.data;
}

export const deleteReport = async(id: string): Promise<any> => {
    const response = await axiosInstance.delete(`/report/delete/${id}`);
    return response.data;
}