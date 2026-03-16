
import { Link } from "react-router-dom";
import { useAuth } from '../../../contexts/auth-context';

function Navbar() {

    const { user, logout } = useAuth();

    return (
        <nav className="w-full bg-white/70 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link 
                    to="/" 
                    className="flex items-center gap-2 font-bold text-xl text-blue-700">
                    ✈️ TripPlanner
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        to="/profile"
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
                    >
                        <span className="hidden sm:block">
                            Hi, {user?.username}
                        </span>
                        <img
                            src={user?.avatar}
                            alt={user?.username}
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                        />
                    </Link>

                    <button
                        onClick={() => logout()} 
                        className="px-2 py-1 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow transition">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;