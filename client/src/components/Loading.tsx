import { Skeleton } from "./ui/skeleton";

const Loading = ( { height, width }: { height: string | number; width: string | number }) => {
    return <div style={{width, height}} className="overflow-hidden">
        <div className="mb-2">
            <Skeleton className="w-full h-10"/>
        </div>
        <div className="mb-2">
            <Skeleton className="w-full h-[48.8px]" />
        </div>
        <div className="mb-2">
            <Skeleton className="w-full h-[48.8px]" />
        </div>
        <div className="mb-2">
            <Skeleton className="w-full h-[48.8px]" />
        </div>
        <div className="mb-2">
            <Skeleton className="w-full h-[48.8px]" />
        </div>
        <div className="mb-2">
            <Skeleton className="w-full h-[48.8px]" />
        </div>
        <div className="mb-2">
            <Skeleton className="w-full h-[48.8px]" />
        </div>
        <div className="mb-2">
            <Skeleton className="w-full h-[48.8px]" />
        </div>
        <div className="mb-2">
            <Skeleton className="w-full h-[48.8px]" />
        </div>
        <div className="mb-2">
            <Skeleton className="w-full h-[48.8px]" />
        </div>
        <div className="mb-2">
            <Skeleton className="w-full h-[48.8px]" />
        </div>
        <div className="mb-2">
            <Skeleton className="w-full h-[48.8px]" />
        </div>
        <div className="mb-2">
            <Skeleton className="w-full h-[37.2px]"/>
        </div>
    </div>
}

export default Loading;