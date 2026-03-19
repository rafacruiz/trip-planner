
import TripsItem from "../trips-item/trips-item";
import useUser from "../../../../hooks/use-user";

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

function TripsList() {

    const { user, loading } = useUser('me');
    
    if (loading) {
        return (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (!user || user.tripsJoined?.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {user.tripsJoined.map(trip => (
                <TripsItem key={trip.id} trip={trip} />
            ))}
        </div>
    );
}

export default TripsList;