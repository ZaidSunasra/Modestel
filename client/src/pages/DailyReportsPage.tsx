import ReportTable from "@/components/DailyReportTable";
import SideBar from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router";

const Report = () => {

    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen flex font-mono bg-background">
            <SideBar />
            <SidebarTrigger />
            <div className="w-full p-4">
                <div className="flex justify-end mb-4">
                    <Button
                        onClick={() => {
                            navigate("/addReport");
                        }}
                    >Add Report </Button>
                </div>
                <ReportTable />
            </div>
        </div>
    )

};

export default Report;