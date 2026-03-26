
function InvitationSkeleton() {

    return (

        <div className="
            bg-white
            rounded-3xl
            border border-gray-200
            shadow-sm
            overflow-hidden
            animate-pulse
        ">

            <div className="h-40 bg-gray-200" />

            <div className="p-8 space-y-4">

                <div className="h-6 w-56 bg-gray-200 rounded" />

                <div className="h-4 w-72 bg-gray-100 rounded" />

                <div className="
                    flex
                    items-center
                    gap-3
                    pt-2
                ">

                    <div className="w-12 h-12 rounded-full bg-gray-200" />

                    <div className="space-y-2">

                        <div className="h-4 w-32 bg-gray-200 rounded" />

                        <div className="h-3 w-24 bg-gray-100 rounded" />

                    </div>

                </div>

                <div className="flex gap-3 pt-4">

                    <div className="h-12 w-28 bg-gray-200 rounded-2xl" />

                    <div className="h-12 w-40 bg-gray-200 rounded-2xl" />

                </div>

            </div>

        </div>

    );

}

export default InvitationSkeleton;