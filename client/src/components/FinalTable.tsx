import { getMonthlyIncomeByBookingMode, getMonthlyIncomeBySources } from "@/queries/incomeQueries";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { getMonthlyExpenseByCategory } from "@/queries/expenseQueries";
import { netExpenseBySource, netIncomeByBooking, netIncomeBySources } from "@/utils/calculateTotal";
import { formatMonthlyExpenseBySourceData, formatMonthlyIncomeByBookingData, formatMonthlyIncomeBySourceData, getLastDateOfMonth } from "@/utils/dataFormatter";

const FinalTable = () => {

    const { data: incomeData, isPending: incomePending } = getMonthlyIncomeBySources();
    const { data: bookingData, isPending: bookingPending } = getMonthlyIncomeByBookingMode();
    const { data: expenseData, isPending: expensePending } = getMonthlyExpenseByCategory();

    const date = getLastDateOfMonth();

    if (incomePending || bookingPending || expensePending) {
        return <div>Loading...</div>
    }

    const formattedBookingData = formatMonthlyIncomeByBookingData(bookingData);
    const formattedIncomeData = formatMonthlyIncomeBySourceData(incomeData);
    const formattedExpenseData = formatMonthlyExpenseBySourceData(expenseData);
    const { tariff, cgst, sgst, food, laundry, extra: incomeExtra, total: incomeTotal} = netIncomeBySources(formattedIncomeData);
    const { walking, ota, company, banquet, wastage, extra: bookingExtra, total: bookingTotal} = netIncomeByBooking(formattedBookingData);
    const { kitchen, room_service, cash_discount, auto_expense } = netExpenseBySource(formattedExpenseData);

    return <div className="print-container">
        <Table className="border-primary border-2 mb-4">
            <TableBody>
                <TableRow>
                    <TableCell colSpan={6} className="text-right">{date}</TableCell>
                </TableRow>
                <TableRow className="font-bold text-xl">
                    <TableCell colSpan={3} className="text-center border-r-2">INCOME</TableCell>
                    <TableCell colSpan={3} className="text-center">EXPENSES</TableCell>
                </TableRow>
                <TableRow className="text-center font-bold text-lg">
                    <TableCell colSpan={2} className="border-r-2">DETAILS</TableCell>
                    <TableCell className="border-r-2">AMOUNT</TableCell>
                    <TableCell colSpan={2} className="border-r-2">DETAILS</TableCell>
                    <TableCell>AMOUNT</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-bold border-r-2">ROOM SALE</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="font-bold border-r-2">DAILY EXPENSE</TableCell>
                    <TableCell className="border-r-2">MAINTENANCE</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">ROOM TARIFF</TableCell>
                    <TableCell className="border-r-2">{tariff}</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">SERVICES</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2 font-bold">GST</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">ROOM SERVICES</TableCell>
                    <TableCell>{room_service}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">CGST</TableCell>
                    <TableCell className="border-r-2">{cgst}</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">KITCHEN EXPENSE</TableCell>
                    <TableCell>{kitchen}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">SGST</TableCell>
                    <TableCell className="border-r-2">{sgst}</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">AUTO COMMISSION</TableCell>
                    <TableCell>{auto_expense}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2 font-bold">FOOD BILL</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2 font-bold"></TableCell>
                    <TableCell className="border-r-2">CASH DISCOUNT</TableCell>
                    <TableCell>{cash_discount}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">ROOM SERVICES</TableCell>
                    <TableCell className="border-r-2">{food}</TableCell>
                    <TableCell className="border-r-2 font-bold">BILL</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2 font-bold">EXTRA</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">ELECTRIC BILL</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">EXTRA</TableCell>
                    <TableCell className="border-r-2">{incomeExtra}</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">GAS BILL</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2 font-bold">LAUNDRY</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">SETTOP BOXBILL</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">GUEST LAUNDRY</TableCell>
                    <TableCell className="border-r-2">{laundry}</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">TELEPHONE BILL</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} className="border-r-2 font-bold text-right">TOTAL INCOME</TableCell>
                    <TableCell className="border-r-2">{incomeTotal}</TableCell>
                    <TableCell className="border-r-2 font-bold">LAUNDRY</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">GUEST LAUNDRY</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">HOTEL LAUNDRY</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow className="h-[36.8px]">
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2 font-bold">TAX</TableCell>
                    <TableCell className="border-r-2">MMR</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">GST</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">PROPERTY</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">PROFESSIONAL</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">INCOME TAX</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">ACCOUNTANT FEES</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow className="h-[36.8px]">
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} className="border-r-2 font-bold text-right">TOTAL INCOME</TableCell>
                    <TableCell className="border-r-2">{incomeTotal}</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} className="border-r-2 font-bold text-right">TOTAL EXPENSE</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2 font-bold">MONTHLY</TableCell>
                    <TableCell className="border-r-2">SALARY</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} className="border-r-2 font-bold text-right">BARKAT</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">VEGETABLES</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">GROCERY</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">JUICES</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">HOUSE KEEPING</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">PERFUME BILL</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={3} className="border-r-2 text-center font-bold">REPORT</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">MILK</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} className="border-r-2 font-bold">WALKING GUEST</TableCell>
                    <TableCell className="border-r-2">{walking}</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">SOAP KIT & D.KIT</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} className="border-r-2 font-bold">OTA ONLINE</TableCell>
                    <TableCell className="border-r-2">{ota}</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">SOLUTION AMC</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} className="border-r-2 font-bold">COMPANY'S GUEST</TableCell>
                    <TableCell className="border-r-2">{company}</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">AR SECURITY AMC</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} className="border-r-2 font-bold">BANQUET</TableCell>
                    <TableCell className="border-r-2">{banquet}</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">BATH, HAND TOWEL</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} className="border-r-2 font-bold">WASTAGE</TableCell>
                    <TableCell className="border-r-2">{wastage}</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">ROOM LIGHT</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} className="border-r-2 font-bold">EXTRA</TableCell>
                    <TableCell className="border-r-2">{bookingExtra}</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">PLUMBER ITEMS</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} className="border-r-2 font-bold">TOTAL COLLECTION</TableCell>
                    <TableCell className="border-r-2">{bookingTotal}</TableCell>
                    <TableCell className="border-r-2 font-bold">OTHER</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} className="border-r-2 font-bold">TOTAL ROOM</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">SETTLEMENT CHARGE</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} className="border-r-2 font-bold">INCOME PER ROOM</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell className="border-r-2">BANK CHARGES</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} className="border-r-2 font-bold">EXPENSE PER ROOM</TableCell>
                    <TableCell className="border-r-2"></TableCell>
                    <TableCell colSpan={2} className="border-r-2 font-bold text-right">TOTAL EXPENSES</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
}

export default FinalTable;