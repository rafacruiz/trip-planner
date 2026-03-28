
import TripsListItem from "../trips-list-item/trips-list-item";
import SkeletonCard from './trips-card-skeleton';

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-24">
            <div className="text-7xl mb-6">🗺️</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                No trips yet
            </h2>
            <p className="text-gray-500 max-w-md">
                Start planning your next adventure. Create your first trip and invite
                your friends to explore the world together.
            </p>
        </div>
    );
}

function TripsList({ trips = null, loading = false }) {

    if (loading) {
        return (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={ i } />
                ))}
            </div>
        );
    }

    if (!trips || trips?.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            { trips.map((trip, i) => (
                <TripsListItem 
                    key={ i } 
                    trip={ trip } 
                />
            ))}
        </div>
    );
}

export default TripsList;