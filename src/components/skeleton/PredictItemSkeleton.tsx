export default function PredictItemSkeleton() {
    return (
        <div
            className="animate-pulse flex flex-col"
        >
            {
                [...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-7 gap-4 p-4 bg-white text-center"
                    >
                        <div className="h-8 bg-gray-100 rounded-xl col-span-2" />
                        <div className="h-8 bg-gray-100 rounded-xl col-span-1" />
                        <div className="h-8 bg-gray-100 rounded-xl col-span-2" />
                        <div className="h-8 bg-gray-100 rounded-xl col-span-2" />
                    </div>
                ))
            }
        </div>
    );
};