import { getDailyCashTotal } from "@/queries/incomeQueries";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { getDailyAdvanceTotal } from "@/queries/advanceQueries";
import { getDailyExpenseTotal } from "@/queries/expenseQueries";

const CashReport = () => {

    const { data: cashData, isPending: cashPending, isError: cashIsError, error: cashError } = getDailyCashTotal();
    const { data: advanceData, isPending: advancePending, isError: advanceIsError, error: advanceError } = getDailyAdvanceTotal();
    const { data: expenseData, isPending: expensePending, isError: expenseIsError, error: expenseError } = getDailyExpenseTotal();

    const cash =  parseFloat(cashData.response[0].total_cash) - parseFloat(expenseData.response[0].daily_total) - parseFloat(advanceData.response[0].daily_total); 

    if (cashPending || advancePending || expensePending) {
        return <div>Loading...</div>
    }

    if (cashIsError || advanceIsError || expenseIsError) {
        return <div> Error..</div>
    }

    return <>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead colSpan={2}>Cash Report</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Cash</TableCell>
                    <TableCell> {cashData.response[0].total_cash}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Expense</TableCell>
                    <TableCell> {expenseData.response[0].daily_total == null ? 0 :  expenseData.response[0].daily_total } </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Advance</TableCell>
                    <TableCell> {advanceData.response[0].daily_total == null ? 0 : advanceData.response[0].daily_total }</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Cash Due</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell> Cash/Due </TableCell>
                    <TableCell>{cash}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </>
}

export default CashReport;