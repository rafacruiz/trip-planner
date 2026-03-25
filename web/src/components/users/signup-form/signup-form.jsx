
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

    const [serverError, setServerError] = useState(null);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { isSubmitting, errors, isValid },
    } = useForm({ mode: "onChange" });

    const handleOnSubmit = async (data) => {
        try {
            await ServicesApi.signup(data);
            navigate('/login');
        } catch (err) {
            setServerError(err?.message || "Ops! Unknown Error");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-5">

            { serverError && <Alert message={ serverError } center /> }

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
                disabled={ !isValid }
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
                {isSubmitting ? "Creating account..." : "Sign up"}
            </button>
        </form>
    );
}

export default SignupForm;
