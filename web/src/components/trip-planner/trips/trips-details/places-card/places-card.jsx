
import { updateStatePlace } from '../../../../../services/api-services';

function PlacesCard({ trip, handleCheckToggle }) {

    return (
        <section 
            className={`rounded-2xl shadow-sm border border-gray-100 p-6 ${ !trip.isSurprise 
                ? "bg-white" 
                : "bg-gradient-to-br from-indigo-100 to-purple-100" }`
            }
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Places</h2>
            </div>

            <div
                className="space-y-3 cursor-pointer">
                { trip.places.map(place => (
                    <div
                    onClick={ () => 
                        handleCheckToggle( { 
                            onAction: updateStatePlace, 
                            idValue: place.id,
                            value: { "visited": true }
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
    );
}

export default PlacesCard;