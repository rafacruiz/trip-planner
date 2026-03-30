
function TripDetailSkeleton() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 animate-pulse">
        <div className="h-72 w-full bg-gradient-to-r from-blue-200 to-indigo-200" />  
            <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
                <div className="bg-white rounded-2xl p-6 space-y-4">

                    <div className="h-5 w-40 bg-gray-200 rounded" />

                    <div className="flex gap-3">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl"
                            >
                                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                                <div className="h-3 w-20 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2].map(i => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl p-6 space-y-4"
                        >
                            <div className="h-5 w-40 bg-gray-200 rounded" />
                            <div className="h-3 w-full bg-gray-200 rounded" />
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl p-6 space-y-4">
                    <div className="h-5 w-40 bg-gray-200 rounded" />
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center p-4 rounded-xl bg-gray-100"
                        >
                            <div className="space-y-2">
                                <div className="h-4 w-32 bg-gray-200 rounded" />
                                <div className="h-3 w-24 bg-gray-200 rounded" />
                            </div>
                            <div className="h-6 w-16 bg-gray-200 rounded-full" />
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl p-6 space-y-4">
                    <div className="h-5 w-40 bg-gray-200 rounded" />
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center p-4 rounded-xl bg-gray-100"
                        >
                            <div className="h-4 w-40 bg-gray-200 rounded" />
                            <div className="w-4 h-4 bg-gray-200 rounded" />
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl p-6">
                    <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
                    <div className="h-72 bg-gray-200 rounded-xl" />
                </div>
             </main>
        </div>
    );
}

export default TripDetailSkeleton;