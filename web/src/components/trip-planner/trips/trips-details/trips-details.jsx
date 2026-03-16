
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as ServicesApi from '../../../../services/api-services';


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
                style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}

function Modal({ open, title, children, onClose }) {
    
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                {children}
            </div>
        </div>
    );
}

function TripsDetails() {
    
    const { tripId } = useParams();

    const [placeModal, setPlaceModal] = useState(false);
    const [activityModal, setActivityModal] = useState(false);
    const [travelerModal, setTravelerModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [trip, setTrip] = useState(null);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const trip = await ServicesApi.getTripsDetails(tripId);
                setTrip(trip.data);
                setLoading(!trip.success);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTrip();
    }, []);

    if (loading) return ('Cargando');

    console.log(trip)

    const visitedPlaces = trip.places.filter(p => p.visited).length;
    const completedActivities = trip.activities.filter(a => a.completed).length;

    const revealReached = new Date() >= new Date(trip.revealDate);

    return (
        <>
            { !loading && trip && (
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
                    <div className="relative h-64 w-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <h1 className="text-3xl font-bold">{trip.title}</h1>
                            <p className="text-sm opacity-90">
                                {trip.country.flag} {trip.country.name}
                            </p>
                        </div>

                        <button className="absolute top-6 right-6 bg-white/90 backdrop-blur text-sm px-4 py-2 rounded-xl shadow hover:bg-white">
                        ✏️ Edit Trip
                        </button>
                    </div>

                    <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
                        {trip.isSurprise && !revealReached && (
                            <div className="bg-purple-50 border border-purple-200 text-purple-700 rounded-2xl p-5 text-center">
                                🎁 Destination will be revealed on {trip.revealDate}
                            </div>
                        )}

                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Travelers</h2>
                                <button 
                                    onClick={() => setTravelerModal(true)} 
                                    className="text-sm text-blue-600 hover:underline">
                                    + Invite traveler
                                </button>
                            </div>

                            <div className="flex gap-4 flex-wrap">
                                { trip.travelers.map(traveler => (
                                    <div key={ traveler.id } className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl">
                                        <img src={ traveler.user.avatar } className="w-8 h-8 rounded-full" />
                                        <span className="text-sm text-gray-700">{ traveler.name }</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full 
                                            ${ traveler.user.id === trip.userOwner.id
                                            ? "bg-blue-100 text-blue-700" 
                                            : "bg-gray-200 text-gray-600"}`}>
                                            { traveler.user.id === trip.userOwner.id ? 'Owner' : 'Traveler' }
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Places progress</h2>
                                <ProgressBar value={visitedPlaces} total={trip.places.length ?? 0} />
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Activities progress</h2>
                                <ProgressBar value={completedActivities} total={trip.activities.length ?? 0} />
                            </div>
                        </section>

                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Places</h2>
                                <button onClick={() => setPlaceModal(true)} className="text-sm text-blue-600 hover:underline">+ Add place</button>
                            </div>

                            <div className="space-y-3">
                                {trip.places.map(place => (
                                <div key={place.id} 
                                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50">
                                    <div>
                                        <p className="font-medium text-gray-800">{place.name}</p>
                                        <p className="text-xs text-gray-500">{place.location}</p>
                                    </div>

                                    <span className={`text-xs px-3 py-1 rounded-full 
                                        ${place.visited 
                                        ? "bg-green-100 text-green-700" 
                                        : "bg-gray-100 text-gray-500"}`}>
                                        { place.visited ? "Visited" : "Pending" }
                                    </span>
                                </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Activities</h2>
                                <button 
                                    onClick={() => setActivityModal(true)} 
                                    className="text-sm text-blue-600 hover:underline">
                                    + Add activity
                                </button>
                            </div>

                            <div className="space-y-3">
                                {trip.activities.map(activity => (
                                <div key={activity.id} 
                                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50">
                                    <p className={`text-sm ${activity.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
                                        {activity.title}
                                    </p>

                                    <input type="checkbox" checked={activity.completed} readOnly className="w-4 h-4" />
                                </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Trip map</h2>

                            <div className="h-72 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 
                                flex items-center justify-center text-blue-500 text-sm">
                                🗺 Map will display trip places here
                            </div>
                        </section>
                    </main>

                    <Modal open={placeModal} 
                        title="Add place" 
                        onClose={() => setPlaceModal(false)}>
                            <form className="space-y-4">
                                <input placeholder="Place name" className="w-full border rounded-xl px-3 py-2" />
                                <input placeholder="Location" className="w-full border rounded-xl px-3 py-2" />
                                <textarea placeholder="Notes" className="w-full border rounded-xl px-3 py-2" />

                                <button className="w-full bg-blue-600 text-white py-2 rounded-xl">Add place</button>
                            </form>
                    </Modal>

                    <Modal open={activityModal} 
                        title="Add activity" 
                        onClose={() => setActivityModal(false)}>
                            <form className="space-y-4">
                                <input placeholder="Activity title" className="w-full border rounded-xl px-3 py-2" />

                                <button className="w-full bg-blue-600 text-white py-2 rounded-xl">Add activity</button>
                            </form>
                    </Modal>

                    <Modal open={travelerModal} 
                        title="Invite traveler" 
                        onClose={() => setTravelerModal(false)}>
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {users?.map(user => (
                                    <div key={user.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50">
                                        <div className="flex items-center gap-2">
                                            <img src={user.avatar} className="w-8 h-8 rounded-full" />
                                            <span className="text-sm text-gray-700">{user.username}</span>
                                        </div>

                                        <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg">
                                            Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                    </Modal>
                </div>
            )}
        </>
    );
}

export default TripsDetails;