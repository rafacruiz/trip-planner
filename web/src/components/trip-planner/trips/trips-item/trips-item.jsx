
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts';

import TripDate from '../trips-utils/date-trips';

function TripsItem({ trip }) {

    const { user } = useAuth();

    return (<>
        <Link
            to={ '/trips/' + trip.id }
            className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 
                hover:shadow-xl transition cursor-pointer"
        >
            <div className="relative h-44 overflow-hidden">
                { trip.imageUrl ?
                    <img
                    src={ trip.imageUrl }
                    alt={ trip.title }
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                :
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-400">
                        ✈️ No image available
                    </div>
                }
        
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-medium">
                   { trip.isSurprise ? "🎁 Surprise Trip" : `${ trip.country?.flag } ${ trip.country?.name }` }
                </div>

                <div className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-blue-600 text-white font-medium">
                    { trip.userOwner === user.id ? 'Owner' : 'Traveler' }
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                    { trip.isSurprise === false ? trip.title : 'Surprise Trip' }
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <TripDate 
                        startDate={ trip.startDate } 
                        endDate={ trip.endDate } 
                        isSurprise={ trip.isSurprise } 
                        revealDate={ trip.revealDate } />
                </div>

                <div className="flex gap-4 text-xs text-gray-500 mt-3">
                    <span>📍 { trip.places?.length } places</span>
                    <span>✅ { trip.activities?.length } activities</span>
                </div>

                <div className="flex items-center justify-between mt-5">
                    <div className="flex -space-x-2">
                        {trip.travelers.map((traveler) => (
                            <img
                                key={ traveler.id }
                                src={ traveler.user.avatar }
                                className="w-8 h-8 rounded-full border-2 border-white"
                            />
                        ))}
                    </div>

                    <span className="text-sm text-blue-600 font-medium group-hover:underline">
                        View Trip →
                    </span>
                </div>
            </div>
        </Link>
    </>);
}

export default TripsItem;