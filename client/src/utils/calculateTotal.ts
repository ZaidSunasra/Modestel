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