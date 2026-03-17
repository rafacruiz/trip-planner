
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as servicesApi from '../../../services/api-services';

function useUser() {
    const [user, setUser] = useState(null);
    
    const { userId } = useParams();

    useEffect(() => {
            const fetchUser = async () => {
                try {
                    const user = await servicesApi.getProfile(userId);
                    setUser(user.data);
                } catch (error) {
                    console.log(error?.message);
                }
            };

            fetchUser();
    }, [userId]);

    return { user, loading: user === null };
}

export default useUser;