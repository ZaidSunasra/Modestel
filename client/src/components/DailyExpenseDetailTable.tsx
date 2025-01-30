import { getDailyExpenseByCategory } from "@/queries/expenseQueries";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { netAmount } from "@/utils/calculateTotal";

const ExpenseDetail = () => {

    const { data, isPending, isError } = getDailyExpenseByCategory();

    if (isPending) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error..</div>
    }

    const netTotal = netAmount(data);

    return <>
        <Table className="border-border border-2 border-l-0">
            <TableHeader>
                <TableRow>
                    <TableHead colSpan={2}>Expense Details</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.response.map((data: any) => (
                    <TableRow className="capitalize" key={data.voucher}>
                        <TableCell className="font-semibold"> {data.voucher}</TableCell>
                        <TableCell> {data.total_amount}</TableCell>
                    </TableRow>
                ))}
                <TableRow className="h-[36.8px]">
                    <TableCell> </TableCell>
                    <TableCell> </TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Total Expense</TableCell>
                    <TableCell>{netTotal}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </>
}

export default ExpenseDetail;