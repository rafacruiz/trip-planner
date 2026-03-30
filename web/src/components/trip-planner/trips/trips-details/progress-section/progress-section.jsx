
function ProgressBar({ value, total }) {
    const percent = total === 0 ? 0 : Math.round((value / total) * 100);

    return (
        <div className="w-full">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{value}/{total}</span>
                <span>{percent}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                    className="bg-blue-500 h-full transition-all"
                    style={{ width: `${ percent }%` }}
                />
            </div>
        </div>
    );
}

function ProgressSection({ revealReached, places, activities }) {

    if (revealReached) {

        const visitedPlaces = places.filter(p => p.visited).length;

        const completedActivities = activities.filter(a => a.completed).length;

        return (
            <section className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Places progress</h2>
                    <ProgressBar value={ visitedPlaces } total={ places.length ?? 0 } />
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Activities progress</h2>
                    <ProgressBar value={ completedActivities } total={ activities.length ?? 0 } />
                </div>
            </section>
        );
    }
}

export default ProgressSection;