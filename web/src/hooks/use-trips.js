
import { useEffect, useState } from "react";
import { listTrips } from '../services/api-services';

function useTrips(filters) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trips, setTrips] = useState(null);

    useEffect(() => {
        const timerOut = 400;

        const timer = setTimeout( async() => {
            try {
                setLoading(true);
                const trips = await listTrips(filters);
                setTrips(trips.data);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }, timerOut);

        return () => clearTimeout(timer);
    }, [filters]);

    return { trips, loading, error };
}

export default useTrips;