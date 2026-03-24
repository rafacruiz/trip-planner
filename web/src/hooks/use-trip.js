
import { useEffect, useState } from "react";
import { getTrip } from '../services/api-services';

export function useTrip(tripId) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trip, setTrip] = useState(null);

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

    useEffect(() => {
        
        fetchTrip();
    }, [tripId]);

    return { trip, loading, error, refetch: fetchTrip };
}