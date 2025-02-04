export type LoginInputs = {
    username: string,
    password: string,
}

export type AddReportInputs = {
    room_no: string,
    bill_no: string,
    tariff: string,
    c_gst: number,
    s_gst: number,
    food: string,
    laundry: string,
    extra: string,
    total: number,
    payment_mode: "cash" | "card swipe" | "bank transfer" | "wallet" | "ota pay"
    booking_mode: "walking" | "ota" | "company" | "banquet" | "wastage" | "extra"
    date: string
}

export type EditReportInputs = {
    room_no: string,
    bill_no: string,
    tariff: string,
    c_gst: number,
    s_gst: number,
    food: string,
    laundry: string,
    extra: string,
    total: number,
    payment_mode: "cash" | "card swipe" | "bank transfer" | "wallet" | "ota pay"
    booking_mode: "walking" | "ota" | "company" | "banquet" | "wastage" | "extra"
}

export type AddAdvanceInput = {
    name: string,
    amount: string,
    date: string
}

export type EditAdvanceInput = {
    name: string,
    amount: string,
}

export type AddExpenseInput = {
    voucher: "hotel" | "room service" | "kitchen" | "auto expense" | "cash discount"
    amount: string,
    date: string,
    name: string
}

export type EditExpenseInput = {
    voucher: "hotel" | "room service" | "kitchen" | "auto expense" | "cash discount"
    amount: string,
    name: string
}

export type AddSettlementInput = {
    hotel: string,
    bank: string,
    date: string,
}

export type AddUserInput = {
    username: string,
    role: "user" | "admin" | "receptionist",
    password: string
}

export type ThemeContextType = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
};