
import { Link } from "react-router-dom";
import { TripDateFormat } from "../utils";

function TripsCommunity({ trip }) {

    return (
        <Link
            to={ '/trips/' + trip.id } 
            className="group w-[300px] h-[150px] rounded-2xl border border-gray-100 
            bg-gradient-to-br from-blue-200 to-indigo-400 shadow-sm hover:shadow-md 
            transition p-4 cursor-pointer flex flex-col justify-between">
  

            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-white">
                    { trip.isSurprise ? (
                        <span className="ml-1 text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                            🎁
                        </span>
                    ) : (
                        <>
                            <span className="text-sm">{ trip.country.flag }</span>
                            <span>{ trip.country.name[0].toUpperCase()}{trip.country.name.slice(1) }</span>
                        </>
                    )}
                </div>

                <span className="text-xs text-white group-hover:text-blue-600 transition">
                    Explore →
                </span>
            </div>

            <div>
                { !trip.isSurprise && (  
                    <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">
                        { trip.title }
                    </h3>
                )}
                
                <div className="text-xs mt-1">
                    <TripDateFormat
                        startDate={ trip.startDate }
                        endDate={ trip.endDate }
                        isSurprise={ trip.isSurprise }
                        revealDate={ trip.revealDate }
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                    {trip.travelers.slice(0, 4).map((traveler, i) => (
                        <img
                            key={ i }
                            src={ traveler.user.avatar }
                            className="w-6 h-6 rounded-full border-2 border-white"
                        />
                    ))}
                </div>

                <div className="flex gap-3 text-xs text-white">
                    <span>📍 { trip.places.length }</span>
                    <span>✅ { trip.activities.length }</span>
                </div>
            </div>
        </Link>
    );
}

export default TripsCommunity;