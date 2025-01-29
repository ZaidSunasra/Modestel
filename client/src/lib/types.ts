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