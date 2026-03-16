
import { TripsList, TripsSlider } from "../../trip-planner";

function Dashboard() {
    return (
        <>
            <section className="mb-12">
                <TripsSlider/>
            </section>

            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-800">My Trips</h1>
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