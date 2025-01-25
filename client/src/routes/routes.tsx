import Dashboard from "@/pages/Dashbord"
import LoginPage from "@/pages/LoginPage"
import { BrowserRouter, Route, Routes } from "react-router"

export const Router = () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    </>
}