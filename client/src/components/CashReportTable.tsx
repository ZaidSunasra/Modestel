import { getDailyCashTotal } from "@/queries/incomeQueries";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { getDailyAdvanceTotal } from "@/queries/advanceQueries";
import { getDailyExpenseTotal } from "@/queries/expenseQueries";
import { Input } from "./ui/input";
import { useState } from "react";
import { cashAmount } from "@/utils/calculateTotal";

const CashReport = () => {

    const [due, setDue] = useState<number>(0);
    const { data: cashData, isPending: cashPending, isError: cashIsError } = getDailyCashTotal();
    const { data: advanceData, isPending: advancePending, isError: advanceIsError } = getDailyAdvanceTotal();
    const { data: expenseData, isPending: expensePending, isError: expenseIsError } = getDailyExpenseTotal();

    if (cashPending || advancePending || expensePending) {
        return <div>Loading...</div>
    }

    if (cashIsError || advanceIsError || expenseIsError) {
        return <div> Error..</div>
    }

    const cash = cashAmount({ cashData, advanceData, expenseData, due });

    return <>
        <Table className="border-border border-2">
            <TableHeader>
                <TableRow>
                    <TableHead colSpan={2}>Cash Report</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="capitalize">
                    <TableCell className="font-semibold">Cash</TableCell>
                    <TableCell> {cashData.response[0].total_cash}</TableCell>
                </TableRow>
                <TableRow className="capitalize">
                    <TableCell className="font-semibold">Expense</TableCell>
                    <TableCell> {expenseData.response[0].daily_total} </TableCell>
                </TableRow>
                <TableRow className="capitalize">
                    <TableCell className="font-semibold">Advance</TableCell>
                    <TableCell> {advanceData.response[0].daily_total}</TableCell>
                </TableRow>
                <TableRow className="capitalize h-[73.6px]">
                    <TableCell className="font-semibold">Cash Due</TableCell>
                    <TableCell>
                        <Input
                            type="number"
                            placeholder="Enter due"
                            value={due == 0 ? "" : due}
                            min={0}
                            onChange={(e) => {
                                const value = e.target.value;
                                setDue(value === "" ? 0 : parseFloat(value));
                            }}
                        />
                    </TableCell>
                </TableRow >
                <TableRow className="h-[36.8px]">
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell> Cash/Due </TableCell>
                    <TableCell>{cash}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </>
}

export default CashReport;