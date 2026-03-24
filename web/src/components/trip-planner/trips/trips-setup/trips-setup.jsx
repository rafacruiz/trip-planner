
import { Link, useParams } from "react-router-dom";
import TripsSetupProgress from "../trips-setup-progress/trips-setup-progress";
import { TravelersSection, PlacesSection, ActivitiesSection } from '../trips-sections';
import { useTrip } from '../../../../hooks';

function TripsSetup() {

  const { tripId } = useParams();

  const { trip, loading, error, refetch } =  useTrip(tripId);

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
                
                <TripsSetupProgress 
                    trip={ trip } 
                    loading={ loading } 
                />

                <TravelersSection 
                    trip={ trip } 
                    loading={ loading } 
                    error={ error } 
                    refetch={ refetch }
                />

                <PlacesSection 
                    trip={ trip } 
                    loading={ loading } 
                    error={ error } 
                    refetch={ refetch } 
                />

                <ActivitiesSection 
                    trip={ trip } 
                    loading={ loading } 
                    error={ error } 
                    refetch={ refetch } 
                />

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