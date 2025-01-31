export const totalBankAmount = (data : any) => {
    let bankTotal = 0;
    for(let i=1; i<data.response.length; i++){
        bankTotal += parseFloat(data.response[i].total_amount);
    }
    return bankTotal;
}

export const netAmount = (data: any) => {
    let netTotal = 0;
    for(let i=0; i<data.response.length; i++){
        netTotal += parseFloat(data.response[i].total_amount);
    }
    return netTotal;
}

export const cashAmount = ({cashData, advanceData, expenseData, due} : {cashData: any, advanceData: any, expenseData: any, due:number}) => {
    const netCash = parseFloat(cashData.response[0].total_cash) - parseFloat(advanceData.response[0].daily_total) - parseFloat(expenseData.response[0].daily_total) - due;
    return netCash;
}

export const netIncomeBySources = (data: any) => {
    let tariff = 0, cgst = 0, sgst = 0, food = 0, laundry = 0, extra = 0, total = 0;

    for (let i=0; i<data.length; i++){
        tariff += parseFloat(data[i].total_tariff);
        cgst += parseFloat(data[i].total_cgst);
        sgst += parseFloat(data[i].total_sgst);
        food += parseFloat(data[i].total_food);
        laundry += parseFloat(data[i].total_laundry);
        extra += parseFloat(data[i].total_extra);
        total += parseFloat(data[i].grand_total);
    }

    return {tariff, cgst, sgst, food, laundry, extra, total};

}

export const netExpenseBySource = (data: any) => {
    let hotel = 0, kitchen = 0, room_service = 0, cash_discount = 0, auto_expense = 0, total = 0;
    
    for(let i=0; i<data.length; i++){
        hotel += parseFloat(data[i]["hotel"]);
        kitchen += parseFloat(data[i]["kitchen"]);
        room_service += parseFloat(data[i]["room service"]);
        cash_discount += parseFloat(data[i]["cash discount"]);
        auto_expense += parseFloat(data[i]["auto expense"]);
        total += parseFloat(data[i]["net_total"]);
    }
    
    return {hotel, kitchen, room_service, cash_discount, auto_expense, total}
}

export const netIncomeByBooking = (data: any) => {
    let walking = 0, ota = 0, company = 0, banquet = 0, wastage = 0, extra = 0, total = 0;
    
    for(let i=0; i<data.length; i++){
       walking += parseFloat(data[i].walking) 
       ota += parseFloat(data[i].ota)
       company += parseFloat(data[i].company)
       banquet += parseFloat(data[i].banquet)
       wastage += parseFloat(data[i].wastage)
       extra += parseFloat(data[i].extra)
       total += parseFloat(data[i].net_total)
    }
    
    return {walking, ota, company, banquet, wastage, extra, total};
}