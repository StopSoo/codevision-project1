export default function MedicineDetailSkeleton() {
    return (
        <div className="flex flex-col space-y-6 h-full overflow-y-auto pr-2 animate-pulse">
            <h2 className="w-[300px] h-10 bg-gray-100 rounded-xl" />
            <div className="flex flex-row gap-10">
                <div className="w-40 h-40 border border-gray-200 bg-gray-100 rounded-xl flex items-center justify-center" />

                <div className="flex flex-col justify-center w-[400px] border border-gray-200 rounded-lg p-4 space-y-2">
                    <div className="flex flex-row items-center justify-around gap-4">
                        <span className="w-[40%] h-8 bg-gray-100 rounded-xl" />
                        <span className="w-[60%] h-8 bg-gray-100 rounded-xl" />
                    </div>
                    <div className="w-full h-[1px] bg-gray-100 my-5 justify-center" />
                    <div className="flex flex-row items-center justify-around gap-4 text-sm font-medium text-sub-font">
                        <span className="w-[40%] h-5 bg-gray-100 rounded-xl" />
                        <span className="w-[60%] h-5 bg-gray-100 rounded-xl" />
                    </div>
                    <div className="flex flex-row items-center justify-around gap-4 text-sm text-sub-font">
                        <span className="w-[40%] h-5 bg-gray-100 rounded-xl" />
                        <span className="w-[60%] h-5 bg-gray-100 rounded-xl" />
                    </div>
                    <div className="flex flex-row items-center justify-around gap-4 text-sm text-sub-font">
                        <span className="w-[40%] h-5 bg-gray-100 rounded-xl" />
                        <span className="w-[60%] h-5 bg-gray-100 rounded-xl" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col space-y-4">
                <div className="rounded-xl bg-gray-100 h-10 gap-4 py-3" />
                <div className="rounded-xl bg-gray-100 h-8 gap-4 py-3" />
                <div className="rounded-xl bg-gray-100 h-8 gap-4 py-3" />
                <div className="rounded-xl bg-gray-100 h-8 gap-4 py-3" />
                <div className="rounded-xl bg-gray-100 h-8 gap-4 py-3" />
            </div>
        </div>
    );
};