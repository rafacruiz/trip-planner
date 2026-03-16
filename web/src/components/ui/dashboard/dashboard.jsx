
import { TripsList, TripsSlider } from "../../trip-planner";

function Dashboard() {
    return (
        <>
            <div className="mb-6 max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-800">
                    Community Trips
                </h1>

                <p className="text-gray-500 mt-2 leading-relaxed">
                    Get inspired, explore new destinations, and find ideas for your next adventure.
                </p>

                <p className="text-gray-500 mt-2 leading-relaxed">
                    Discover journeys shared by other travelers.
                </p>
            </div>

            <section className="mb-12">
                <TripsSlider/>
            </section>

            <div className="mb-10">
                <h1 className="text-2xl font-bold text-gray-800">My Trips</h1>
                <p className="text-gray-500 mt-1">
                    Plan, organize and share your adventures 🌍
                </p>
            </div>
            
            <section>
                <TripsList/>
            </section>
        </>
    );
}

export default Dashboard;