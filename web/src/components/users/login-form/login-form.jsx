
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from '../../../contexts/auth-context';
import { BounceLoader } from "react-spinners";
import { Alert } from '../../ui';

const validations = {
    emailUser: { 
        required: 'Email is required',
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format'
        }
    },
    passwordUser: { 
        required: 'Password is required',
        minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long'
        },
    }
}

function LoginForm() {

    const [serverError, setServerError] = useState(null);
    
    const navigate = useNavigate();

    const { login } = useAuth();

    const { register, 
            handleSubmit,
            setError,
            clearErrors,
            formState: { isSubmitting, errors } 
        } = useForm({ 
            mode: 'all', 
            reValidateMode: "onChange" 
        });

    const handleLogin = async (data) => {
        try {
            setServerError(null);
            clearErrors();

            await login(data.emailUser, data.passwordUser);
            navigate("/");
        } catch (error) {
            console.log(error?.message);
            setServerError(error?.message);
        }
    }

    return (
        <form onSubmit={ handleSubmit(handleLogin) } className="space-y-5">
            {serverError && (
                <div className="mt-4">
                    <Alert message={serverError} type="error" center />
                </div>
            )}

            <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                    type="email"
                    id="emailUser"
                    required
                    className={`mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 ${
                        errors.emailUser
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-200 focus:ring-blue-500"
                    }`}
                    placeholder="you@email.com"
                    { ...register('emailUser', {
                        ...validations.emailUser, 
                        onChange: () => {
                            clearErrors();
                            setServerError(null);
                        }
                    })}
                />
                {errors.emailUser && (
                    <p className="mt-1 text-sm text-red-500">
                        { errors.emailUser.message }
                    </p>
                )}
            </div>

            <div>
                <label className="text-sm text-gray-600">Password</label>
                <input
                    type="password"
                    id="passwordUser"
                    required
                    className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    { ...register('passwordUser', {
                        ...validations.passwordUser, 
                        onChange: () => {
                            clearErrors();
                            setServerError(null);
                        }
                    })}
                />
                { errors.passwordUser && (
                    <p className="mt-1 text-sm text-red-500">
                        { errors.passwordUser.message }
                    </p>
                ) }
            </div>

            <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
                disabled={ isSubmitting } >
                { isSubmitting ? <BounceLoader className="mt-2" color="#f8fafa" size={22}  /> : 'Sign In' }
            </button>
        </form>
    );
}

export default LoginForm;