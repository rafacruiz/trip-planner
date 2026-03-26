
function TripSetupSkeleton() {

    return (

        <div className="min-h-screen bg-gray-50 px-4 py-8 flex justify-center">

            <div className="w-full max-w-5xl flex flex-col gap-8 animate-pulse">

                <div className="
                    bg-white
                    rounded-3xl
                    border border-gray-200
                    shadow-sm
                    p-6
                    space-y-3
                ">

                    <div className="h-7 w-80 bg-gray-200 rounded-lg" />

                    <div className="h-4 w-96 bg-gray-100 rounded-lg" />

                </div>

                <div className="
                    bg-white
                    rounded-3xl
                    border border-gray-200
                    shadow-sm
                    p-6
                    space-y-4
                ">

                    <div className="h-5 w-40 bg-gray-200 rounded" />

                    <div className="h-3 w-full bg-gray-100 rounded-full" />

                    <div className="grid grid-cols-3 gap-4 mt-4">

                        <div className="h-14 bg-gray-100 rounded-xl" />
                        <div className="h-14 bg-gray-100 rounded-xl" />
                        <div className="h-14 bg-gray-100 rounded-xl" />

                    </div>

                </div>

                <div className="
                    bg-white
                    rounded-3xl
                    border border-gray-200
                    shadow-sm
                    p-6
                    space-y-4
                ">

                    <div className="h-5 w-40 bg-gray-200 rounded" />

                    <div className="space-y-3">

                        {[1,2,3].map(i => (

                            <div
                                key={i}
                                className="
                                    flex items-center gap-3
                                    p-3
                                    border border-gray-100
                                    rounded-2xl
                                "
                            >

                                <div className="w-10 h-10 rounded-full bg-gray-200" />

                                <div className="flex flex-col gap-2 flex-1">

                                    <div className="h-4 w-40 bg-gray-200 rounded" />

                                    <div className="h-3 w-24 bg-gray-100 rounded" />

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                <div className="
                    bg-white
                    rounded-3xl
                    border border-gray-200
                    shadow-sm
                    p-6
                    space-y-4
                ">

                    <div className="h-5 w-32 bg-gray-200 rounded" />

                    <div className="space-y-3">

                        {[1,2,3].map(i => (

                            <div
                                key={i}
                                className="
                                    p-4
                                    rounded-2xl
                                    border border-gray-100
                                    space-y-2
                                "
                            >

                                <div className="h-4 w-40 bg-gray-200 rounded" />

                                <div className="h-3 w-56 bg-gray-100 rounded" />

                            </div>

                        ))}

                    </div>

                </div>

                <div className="
                    bg-white
                    rounded-3xl
                    border border-gray-200
                    shadow-sm
                    p-6
                    space-y-4
                ">

                    <div className="h-5 w-36 bg-gray-200 rounded" />

                    <div className="space-y-3">

                        {[1,2,3].map(i => (

                            <div
                                key={i}
                                className="
                                    flex items-center justify-between
                                    p-4
                                    rounded-2xl
                                    border border-gray-100
                                "
                            >

                                <div className="h-4 w-48 bg-gray-200 rounded" />

                                <div className="w-5 h-5 rounded bg-gray-200" />

                            </div>

                        ))}

                    </div>

                </div>

                <div className="flex justify-between items-center">

                    <div className="
                        h-12 w-36
                        rounded-2xl
                        bg-gray-200
                    " />

                    <div className="
                        h-12 w-40
                        rounded-2xl
                        bg-gray-200
                    " />

                </div>

            </div>

        </div>

    );

}

export default TripSetupSkeleton;