export const totalBankAmount = (data : any) => {
    let bankTotal = 0;
    for(let i=0; i<data.response.length; i++){
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