import LoginPage from "@/pages/LoginPage"
import { BrowserRouter, Route, Routes } from "react-router"
import Report from "@/pages/DailyReportsPage"
import AddReport from "@/pages/AddReportPage"
import EditReport from "@/pages/EditReportPage"
import DailyExpense from "@/pages/DailyExpensePage"
import MonthlyIncome from "@/pages/MonthlyIncomePage"
import MonthlyExpense from "@/pages/MonthlyExpensePage"
import MonthlyRoom from "@/pages/MonthlyRoomPage"
import MonthlyAdvance from "@/pages/MonthlyAdvancePage"

export const Router = () => {

    const role: string = localStorage.getItem("Role") || "";

    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                {role === "admin" || role === "receptionist" ? (
                    <>
                        <Route path="/dailyReport" element={<Report />} />
                        <Route path="/addReport" element={<AddReport />} />
                        <Route path="/editReport/:id" element={<EditReport />} />
                        <Route path="/dailyExpense" element={<DailyExpense />} />
                    </>
                ) : null}
                {role === "admin" ? (
                    <>
                        <Route path="/monthlyIncome" element={<MonthlyIncome />} />
                        <Route path="/monthlyExpense" element={<MonthlyExpense />} />
                        <Route path="/monthlyRoom" element={<MonthlyRoom />} />
                        <Route path="/monthlyAdvance" element={<MonthlyAdvance />} />
                    </>
                ) : null}
            </Routes>
        </BrowserRouter>
    </>
}