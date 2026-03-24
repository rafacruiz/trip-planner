
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Loading } from "../../../ui";
import { useAuth } from '../../../../contexts/auth-context';
import { ProfileDetailsItem, ProfileAvatar } from "../.";
import { updateProfile } from '../../../../services/api-services';

function ProfileDetails() {

    const { user, reloadUser, userStats } = useAuth();

    const [activeEdit, setActiveEdit] = useState(false);
    const [bio, setBio] = useState(null);
    const [serverError, setServerError] = useState(null);
    
    useEffect(() => {
        setBio(user?.bio)
    }, [user]);

    const handleSave = async () => {
        try {
            await updateProfile({ bio });
            reloadUser({...user,  bio: bio });
            setActiveEdit(false);
        } catch (error) {
            console.error(error?.message);
            setServerError(error);
        }
    };

    const handleEdit = () => {
        setActiveEdit(true);
    };

    const handleCancel = () => {
        setBio(user?.bio || '');
        setActiveEdit(false);
    }

    if (!user) return <Loading/>;

    if (user?.length === 0) return <Alert message={ loadFail?.message } type={ 'warning' } center={ true } />;

    if (serverError) return <Alert message={ serverError } center />; 
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex justify-center py-16 px-6">
            <div className="w-full max-w-2xl">
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    
                    <ProfileAvatar 
                        user={ user } 
                        activeEdit={ activeEdit }
                        reloadUser={ reloadUser }
                    />

                    <div className="pt-2 pb-8 px-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                                {user.username}
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
                                Joined {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        { !activeEdit ? (   
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
                                        {user.bio || "Your bio is empty. Now’s a great time to introduce yourself!"}
                                    </p>
                                </div>
                            </div>
                        ) : ( 
                            <div className="mt-4 max-w-2xl mx-auto">
                                <textarea
                                    onChange={(e) => setBio(e.target.value)}
                                    value={ bio }
                                    rows={ 3 }
                                    placeholder="Add bio"
                                    maxLength={ 200 }
                                    className="
                                        w-full px-4 py-3 text-sm text-gray-700
                                        bg-white
                                        border border-gray-200
                                        rounded-2xl
                                        shadow-sm
                                        resize-none
                                        placeholder-gray-400
                                        transition-all duration-200
                                        hover:border-gray-300
                                        focus:outline-none
                                        focus:ring-2 focus:ring-blue-500
                                        focus:border-blue-500"
                                />

                                <div className="flex justify-end mt-1">
                                    <span className="text-xs text-gray-400">
                                        { bio.length || 0 } / 200
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="bg-blue-50 rounded-2xl p-4">
                                <p className="text-2xl font-bold text-blue-600">{ userStats?.totalOwnedTrips|| 0 }</p>
                                <p className="text-xs text-gray-500">Trips created</p>
                            </div>
                            <div className="bg-indigo-50 rounded-2xl p-4">
                                <p className="text-2xl font-bold text-indigo-600">{ userStats?.totalJoinedTrips || 0 }</p>
                                <p className="text-xs text-gray-500">Trips joined</p>
                            </div>
                        </div>

                        <div className="mt-8 text-left space-y-4">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-400">Email</p>
                                <p className="text-sm text-gray-700">{user.email}</p>
                            </div>
                        </div>
                        
                        <div className="flex justify-center gap-4 mt-8">                            
                            { !activeEdit ? (
                                <>
                                    <button
                                    onClick={ () => handleEdit() }
                                    className="w-30 
                                        py-2 
                                        rounded-xl 
                                        bg-blue-600 
                                        text-white 
                                        text-sm 
                                        font-semibold 
                                        hover:bg-blue-700 
                                        transition shadow 
                                        cursor-pointer"
                                    >
                                        Edit profile
                                    </button>
                                    
                                    <Link
                                        to={`/trips?me=true`} 
                                        className="
                                            w-30 
                                            py-2 
                                            rounded-xl 
                                            border 
                                            border-gray-200 
                                            text-sm 
                                            text-gray-600 
                                            hover:bg-gray-50 
                                            transition">
                                        My trips
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <button
                                    onClick={ () => handleSave() }
                                    className="w-30 
                                        py-2 
                                        rounded-xl 
                                        bg-blue-600 
                                        text-white 
                                        text-sm 
                                        font-semibold 
                                        hover:bg-blue-700 
                                        transition shadow 
                                        cursor-pointer"
                                    >
                                        Save profile
                                    </button>

                                    <button
                                    onClick={ () => handleCancel() }
                                    className="w-30 
                                        py-2 
                                        rounded-xl 
                                        bg-blue-600 
                                        text-white 
                                        text-sm 
                                        font-semibold 
                                        hover:bg-blue-700 
                                        transition shadow 
                                        cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                            
                        </div>
                    
                        <ProfileDetailsItem user={ user } />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileDetails;