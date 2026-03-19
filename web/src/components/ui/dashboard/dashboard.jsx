
import { TripsList, TripsSlider } from "../../trip-planner";
import { Loading, Alert, ButtonLink } from '../.';
import useUser from "../../../hooks/use-user";

function Dashboard() {

    const { user, loading, error } = useUser('me');

    if (loading) return <Loading text={'Loading dashboard...'} />

    if (error) return <Alert message={ error.message } type={ "warning" } center={ true } />

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
                <TripsList trips={ user.tripsJoined } loading={ loading } />
            </section>

            <ButtonLink url={'/trips?me=true'} text={'View more trips'} />
        </>
    );
}

export default Dashboard;