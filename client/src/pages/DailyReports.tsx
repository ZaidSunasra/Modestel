import BankDetail from "@/components/BankDetailsTable";
import BookingDetail from "@/components/BookingDetailsTable";
import CashReport from "@/components/CashReportTable";
import ReportTable from "@/components/DailyReportTable";
import ExpenseDetail from "@/components/ExpenseDetailTable";
import SideBar from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Report = () => {

    return (
        <div className="w-screen h-screen flex">
            <SideBar />
            <SidebarTrigger />
            <div className="w-full p-4">
                <div className="flex justify-end mb-4">
                    <Button className="">Add Report </Button>
                </div>
                <ReportTable />
                <div className="flex">
                    <CashReport />
                    <BankDetail />
                    <BookingDetail />
                    <ExpenseDetail />
                </div>
            </div>
        </div>
    )

};

export default Report;