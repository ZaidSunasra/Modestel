import { getDailyIncomeByPaymentMode } from "@/queries/incomeQueries";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { netAmount, totalBankAmount } from "@/utils/calculateTotal";

const BankDetail = () => {

    const { data, isPending, isError } = getDailyIncomeByPaymentMode();

    if (isPending) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error..</div>
    }

    const bankTotal = totalBankAmount(data);
    const netTotal = netAmount(data);

    return <>
        <Table className="border-border border-2 border-l-0">
            <TableHeader>
                <TableRow>
                    <TableHead colSpan={2}>Bank Details</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="text-primary">
                <TableRow className="capitalize">
                    <TableCell className=" font-semibold">{data.response[1].payment_mode}</TableCell>
                    <TableCell>{data.response[1].total_amount}</TableCell>
                </TableRow>
                <TableRow className="capitalize">
                    <TableCell className=" font-semibold">{data.response[2].payment_mode}</TableCell>
                    <TableCell>{data.response[2].total_amount}</TableCell>
                </TableRow>
                <TableRow className="capitalize">
                    <TableCell className=" font-semibold">{data.response[3].payment_mode}</TableCell>
                    <TableCell>{data.response[3].total_amount}</TableCell>
                </TableRow>
                <TableRow className="capitalize">
                    <TableCell className=" font-semibold">{data.response[4].payment_mode}</TableCell>
                    <TableCell>{data.response[4].total_amount}</TableCell>
                </TableRow>
                <TableRow className="capitalize">
                    <TableCell className=" font-semibold">Total Bank</TableCell>
                    <TableCell> {bankTotal} </TableCell>
                </TableRow>
                <TableRow className="capitalize">
                    <TableCell className=" font-semibold">{data.response[0].payment_mode}</TableCell>
                    <TableCell>{data.response[0].total_amount}</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter className="text-primary font-bold">
                <TableRow>
                    <TableCell>Total Sale</TableCell>
                    <TableCell>{netTotal}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </>
}

export default BankDetail;
