
import { useEffect, useState } from "react";
import { getUser } from '../services/api-services';

function useUser(userId) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
            const fetchUser = async () => {
                setUser(null);
                setError(null);

                try {
                    setLoading(true);
                    const user = await getUser(userId);
                    setUser(user);
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
    
    return { user, loading, error };
}

export default useUser;