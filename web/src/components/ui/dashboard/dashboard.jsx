
import { TripsList } from "../../trip-planner";

function Dashboard() {
    return (
        <>
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-800">My Trips</h1>
                <p className="text-gray-500 mt-1">
                    Plan, organize and share your adventures 🌍
                </p>
            </div>

            <TripsList/>
        </>
    );
}

export default Dashboard;