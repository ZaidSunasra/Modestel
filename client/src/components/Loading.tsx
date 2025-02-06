import SideBar from "./SideBar";
import { SidebarTrigger } from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

const Loading = ({ height, width, sideBar, button }: { height: string | number; width: string | number, sideBar: boolean, button: boolean }) => {
    return <div className={sideBar ? "flex w-screen bg-background" : "flex bg-background"}>
        {sideBar && <SideBar />}
        {sideBar && <SidebarTrigger />}
        <div className={sideBar ? "w-full p-4" : "w-full"}>
            <div className="flex justify-end">
                {button && <Skeleton className="h-9 w-28 mb-4"></Skeleton>}
            </div>
            <div style={{width, height}} className="overflow-hidden">
                <Skeleton className="w-full h-10 mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-[36.8px] mb-2" />
                <Skeleton className="w-full h-10 mb-2" />
            </div>
        </div>
    </div>
}

export default Loading;