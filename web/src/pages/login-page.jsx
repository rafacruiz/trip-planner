
import { Link } from 'react-router-dom';
import { LoginForm } from "../components/users";

function LoginPage() {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-6">
            <div className="w-full max-w-md">
                <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">TripPlanner</h1>
                        <p className="text-gray-500 mt-2">Plan your next adventure</p>
                    </div>

                    <LoginForm />

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Don’t have an account?
                        <Link to="/signup" className="ml-1 text-blue-600 font-medium hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>

                <div className="text-center mt-6 text-white/80 text-sm">
                    Discover places • Plan trips • Travel smarter
                </div>
            </div>
        </div>
    );
}

export default LoginPage;