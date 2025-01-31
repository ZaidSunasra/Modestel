import { AddAdvanceInput, AddReportInputs, EditReportInputs } from "@/lib/types";
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

export const formatAddAdvanceData = (data: AddAdvanceInput) => {
    data.date = date;
    return data;
}

export const formatDatetoIST = (date: string) => {
    return new Intl.DateTimeFormat('en-IN', {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).format(new Date(date))
}

export const formatMonthlyIncomeBySourceData = (data: any) => {
    const updateData = data.response.map((item: any) => ({
        ...item,
        report_date: formatDatetoIST(item.report_date)
    }));
    return updateData;
}

export const formatMonthlyExpenseBySourceData = (data: any) => {
    const updatedData = data.response.map((item: any) => ({
        ...item,
        expense_date: formatDatetoIST(item.expense_date)
    }))
    return updatedData.reduce((acc: any, item: any) => {
        const { expense_date, voucher, total_amount } = item;

        let existingEntry = acc.find((entry: any) => entry.expense_date === expense_date);

        if (!existingEntry) {
            existingEntry = { expense_date, net_total : 0};
            acc.push(existingEntry);
        }

        existingEntry[voucher] = total_amount;
        existingEntry.net_total += parseFloat(total_amount); 

        return acc;
    }, []);
}
