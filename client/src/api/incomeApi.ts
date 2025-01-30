import axiosInstance from "./axiosInstance"

export const dailyCashTotal = async (): Promise<any> => {
    const response = await axiosInstance.get("/income/daily-total/cash");
    return response.data;
}

export const dailyIncomeByPaymentMode = async (): Promise<any> => {
    const response = await axiosInstance.get("/income/daily-totals/by-payment-mode");
    return response.data;
}

export const dailyIncomeByBookingMode = async (): Promise<any> => {
    const response = await axiosInstance.get("/income/daily-totals/by-booking-mode");
    return response.data;
}

export const dailyIncomeBySources = async (): Promise<any> => {
    const response = await axiosInstance.get("/income/daily-totals/by-source");
    return response.data;
}

export const monthlyIncomeBySources = async (): Promise<any> => {
    const response = await axiosInstance.get("/income/monthly-totals/by-source");
    return response.data;
}