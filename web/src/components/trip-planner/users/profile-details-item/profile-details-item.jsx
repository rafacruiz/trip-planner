
import { Link } from "react-router-dom";
import SanitizedHtml from '../../utils/sanitized-html';

function ProfileDetailsItem({ user }) {
    return (
        <>
            <h2 className="text-lg font-semibold text-gray-700 mt-12 mb-4 text-left">Trips Created</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                { user.trips?.map((trip) => (
                    <Link
                        to={ `/trips/${trip.id}` }
                        key={ trip.id }
                        className="bg-white border border-gray-100 rounded-2xl shadow p-4 hover:shadow-md transition"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{ trip.country.flag }</span>
                            <span className="text-xs text-gray-400 uppercase">{ trip.country.code }</span>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">{ trip.title }</h3>
                        <p className="text-xs text-gray-500 mb-1 capitalize">{ trip.city }</p>
                        <p className="text-xs text-gray-400">
                            { new Date(trip.startDate).toLocaleDateString() } - {' '}
                            { new Date(trip.endDate).toLocaleDateString() }
                        </p>
                        { trip.description && (
                            <div className="text-xs text-gray-500 mt-2 line-clamp-2">
                                { <SanitizedHtml 
                                    text={ trip.description } />
                                }
                            </div>
                        )}
                    </Link>
                ))}
                { !user.trips?.length && (
                    <p className="text-gray-400 text-sm col-span-full text-center">No trips created yet.</p>
                )}
            </div>
        </>
    );
}

export default ProfileDetailsItem;