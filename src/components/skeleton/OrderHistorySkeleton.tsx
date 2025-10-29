export default function OrderHistorySkeleton({ count }: { count: number }) {
    return (
        <div className="animate-pulse flex flex-col">
            {
                [...Array(count)].map((_, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-6 gap-4 p-4 bg-white text-center"
                    >
                        <div className="w-30 h-8 bg-gray-300 rounded-xl" />
                        <div className="w-30 h-8 bg-gray-300 rounded-xl" />
                        <div className="w-30 h-8 bg-gray-300 rounded-xl" />
                        <div className="w-30 h-8 bg-gray-300 rounded-xl" />
                        <div className="w-30 h-8 bg-gray-300 rounded-xl" />
                        <div className="w-30 h-8 bg-gray-300 rounded-xl" />
                    </div>
                ))}
        </div>
    );
}