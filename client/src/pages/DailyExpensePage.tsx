import AdvanceList from "@/components/AdvanceListTable";
import BankDetail from "@/components/DailyBankDetailsTable";
import BookingDetail from "@/components/DailyBookingDetailsTable";
import CashReport from "@/components/DailyCashReportTable";
import ExpenseDetail from "@/components/DailyExpenseDetailTable";
import ExpenseList from "@/components/ExpenseListTable";
import SideBar from "@/components/SideBar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const DailyExpense = () => {
    return <div className="w-screen h-screen flex">
        <SideBar />
        <SidebarTrigger />
        <div className="w-full p-4">
            <div className="flex gap-4 h-[57vh] mb-4">
                <div className="w-3/5">
                <ExpenseList />
                </div>
                <div className="w-2/5">
                <AdvanceList />
                </div>
            </div>
            <div className="flex">
                    <CashReport />
                    <BankDetail />
                    <BookingDetail />
                    <ExpenseDetail />
                </div>
        </div>
    </div>
}

export default DailyExpense;