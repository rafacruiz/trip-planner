
function TripsSetupProgress({ trip = [], loading }) {

    if (loading) return null;

    return (
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Setup Progress
            </h2>

            <div className="flex flex-col gap-3">
                <ProgressItem
                    label="Travelers"
                    count={ trip?.travelers }
                />

                <ProgressItem
                    label="Places"
                    count={ trip?.places }
                />

                <ProgressItem
                    label="Activities"
                    count={ trip?.activities }
                />
            </div>
        </div>
    );
}

function ProgressItem({ label, count }) {

    const completed = count.length > 0;

    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
                { label }
            </span>

            { completed ? (
                <span className="text-green-600 font-medium">
                ✔ Added
                </span>
            ) : (
                <span className="text-gray-400">
                    Not added
                </span>
            )}
        </div>
    );
}

export default TripsSetupProgress;