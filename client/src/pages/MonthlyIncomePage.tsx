import SideBar from "@/components/SideBar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMonthlyIncomeBySources } from "@/queries/incomeQueries";
import { netIncomeBySources } from "@/utils/calculateTotal";
import { formatMonthlyIncomeBySourceData } from "@/utils/dataFormatter";


const MonthlyIncome = () => {

    const { data, isPending} = getMonthlyIncomeBySources();

   if(isPending) return <div>Loading</div>

   const formattedData = formatMonthlyIncomeBySourceData(data);
   console.log(formattedData);
   const {tariff, cgst, sgst, food, laundry, extra, total} = netIncomeBySources(formattedData);

    return <div className="w-screen h-screen flex">
        <SideBar />
        <SidebarTrigger />
        <div className="w-full p-4">
            <div className=" max-h-[95vh] overflow-auto">
            <Table className="border-border border-2">
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Room Tariff</TableHead>
                        <TableHead>CGST</TableHead>
                        <TableHead>SGST</TableHead>
                        <TableHead>Food</TableHead>
                        <TableHead>Laundry</TableHead>
                        <TableHead>Extra</TableHead>
                        <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {formattedData.map((data : any) => (
                        <TableRow key={data.report_date}>
                            <TableCell>{data.report_date}</TableCell>
                            <TableCell>{data.total_tariff}</TableCell>
                            <TableCell>{data.total_cgst}</TableCell>
                            <TableCell>{data.total_sgst}</TableCell>
                            <TableCell>{data.total_food}</TableCell>
                            <TableCell>{data.total_laundry}</TableCell>
                            <TableCell>{data.total_extra}</TableCell>
                            <TableCell>{data.grand_total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell>{tariff}</TableCell>
                        <TableCell>{cgst}</TableCell>
                        <TableCell>{sgst}</TableCell>
                        <TableCell>{food}</TableCell>
                        <TableCell>{laundry}</TableCell>
                        <TableCell>{extra}</TableCell>
                        <TableCell>{total}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            </div>
        </div>
    </div>
}

export default MonthlyIncome;