import FinalTable from "@/components/FinalTable";
import SideBar from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Printer } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Final = () => {

    const contentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef
    });

    return <div className="w-screen font-mono flex bg-background">
        <SideBar />
        <SidebarTrigger />
        <div className="w-full p-4">
            <div className="mb-4 flex justify-end">
                <Button onClick={() => handlePrint()}>
                    <Printer />
                    Print Report
                </Button>
            </div>
            <div ref={contentRef} className="text-primary">
                <FinalTable />
            </div>
        </div>
    </div>
}

export default Final;