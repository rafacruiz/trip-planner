
import avatarDefault from '../../../assets/img/default/avatar.svg';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from '../../ui';
import { useNavigate } from "react-router-dom";
import * as ServicesApi from '../../../services/api-services';

const validations = {
    email: {
        required: "Email is required",
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
        },
    },
    password: {
        required: "Password is required",
        minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
        },
    },
    username: {
        required: "Username is required",
        minLength: {
            value: 3,
            message: "Username must be at least 3 characters",
        },
    },
    bio: {
        maxLength: {
            value: 200,
            message: "Bio cannot exceed 200 characters",
        },
    },
};

function SignupForm() {

    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [serverError, setServerError] = useState(null);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { isSubmitting, errors },
    } = useForm({ mode: "onChange" });

    const handleAvatar = async (e) => {
        const file = e.target.files[0];
    
        if (!file) return;

        setUploadingAvatar(true);

        try {
            setAvatar(URL.createObjectURL(file));    
        } catch (error) {
            setServerError("Failed to upload avatar");
        } finally {
            setUploadingAvatar(false);
        }
    };

    const handleOnSubmit = async (data) => {
        try {
            console.log(data);
            await ServicesApi.signup(data);
            navigate('/login');
        } catch (err) {
            setServerError(err.response?.data?.message || "Ops! Unknown Error");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-5">

            { serverError && <Alert message={ serverError } center /> }

            <div className="flex flex-col items-center gap-3">
                <div className="relative group w-20 h-20 rounded-full overflow-hidden border border-gray-200"
                    
                >
                    <img
                        src={ avatar || avatarDefault }
                        className="w-full h-full object-cover"
                    />

                    <button
                        type="button"
                        onClick={() => document.getElementById("input-avatar").click()}
                        disabled={uploadingAvatar}
                        className="absolute inset-0 flex items-center justify-center 
                            bg-black/50 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                    >
                        { uploadingAvatar ? (
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
                        ) : (
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

                <p className="text-xs text-slate-500">Click to change photo</p>
            </div>

            <div>
                <label className="text-sm text-gray-600">Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    className={`mt-1 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                        errors.username
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-200 focus:ring-blue-500"
                    }`}
                    { ...register("username", validations.username) }
                />

                { errors.username && (
                    <p className="mt-1 text-sm text-red-500">
                        { errors.username.message }
                    </p>
                )}
            </div>

            <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                    type="email"
                    placeholder="you@email.com"
                    className={`mt-1 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                        errors.email
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-200 focus:ring-blue-500"
                    }`}
                    { ...register("email", validations.email) }
                />

                { errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                        { errors.email.message }
                    </p>
                )}
            </div>

            <div>
                <label className="text-sm text-gray-600">Password</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className={`mt-1 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                        errors.password
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-200 focus:ring-blue-500"
                    }`}
                    { ...register("password", validations.password) }
                />

                { errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                        { errors.password.message }
                    </p>
                )}
            </div>

            <div>
                <label className="text-sm text-gray-600">Bio</label>
                <textarea
                    rows="3"
                    placeholder="Tell something about you..."
                    className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    { ...register("bio", validations.bio) }
                />

                { errors.bio && (
                    <p className="mt-1 text-sm text-red-500">
                        { errors.bio.message }
                    </p>
                )}
            </div> 

            <button
                type="submit"
                disabled={ isSubmitting }
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
                {isSubmitting ? "Creating account..." : "Sign up"}
            </button>
        </form>
    );
}

export default SignupForm;
