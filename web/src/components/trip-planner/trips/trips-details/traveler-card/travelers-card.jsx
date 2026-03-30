
const getTravelerBadgeStyles = (traveler, ownerId) => {
    if (traveler.user.id === ownerId) {
        return "bg-blue-100 text-blue-700";
    }

    const statusStyles = {
        accepted: "bg-sky-100 text-sky-600",
        pending: "bg-gray-100 text-gray-700",
        rejected: "bg-gray-100 text-red-400",
    };

    return statusStyles[traveler.status] || "";
};


function TravelerCard({ trip }) {

    return (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Travelers</h2>
            </div>
        
            <div className="flex gap-3 flex-wrap">
                {trip.travelers.map(traveler => (
                    <div
                    key={ traveler.id }
                    className="
                        flex items-center gap-2
                        px-3 py-2
                        rounded-2xl
                        bg-gray-50
                        border border-gray-100
                        hover:bg-white
                        hover:shadow-sm
                        transition"
                    >
                        <img
                            src={ traveler.user.avatar }
                            title={`${ traveler?.status } approval`}
                            className={`
                                w-9 h-9
                                rounded-full
                                object-cover
                                border border-gray-200
                                ${ traveler?.status !== 'accepted' 
                                    && "grayscale opacity-50" }
                            `}
                        />

                        <span className="text-sm font-medium text-gray-700">
                            { traveler.name }
                        </span>

                        <span className={`
                            text-xs px-2 py-0.5 rounded-full font-medium
                            ${ getTravelerBadgeStyles(traveler, trip.userOwner.id) }
                        `}>
                            { traveler.user.id === trip.userOwner.id
                                ? "Owner"
                                : "Traveler"
                            }
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default TravelerCard;