
import { Link, useParams } from "react-router-dom";
import { Alert, Loading } from "../../../ui";
import { useUser } from '../../../../hooks';
import ProfileDetailsItem from "../profile-details-item/profile-details-item";

function UserDetails() {

    const { userId } = useParams();

    const {user, loading, error, userStats } = useUser(userId);

    if (loading) return <Loading/>;

    if (error) return <Alert message={ error?.message } type={ 'warning' } center={ true } />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex justify-center py-16 px-6">
            <div className="w-full max-w-2xl">
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-32 relative flex justify-center">
                        <div className="absolute -bottom-14 group">
                            <img
                                src={ user?.avatar }
                                alt={ user?.username }
                                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                        </div>
                    </div>
                    
                    <div className="pt-16 pb-8 px-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                                {user?.username}
                            </h1>
                            <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                                Traveler
                            </span>
                            <p className="text-sm text-gray-400 flex items-center gap-1">
                                <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                Joined {new Date(user?.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="mt-6 max-w-xl mx-auto">
                            <div 
                            className="relative 
                                bg-gray-50 
                                border 
                                border-gray-100 
                                rounded-2xl 
                                px-5 
                                py-4 
                                shadow-sm 
                                hover:shadow-md 
                                transition">
                                <p className="text-gray-700 text-sm leading-relaxed text-center">
                                    {user?.bio || "This user hasn’t added a bio yet."}
                                </p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="bg-blue-50 rounded-2xl p-4">
                                <p className="text-2xl font-bold text-blue-600">{userStats?.totalOwnedTrips || 0}</p>
                                <p className="text-xs text-gray-500">Trips created</p>
                            </div>
                            <div className="bg-indigo-50 rounded-2xl p-4">
                                <p className="text-2xl font-bold text-indigo-600">{userStats?.totalJoinedTrips || 0}</p>
                                <p className="text-xs text-gray-500">Trips joined</p>
                            </div>
                        </div>

                        <div className="mt-8 text-left space-y-4">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-400">Email</p>
                                <p className="text-sm text-gray-700">{user?.email}</p>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4 mt-8">
                            <Link
                                to={`/trips?traveler=${user.id}`}  
                                className="w-30 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">
                                Go trips!
                            </Link>
                        </div>
                    
                        <ProfileDetailsItem user={ user } />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;