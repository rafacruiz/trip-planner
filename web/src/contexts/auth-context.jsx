
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as ServicesApi from '../services/api-services';

const AuthContext = createContext();

function AuthContextProvider ({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [userStats, setUserStats] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const user = await ServicesApi.getProfile();
                setUser(user.user);
                setUserStats(user.stats);
            } catch (error) {
                navigate('/login');
            }
        }

        fetch();
    }, []);

    const login = async (email, password) => {
        const user = await ServicesApi.login(email, password);
        setUser(user);
    }

    const logout = async () => {
        await ServicesApi.logout();
        setUser(null);
        navigate('/login');
    }

    if (user === null &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup"
    ) {
        return <></>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, reloadUser: setUser, userStats }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);