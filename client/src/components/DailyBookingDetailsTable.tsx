import { getDailyIncomeByBookingMode } from "@/queries/incomeQueries";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { netAmount } from "@/utils/calculateTotal";

const BookingDetail = () => {

    const { data, isPending, isError } = getDailyIncomeByBookingMode();

    if (isPending) {
        return <div>Loading ....</div>
    }

    if (isError) {
        return <div>Error..</div>
    }

    const netTotal = netAmount(data);

    return <>
        <Table className="border-border border-2 border-l-0">
            <TableHeader>
                <TableRow>
                    <TableHead colSpan={2}>Booking Details</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.response.map((data: any) => (
                    <TableRow className="capitalize">
                        <TableCell className="font-semibold"> {data.booking_mode}</TableCell>
                        <TableCell> {data.total_amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell> Total </TableCell>
                    <TableCell> {netTotal}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </>
}

export default BookingDetail;