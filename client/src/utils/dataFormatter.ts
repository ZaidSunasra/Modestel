import { AddAdvanceInput, AddReportInputs, EditReportInputs } from "@/lib/types";
import { format } from "date-fns";

const date = format(new Date(), "yyyy-MM-dd");
const day = new Date().getDate();

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
    const updatedData = [];
    for (let i = 0; i < day; i++) {
        updatedData.push({
            total_tariff: data.response[i].total_tariff,
            total_cgst: data.response[i].total_cgst,
            total_sgst: data.response[i].total_sgst,
            total_food: data.response[i].total_food,
            total_laundry: data.response[i].total_laundry,
            total_extra: data.response[i].total_extra,
            grand_total: data.response[i].grand_total,
            report_date: formatDatetoIST(data.response[i].report_date)
        })
    }
    return updatedData;
}

export const formatMonthlyExpenseBySourceData = (data: any) => {
    const updatedData = data.response
    .map((item: any) => ({
        ...item,
        expense_date: formatDatetoIST(item.expense_date), 
    }))
    .filter((item: any) => {
        const itemDate = item.expense_date; 
        return itemDate  <= format(new Date(), "dd/MM/yyyy"); 
    })
    .reduce((acc: any, item: any) => {
        const { expense_date, voucher, total_amount } = item;

        let existingEntry = acc.find((entry: any) => entry.expense_date === expense_date);

        if (!existingEntry) {
            existingEntry = { expense_date, net_total: 0 };
            acc.push(existingEntry);
        }

        existingEntry[voucher] = total_amount;
        existingEntry.net_total += parseFloat(total_amount);

        return acc;
    }, []);
    return updatedData;
}

export const formatMonthlyIncomeByBookingData = (data: any) => {
    const updatedData = data.response.
    map((item: any) => ({
        ...item,
        report_date: formatDatetoIST(item.report_date)
    }))
    .filter((item: any) => {
        const itemDate = item.report_date;
        return itemDate <=  format(new Date(), "dd/MM/yyyy");
    })
    .reduce((acc: any, item: any) => {
        const { report_date, booking_mode, total_amount } = item;

        let existingEntry = acc.find((entry: any) => entry.report_date === report_date);

        if (!existingEntry) {
            existingEntry = { report_date, net_total: 0 };
            acc.push(existingEntry);
        }

        existingEntry[booking_mode] = total_amount;
        existingEntry.net_total += parseFloat(total_amount);

        return acc;
    }, []);
    return updatedData;
}

export const formatMonthlyExpenseData = (data: any) => {
    const updatedData = data.response.map((data: any) => ({
        ...data,
        date: formatDatetoIST(data.date)
    }));
    return updatedData;
}

export const formatMonthlyCollection = (income: any, cash: any, advance: any, expense: any, settlement: any) => {
    let updatedData = [];
    for (let i = 0; i < income.response.length; i++) {
        const date = formatDatetoIST(income.response[i].date);
        const collection = income.response[i].daily_total;
        const bank = parseFloat(income.response[i].daily_total) - parseFloat(cash.response[i].daily_cash_total);
        const expenses = expense.response[i].daily_total;
        const advances = advance.response[i].daily_total;
        const bank_settlement = settlement.response[i].total_bank;
        const hotel_settlement = settlement.response[i].total_hotel;
        updatedData.push({
            date: date,
            collection: collection,
            bank: bank,
            advance: advances,
            expense: expenses,
            total: parseFloat(collection) - bank - parseFloat(advances) - parseFloat(expenses),
            bank_settlement: bank_settlement,
            hotel_settlement: hotel_settlement
        });
    }
    return updatedData;
}

export const getLastDateOfMonth = () => {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const formattedDate = `${lastDay.getDate().toString().padStart(2, "0")}/${(lastDay.getMonth() + 1).toString().padStart(2, "0")}/${lastDay.getFullYear()}`;
    return formattedDate;
}