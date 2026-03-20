
import { useEffect, useState } from "react";
import { listTrips } from '../services/api-services';

function useTrips(filters) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trips, setTrips] = useState(null);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        const timer = (!filters.search) ? 0 : 500;
        
        const timerOut = setTimeout( async() => {
            try {
                setLoading(true);
                setTrips(null);

                const trips = await listTrips(filters);
                setTrips(trips.data);
                setPagination(trips.pagination);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }, timer);

        return () => clearTimeout(timerOut);
    }, [filters]);

    return { trips, loading, error, pagination };
}

export default useTrips;