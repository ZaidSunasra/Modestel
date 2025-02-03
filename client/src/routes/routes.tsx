import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router"
import LoginPage from "@/pages/LoginPage"
import Report from "@/pages/DailyReportsPage"
import AddReport from "@/pages/AddReportPage"
import EditReport from "@/pages/EditReportPage"
import DailyExpense from "@/pages/DailyExpensePage"
import MonthlyIncome from "@/pages/MonthlyIncomePage"
import MonthlyExpense from "@/pages/MonthlyExpensePage"
import MonthlyRoom from "@/pages/MonthlyRoomPage"
import MonthlyAdvance from "@/pages/MonthlyAdvancePage"
import MonthlyCollection from "@/pages/MonthlyCollectionPage"
import Final from "@/pages/FinalPage"
import ManageAccount from "@/pages/ManageAccountPage"

const ProtectedRoute = ({ role, allowedRoles }: { role: string; allowedRoles: string[] }) => {
    return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/" replace />;
};

export const Router = () => {

    const role: string = localStorage.getItem("Role") || "";

    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route element={<ProtectedRoute role={role} allowedRoles={["admin", "receptionist", "user"]} />}>
                    <Route path="/dailyReport" element={<Report />} />
                    <Route path="/addReport" element={<AddReport />} />
                    <Route path="/editReport/:id" element={<EditReport />} />
                    <Route path="/dailyExpense" element={<DailyExpense />} />
                </Route>
                <Route element={<ProtectedRoute role={role} allowedRoles={["admin", "user"]} />}>
                    <Route path="/monthlyIncome" element={<MonthlyIncome />} />
                    <Route path="/monthlyExpense" element={<MonthlyExpense />} />
                    <Route path="/monthlyRoom" element={<MonthlyRoom />} />
                    <Route path="/monthlyAdvance" element={<MonthlyAdvance />} />
                    <Route path="/monthlyCollection" element={<MonthlyCollection />} />
                    <Route path="/final" element={<Final />} />
                    <Route path="/manageAccounts" element={<ManageAccount />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </>
}