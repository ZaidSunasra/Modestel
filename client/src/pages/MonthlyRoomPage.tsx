import SideBar from "@/components/SideBar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMonthlyIncomeByBookingMode } from "@/queries/incomeQueries";
import { netIncomeByBooking } from "@/utils/calculateTotal";
import { formatMonthlyIncomeByBookingData } from "@/utils/dataFormatter";

const MonthlyRoom = () => {

    const {data, isPending} = getMonthlyIncomeByBookingMode();

    if(isPending)  return <div>Loading...</div>

    const formattedData = formatMonthlyIncomeByBookingData(data);
    const {walking, ota, company, banquet, wastage, extra, total} = netIncomeByBooking(formattedData);

    return <div className="h-screen w-screen font-mono flex bg-background">
        <SideBar />
        <SidebarTrigger />
        <div className="w-full p-4">
            <div className=" max-h-[95vh] overflow-auto">
                <Table className="border-border border-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>DATE</TableHead>
                            <TableHead>WALKING</TableHead>
                            <TableHead>OTA</TableHead>
                            <TableHead>COMPANY</TableHead>
                            <TableHead>BANQUET</TableHead>
                            <TableHead>WASTAGE</TableHead>
                            <TableHead>EXTRA</TableHead>
                            <TableHead>TOTAL</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {formattedData.map((data: any) => (
                            <TableRow key={data.report_date} className="text-primary">
                                <TableCell>{data.report_date}</TableCell>
                                <TableCell>{data.walking}</TableCell>
                                <TableCell>{data.ota}</TableCell>
                                <TableCell>{data.company}</TableCell>
                                <TableCell>{data.banquet}</TableCell>
                                <TableCell>{data.wastage}</TableCell>
                                <TableCell>{data.extra}</TableCell>
                                <TableCell>{data.net_total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow className="text-primary font-bold">
                        <TableCell>Total</TableCell>
                                <TableCell>{walking}</TableCell>
                                <TableCell>{ota}</TableCell>
                                <TableCell>{company}</TableCell>
                                <TableCell>{banquet}</TableCell>
                                <TableCell>{wastage}</TableCell>
                                <TableCell>{extra}</TableCell>
                                <TableCell>{total}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
        </div>
}

        export default MonthlyRoom;