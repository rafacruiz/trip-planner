
import SanitizedHtml from '../../../utils/sanitized-html';

function InformationCard({ trip, user, revealReached }) {

    if (revealReached || user.id.toString() === trip.userOwner.id.toString()) {

        return (
            <section className="
                bg-white
                rounded-3xl
                border border-gray-100
                shadow-sm
                p-6
                hover:shadow-md
                transition
            ">
                <div className="mb-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">City:</span>
                        <span className="text-gray-800">{trip.city || "N/A"}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Start Date:</span>
                        <span className="text-gray-800">
                            {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : "N/A"}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">End Date:</span>
                        <span className="text-gray-800">
                            {trip.endDate ? new Date(trip.endDate).toLocaleDateString() : "N/A"}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            📝 Description
                        </h2>
                    </div>

                    {trip.description ? (
                        <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            <SanitizedHtml text={trip.description} />
                        </div>
                    ) : (
                        <div className="text-sm text-gray-400 italic">
                            No description added yet.
                        </div>
                    )}
                </div>
            </section>
        );
    }
}

export default InformationCard;