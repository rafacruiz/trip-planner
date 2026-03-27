
function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
            <div className="h-44 bg-gray-200" />
            <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="flex justify-between items-center pt-3">
                    <div className="flex gap-1">
                        <div className="w-8 h-8 bg-gray-200 rounded-full" />
                        <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-16" />
                </div>
            </div>
        </div>
    );
}

export default SkeletonCard;