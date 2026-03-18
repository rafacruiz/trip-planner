
import { useEffect, useState } from "react";
import * as servicesApi from '../services/api-services';

function useUser(userId) {
    const [user, setUser] = useState(null);
    const [loadFail, setLoadFail] = useState(null);
    
    useEffect(() => {
            const fetchUser = async () => {
                setUser(null);
                setLoadFail(null);

                try {
                    const user = await servicesApi.getUser(userId);
                    setUser(user);
                } catch (error) {
                    console.log(error?.message);
                    setUser({});
                    setLoadFail(error);
                }
            };

            fetchUser();
    }, [userId]);
    
    return { user, loading: user === null, loadFail };
}

export default useUser;