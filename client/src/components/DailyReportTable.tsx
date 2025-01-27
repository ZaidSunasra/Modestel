import { fetchDailyReport } from "@/queries/reportQueries";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { getDailyIncomeBySources } from "@/queries/incomeQueries";

const ReportTable = () => {

    const { data: reportData, isPending: reportPending, isError: reportIsError, error: reportError} = fetchDailyReport();
    const { data: incomeData, isPending: incomePending, isError: incomeIsError, error: incomeError} = getDailyIncomeBySources();
    console.log(reportData);
    console.log(incomeData);

    if (incomePending || reportPending) {
        return <h1> Loading </h1>
    }

    if (reportIsError || incomeIsError) {
        return <div>Error while fetching Result</div>
    }

    return <div className="max-h-[50vh] overflow-y-auto mb-4">
        <Table className="border-border border-2">
            <TableHeader>
                <TableRow>
                    <TableHead> Room </TableHead>
                    <TableHead> Bill No. </TableHead>
                    <TableHead> Tariff </TableHead>
                    <TableHead> CGST </TableHead>
                    <TableHead> SGST </TableHead>
                    <TableHead> Food </TableHead>
                    <TableHead> Laundry </TableHead>
                    <TableHead> Extra </TableHead>
                    <TableHead> Total </TableHead>
                    <TableHead> Payment Mode </TableHead>
                    <TableHead> Booking Mode </TableHead>
                    <TableHead> Action </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="h-[50vh]">
                {reportData.reports.map((data: any) => (
                    <TableRow key={data.id}>
                        <TableCell>{data.room_no}</TableCell>
                        <TableCell>{data.bill_no}</TableCell>
                        <TableCell>{data.tariff}</TableCell>
                        <TableCell>{data.c_gst}</TableCell>
                        <TableCell>{data.s_gst}</TableCell>
                        <TableCell>{data.food}</TableCell>
                        <TableCell>{data.laundry}</TableCell>
                        <TableCell>{data.extra}</TableCell>
                        <TableCell>{data.total}</TableCell>
                        <TableCell>{data.payment_mode}</TableCell>
                        <TableCell>{data.booking_mode}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                {incomeData.response.map((data: any) => (
                    <TableRow>
                        <TableCell colSpan={2} className="text-center">Total</TableCell>
                        <TableCell>{data.total_tariff}</TableCell>
                        <TableCell>{data.total_cgst}</TableCell>
                        <TableCell>{data.total_sgst}</TableCell>
                        <TableCell>{data.total_food}</TableCell>
                        <TableCell>{data.total_laundry}</TableCell>
                        <TableCell>{data.extra}</TableCell>
                        <TableCell>{data.grand_total}</TableCell>
                    </TableRow>
                ))}
            </TableFooter>
        </Table>
    </div>
}

export default ReportTable;