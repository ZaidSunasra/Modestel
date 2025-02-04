import Loading from "@/components/Loading";
import SideBar from "@/components/SideBar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMonthlyExpenseByCategory } from "@/queries/expenseQueries";
import { netExpenseBySource } from "@/utils/calculateTotal";
import { formatMonthlyExpenseBySourceData } from "@/utils/dataFormatter";

const MonthlyExpense = () => {

    const { data, isPending } = getMonthlyExpenseByCategory();

    if (isPending) return <Loading sideBar={true} button={false} width={"100%"} height={"95vh"}/>

    const formattedData = formatMonthlyExpenseBySourceData(data);
    const {hotel, kitchen, room_service, cash_discount, auto_expense, total} = netExpenseBySource(formattedData);

    return <div className="h-screen w-screen font-mono flex bg-background">
        <SideBar />
        <SidebarTrigger />
        <div className="w-full p-4">
            <div className=" max-h-[95vh] overflow-auto">
                <Table className="border-boder border-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>DATE</TableHead>
                            <TableHead>HOTEL </TableHead>
                            <TableHead>ROOM SERVICE</TableHead>
                            <TableHead>KITCHEN</TableHead>
                            <TableHead>AUTO EXPENSE</TableHead>
                            <TableHead>CASH DISCOUNT</TableHead>
                            <TableHead>TOTAL</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {formattedData.map((data: any) => (
                            <TableRow key={data.expense_date} className="text-primary">
                                <TableCell>{data.expense_date}</TableCell>
                                <TableCell>{data.hotel}</TableCell>
                                <TableCell>{data["room service"]}</TableCell>
                                <TableCell>{data.kitchen}</TableCell>
                                <TableCell>{data["auto expense"]}</TableCell>
                                <TableCell>{data["cash discount"]}</TableCell>
                                <TableCell>{data.net_total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow className="text-primary font-bold">
                            <TableCell>Total</TableCell>
                            <TableCell>{hotel}</TableCell>
                            <TableCell>{room_service}</TableCell>
                            <TableCell>{kitchen}</TableCell>
                            <TableCell>{auto_expense}</TableCell>
                            <TableCell>{cash_discount}</TableCell>
                            <TableCell>{total}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    </div>
}

export default MonthlyExpense;