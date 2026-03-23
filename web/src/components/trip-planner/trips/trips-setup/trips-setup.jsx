
import { Link, useParams } from "react-router-dom";
import TripSetupProgress from "../trip-setup-progress/trip-setup-progress";
import TravelersSection from "../trips-sections/section-traveler/section-traveler";
import PlacesSection from "../trips-sections/section-places/section-places";
import ActivitiesSection from "../trips-sections/section-activities/section-activities";
import useTrip from '../../../../hooks/use-trip';

function TripsSetup() {

  const { tripId } = useParams();

  const trip = useTrip(tripId);

  return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 flex justify-center">
            <div className="w-full max-w-5xl flex flex-col gap-8">
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Finish setting up your trip ✈️
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Add travelers, places and activities to complete your trip
                    </p>
                </div>
                
                <TripSetupProgress tripData={ trip } />

                <TravelersSection tripData={ trip }/>

                <PlacesSection tripData={ trip } />

                <ActivitiesSection tripData={ trip } />

                <div className="flex justify-between items-center">
                
                    <Link
                        to={`/trips/${tripId}`}
                        className="
                        px-6 py-3
                        rounded-2xl
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600

                        text-white
                        font-semibold

                        shadow-md
                        hover:shadow-lg
                        hover:scale-[1.02]
                        transition
                        "
                    >
                        Set up later
                    </Link>
                
                    <Link
                        to={`/trips/${tripId}`}
                        className="
                        px-6 py-3
                        rounded-2xl
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600

                        text-white
                        font-semibold

                        shadow-md
                        hover:shadow-lg
                        hover:scale-[1.02]
                        transition
                        "
                    >
                        Finish setup ✨
                    </Link>   
                </div>
            </div>
        </div>
    );
}

export default TripsSetup;