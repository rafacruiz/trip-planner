
import { useEffect, useState } from "react";
import { getTrip } from '../services/api-services';

function useTrip(tripId) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                setLoading(true);
                const trip = await getTrip(tripId);
                setTrip(trip);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [tripId]);

    return { trip, loading, error };
}

export default useTrip;