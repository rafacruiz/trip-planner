
import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-6">
            <div className="text-center max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
                        <span className="text-4xl">🌍</span>
                    </div>
                </div>

                <h1 className="text-5xl font-bold text-gray-800"> 404 </h1>

                <h2 className="mt-2 text-xl font-semibold text-gray-700">
                    Destination not found
                </h2>

                <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                    Looks like this page got lost during the journey.  
                    Let’s get you back to planning your next trip.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to="/trips?me=true"
                        className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                    >
                        My Trips
                    </Link>

                    <Link
                        to="/"
                        className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;