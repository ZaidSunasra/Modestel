import LoginPage from "@/pages/LoginPage"
import { BrowserRouter, Route, Routes } from "react-router"
import Report from "@/pages/DailyReportsPage"
import AddReport from "@/pages/AddReportPage"
import EditReport from "@/pages/EditReportPage"
import DailyExpense from "@/pages/DailyExpensePage"

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
            </Routes>
        </BrowserRouter>

    </>
}