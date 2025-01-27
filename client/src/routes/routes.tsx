import LoginPage from "@/pages/LoginPage"
import { BrowserRouter, Route, Routes } from "react-router"
import Report from "@/pages/DailyReports"

export const Router = () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dailyReport" element={<Report />} />
            </Routes>
        </BrowserRouter>
    </>
}