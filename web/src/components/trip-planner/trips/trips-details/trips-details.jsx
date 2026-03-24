
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from '../../../../contexts/auth-context';
import { useTrip } from '../../../../hooks';
import { TravelersSection, PlacesSection, ActivitiesSection } from '../trips-sections';
import TripDetailSkeleton from "./trips-details-skeleton";
import { updateStatePlace, updateStateActivity } from '../../../../services/api-services';


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

function TripsDetails() {
    
    const { tripId } = useParams();

    const { trip, loading, error, refetch } = useTrip( tripId );

    const { user } = useAuth();

    const [edit, setEdit] = useState(false);
    
    if (loading) {
        return <TripDetailSkeleton />;
    }

    if (!trip) return null;

    const handleEdit = () => {
        setEdit(prev => !prev);
    };

    const handleCheck = async ({ action, id, data }) => {
        try {
            await action(tripId, id, data);
            refetch();
        } catch (error) {
            console.error(error?.message);
        }
    };

    const visitedPlaces = trip.places.filter(p => p.visited).length;
    const completedActivities = trip.activities.filter(a => a.completed).length;

    const revealReached = new Date() >= new Date(trip.revealDate);

    return (
        <>
            { !loading && trip && (
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
                    <div className="relative h-72 w-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500" />
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                            <div className="absolute bottom-8 left-8 text-white">
                                <h1 className="text-4xl font-bold tracking-tight">
                                    { trip.title }
                                </h1>

                                <p className="text-sm opacity-90 mt-1">
                                    { trip.country?.flag } { trip.country?.name }
                                </p>
                            </div>

                            {user.id.toString() === trip.userOwner.id.toString() && (
                                <button
                                onClick={handleEdit}
                                className="
                                    absolute top-6 right-6
                                    flex items-center gap-2
                                    bg-white/90
                                    backdrop-blur
                                    px-4 py-2
                                    rounded-xl
                                    text-sm font-medium
                                    text-gray-700
                                    shadow-sm
                                    hover:bg-white
                                    hover:shadow-md
                                    transition
                                    cursor-pointer
                                "
                                >
                                ✏️ Edit Trip
                                </button>
                            )}
                        </div>

                    <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
                        {trip.isSurprise && !revealReached && (
                            <div className="bg-purple-50 border border-purple-200 text-purple-700 rounded-2xl p-5 text-center">
                                🎁 Destination will be revealed on {trip.revealDate}
                            </div>
                        )}

                        <section className="
                            bg-white
                            rounded-3xl
                            border border-gray-100
                            shadow-sm
                            p-6
                            hover:shadow-md
                            transition
                        ">

                            <div className="flex items-center justify-between mb-4">
                                <h2 className="
                                    text-lg
                                    font-semibold
                                    text-gray-800
                                    flex items-center gap-2
                                ">
                                    📝 Description
                                </h2>

                                { edit && (
                                    <button
                                        className="
                                        text-sm
                                        text-blue-600
                                        hover:text-blue-700
                                        hover:underline
                                        transition
                                        "
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>

                            {trip.description ? (
                                <p className="
                                    text-sm
                                    text-gray-600
                                    leading-relaxed
                                    whitespace-pre-line
                                ">
                                    { trip.description }
                                </p>
                            ) : (
                                <div className="
                                    text-sm
                                    text-gray-400
                                    italic
                                ">
                                    No description added yet.
                                </div>
                            )}
                        </section>

                        { !edit 
                        ?   <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Travelers</h2>
                                </div>
                            
                                <div className="flex gap-3 flex-wrap">
                                    {trip.travelers.map(traveler => (
                                        <div
                                        key={traveler.id}
                                        className="
                                            flex items-center gap-2
                                            px-3 py-2
                                            rounded-2xl
                                            bg-gray-50
                                            border border-gray-100
                                            hover:bg-white
                                            hover:shadow-sm
                                            transition"
                                        >
                                            <img
                                                src={traveler.user.avatar}
                                                className="
                                                w-9 h-9
                                                rounded-full
                                                object-cover
                                                border border-gray-200
                                                "
                                            />

                                            <span className="text-sm font-medium text-gray-700">
                                                {traveler.name}
                                            </span>

                                            <span className={`
                                                text-xs px-2 py-0.5 rounded-full font-medium

                                                ${traveler.user.id === trip.userOwner.id
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-gray-200 text-gray-600"}
                                            `}>
                                                {traveler.user.id === trip.userOwner.id
                                                ? "Owner"
                                                : "Traveler"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        :
                            <TravelersSection 
                                trip={ trip } 
                                loading={ loading } 
                                error={ error } 
                                refetch={ refetch }
                            />
                        }

                        <section className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Places progress</h2>
                                <ProgressBar value={ visitedPlaces } total={ trip.places.length ?? 0 } />
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Activities progress</h2>
                                <ProgressBar value={ completedActivities } total={ trip.activities.length ?? 0 } />
                            </div>
                        </section>

                        { !edit 
                        ?   <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Places</h2>
                                </div>

                                <div
                                    className="space-y-3 cursor-pointer">
                                    { trip.places.map(place => (
                                        <div
                                        onClick={ () => 
                                            handleCheck( { 
                                                action: updateStatePlace, 
                                                id: place.id,
                                                data: { "visited": true }
                                            })
                                        } 
                                        key={place.id}
                                        className="
                                            flex items-center justify-between
                                            p-4
                                            rounded-2xl
                                            border border-gray-100
                                            bg-gray-50
                                            hover:bg-white
                                            hover:shadow-sm
                                            transition"
                                        >
                                            <div className="flex flex-col">
                                                <p className="font-semibold text-gray-800">
                                                    📍 { place.name }
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    { place.location }
                                                </p>
                                            </div>

                                            <span className={`
                                                text-xs px-3 py-1 rounded-full font-medium
                                                ${ place.visited
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-500"}
                                            `}>
                                                { place.visited ? "Visited" : "Pending" }
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        :
                            <PlacesSection 
                                trip={ trip } 
                                loading={ loading } 
                                error={ error } 
                                refetch={ refetch } 
                            />
                        }

                        { !edit 
                        ?   <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Activities</h2>
                                </div>

                                <div className="space-y-3 cursor-pointer">
                                    {trip.activities.map(activity => (
                                        <div
                                        onClick={ () => 
                                            handleCheck( { 
                                                action: updateStateActivity, 
                                                id: activity.id,
                                                data: { "completed": true } 
                                            })
                                        } 
                                        key={ activity.id }
                                        className="
                                            flex items-center justify-between
                                            p-4
                                            rounded-2xl
                                            border border-gray-100
                                            bg-gray-50
                                            hover:bg-white
                                            hover:shadow-sm
                                            transition"
                                        >

                                            <p className={`
                                                text-sm font-medium
                                                ${activity.completed
                                                ? "line-through text-gray-400"
                                                : "text-gray-700"}
                                            `}>
                                                🎯 { activity.title }
                                            </p>

                                            <input
                                                type="checkbox"
                                                checked={ activity.completed }
                                                readOnly
                                                className="
                                                w-4 h-4
                                                accent-blue-600"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        :
                             <ActivitiesSection 
                                trip={ trip } 
                                loading={ loading } 
                                error={ error } 
                                refetch={ refetch } 
                            />
                        }

                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Trip map</h2>

                            <div className="h-72 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 
                                flex items-center justify-center text-blue-500 text-sm">
                                🗺 Map is not available for this trip yet.
                            </div>
                        </section>
                    </main>
                </div>
            )}
        </>
    );
}

export default TripsDetails;