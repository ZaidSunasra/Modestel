import axiosInstance from "./axiosInstance";

export  const fetchReports = async() : Promise<any> => {
    const response = await axiosInstance.get("/report/get");
    return response.data;
}