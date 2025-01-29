import LoginPage from "@/pages/LoginPage"
import { BrowserRouter, Route, Routes } from "react-router"
import Report from "@/pages/DailyReports"
import AddReport from "@/pages/AddReport"
import EditReport from "@/pages/EditReport"

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
                    </>
                ) : null}
            </Routes>
        </BrowserRouter>

    </>
}