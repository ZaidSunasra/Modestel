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
    payment_mode: string,
    booking_mode: string,
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
    payment_mode: string,
    booking_mode: string,
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
    voucher: string,
    amount: string,
    date: string,
    name: string
}

export type EditExpenseInput = {
    voucher: string,
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