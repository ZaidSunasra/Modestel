import { AddReportInputs, EditReportInputs } from "@/lib/types";
import { format } from "date-fns";

const date = format(new Date(), "yyyy-MM-dd");

export const formatAddReportData = (data: AddReportInputs) => {
    data.c_gst = parseFloat(data.tariff) * 0.05;
    data.s_gst = parseFloat(data.tariff) * 0.05;
    data.total = parseFloat(data.tariff) + data.c_gst + data.s_gst + parseFloat(data.food) + parseFloat(data.laundry) + parseFloat(data.extra);
    data.date = date;
    return data;
}

export const formatEditReportData = (data: EditReportInputs) => {
    data.c_gst = parseFloat(data.tariff) * 0.05;
    data.s_gst = parseFloat(data.tariff) * 0.05;
    data.total = parseFloat(data.tariff) + data.c_gst + data.s_gst + parseFloat(data.food) + parseFloat(data.laundry) + parseFloat(data.extra);
    return data;
}