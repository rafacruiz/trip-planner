
import { useEffect, useState } from "react";
import { getUser } from '../services/api-services';

export function useUser(userId) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [userStats, setUserStats] = useState(null);
    
    useEffect(() => {
            const fetchUser = async () => {
                setUser(null);
                setError(null);

                try {
                    setLoading(true);
                    const user = await getUser(userId);
                    setUser(user.user);
                    setUserStats(user.stats);
                } catch (error) {
                    console.log(error?.message);
                    setUser({});
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
    }, [userId]);
    
    return { user, loading, error, userStats };
}