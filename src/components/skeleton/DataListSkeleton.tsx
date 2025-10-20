export default function DataListSkeleton() {
    return (
        <div className="animate-pulse flex flex-col gap-5">
            {[...Array(6)].map((_, i) => (
                <div className="border-2 flex flex-col gap-4 p-2 rounded-xl">
                    <div key={i} className="h-6 w-full bg-gray-300 rounded-lg" />

                    <div className="flex flex-row justify-between gap-3">
                        <div className="h-5 w-[48%] bg-gray-300 rounded-lg" />
                        <div className="h-5 w-[48%] bg-gray-300 rounded-lg" />
                    </div>

                    <div className="w-full h-[1px] bg-gray-300" />

                    <div className="flex flex-row justify-between gap-3">
                        <div className="h-5 w-[48%] bg-gray-300 rounded-lg" />
                        <div className="h-5 w-[48%] bg-gray-300 rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    );
}