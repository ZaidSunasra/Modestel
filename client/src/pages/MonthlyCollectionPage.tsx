import SideBar from "@/components/SideBar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMonthlyTotalAdvance } from "@/queries/advanceQueries";
import { getMonthlyTotalExpense } from "@/queries/expenseQueries";
import { getMonthlyTotalCash, getMonthlyTotalIncome } from "@/queries/incomeQueries";
import { cumulativeCollection } from "@/utils/calculateTotal";
import { formatMonthlyCollection } from "@/utils/dataFormatter";

const MonthlyCollection = () => {

    const {data: incomeData, isPending: incomePending} = getMonthlyTotalIncome();
    const {data: cashData, isPending: cashPending} = getMonthlyTotalCash();
    const {data: advanceData, isPending: advancePending} = getMonthlyTotalAdvance();
    const {data: expenseData, isPending: expensePending} = getMonthlyTotalExpense();

    if(incomePending || cashPending || advancePending || expensePending) return <div>Loading...</div>

   const formattedData = formatMonthlyCollection(incomeData, cashData, advanceData, expenseData);
   const cumulativeData = cumulativeCollection(formattedData);

    return <div className="h-screen w-screen font-mono flex bg-background">
        <SideBar />
        <SidebarTrigger />
        <div className="w-full p-4">
            <div className="max-h-[95vh] overflow-auto">
                <Table className="border-border border-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead rowSpan={2}>DATE</TableHead>
                            <TableHead rowSpan={2}>COLLECTION</TableHead>
                            <TableHead rowSpan={2}>BANK</TableHead>
                            <TableHead rowSpan={2}>ADVANCE</TableHead>
                            <TableHead rowSpan={2}>EXPENSE</TableHead>
                            <TableHead rowSpan={2} className="border-r-2 border-border">CASH</TableHead>
                            <TableHead colSpan={2} className="text-center border-b-2 border-border">SETTLEMENT</TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead className="border-r-2 border-border text-center">HOTEL</TableHead>
                            <TableHead className="text-center">BANK</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cumulativeData.map((data: any) => (
                            <TableRow key={data.date}>
                                <TableCell>{data.date}</TableCell>
                                <TableCell>{data.collection}</TableCell>
                                <TableCell>{data.bank}</TableCell>
                                <TableCell>{data.advance}</TableCell>
                                <TableCell>{data.expense}</TableCell>
                                <TableCell className="border-r-2 border-border">{data.total}</TableCell>
                                <TableCell className="border-r-2 border-border"></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    </div>
}

export default MonthlyCollection;