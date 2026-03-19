
import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { ButtonSearch } from '../../../ui';
import TripsList  from "../trips-list/trips-list";
import useTrips from "../../../../hooks/use-trips";

function TripsSearch() {
    //const filters = new URLSearchParams();

    /*const filters = useMemo(() => {
        return Object.fromEntries(searchParams.entries());
    }, [searchParams]);
*/
    const {trips, loading, error } = useTrips(filters);

    if (!trips?.data) return null;
    console.log(trips);
    return (
        <>
            <div className="pb-10">
                <ButtonSearch />
            </div>
            
            <TripsList trips={ trips?.data } loading={ loading } />
        </>
    );
}

export default TripsSearch;