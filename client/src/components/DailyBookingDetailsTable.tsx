import { getDailyIncomeByBookingMode } from "@/queries/incomeQueries";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { netAmount } from "@/utils/calculateTotal";
import Loading from "./Loading";

const BookingDetail = () => {

    const { data, isPending, isError } = getDailyIncomeByBookingMode();

    if (isPending) {
        return <Loading button={false} sideBar={false} height={"300px"} width={"300px"} />
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
                    <TableRow className="capitalize text-primary" key={data.booking_mode}>
                        <TableCell className="font-semibold"> {data.booking_mode}</TableCell>
                        <TableCell> {data.total_amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow className="text-primary font-bold">
                    <TableCell> Total </TableCell>
                    <TableCell> {netTotal}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </>
}

export default BookingDetail;