
import { useState } from "react";
import { Alert } from "../../ui";
import { updateProfile } from '../../../services/api-services';

function ProfileAvatar({ user, activeEdit, reloadUser }) {

    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    const [serverError, setServerError] = useState(null);

    const handleAvatar = async (e) => {
        const file = e.target.files[0];
    
        if (!file) return;

        setUploadingAvatar(true);

        try {
            const avatar = URL.createObjectURL(file);
            const formData = new FormData();
            formData.append("avatar", file);

            await updateProfile(formData);
            reloadUser({ ...user, avatar: avatar });
        } catch (error) {
            setServerError("Failed to upload avatar");
        } finally {
            setUploadingAvatar(false);
        }
    };

    if (serverError) return <Alert message={ serverError } center />;

    return (
        <>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-32 relative flex justify-center">
                <div className="absolute -bottom-14 group">
                    <img
                        src={ user.avatar }
                        alt={ user.username }
                        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                    />

                    <button
                        type="button"
                        onClick={() => document.getElementById("input-avatar").click()}
                        disabled={ uploadingAvatar || !activeEdit }
                        className="
                            absolute inset-0 
                            flex items-center justify-center 
                            rounded-full
                            bg-black/50 
                            opacity-0 
                            group-hover:opacity-100 
                            transition
                            cursor-pointer
                        "
                    >
                        { uploadingAvatar && (
                            <svg
                            className="h-6 w-6 animate-spin text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                            </svg>
                        )}

                        { activeEdit && (
                            <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                            />
                            </svg>
                        )}
                    </button>
                </div> 

                <input
                    id="input-avatar"
                    type="file"
                    accept="image/*"
                    onChange={ handleAvatar }
                    className="hidden"
                />
            </div>

            <div className="pt-15 pb-2 px-8 text-center">
                { activeEdit && (<p className="text-xs text-slate-500">Click to change photo</p>) }
            </div>
        </>
    );
}

export default ProfileAvatar;