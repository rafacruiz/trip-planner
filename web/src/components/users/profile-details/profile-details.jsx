
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts";

function ProfileDetails() {

    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex justify-center py-16 px-6">
            <div className="w-full max-w-2xl">
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-32 relative flex justify-center">
                        <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg absolute -bottom-14"
                        />
                    </div>

                    <div className="pt-16 pb-8 px-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {user.username}
                        </h1>

                        <p className="text-sm text-gray-400 mt-1">
                            Joined {new Date(user.createdAt).toLocaleDateString()}
                        </p>

                        <p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
                            {user.bio}
                        </p>

                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="bg-blue-50 rounded-2xl p-4">
                                <p className="text-2xl font-bold text-blue-600">3</p>
                                <p className="text-xs text-gray-500">Trips created</p>
                            </div>

                            <div className="bg-indigo-50 rounded-2xl p-4">
                                <p className="text-2xl font-bold text-indigo-600">7</p>
                                <p className="text-xs text-gray-500">Trips joined</p>
                            </div>
                        </div>

                        <div className="mt-8 text-left space-y-4">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-400">Email</p>
                                <p className="text-sm text-gray-700">{user.email}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-400">User ID</p>
                                <p className="text-xs text-gray-500 break-all">{user.id}</p>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4 mt-8">
                            <Link
                                to={ '/profile/edit' } 
                                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow">
                                Edit profile
                            </Link>
                            <Link
                                to={'/'} 
                                className="px-5 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">
                                My trips
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileDetails;