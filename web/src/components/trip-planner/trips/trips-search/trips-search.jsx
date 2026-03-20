
import { useEffect, useRef, useState } from 'react';
import { ButtonSearch } from '../../../ui';
import TripsList  from "../trips-list/trips-list";
import useTrips from "../../../../hooks/use-trips";

function TripsSearch() {

    const [filters, setFilters] = useState({
        search: ''
    })
    
    const searchParams = new URLSearchParams(location.search);
    
    const {trips, loading, error } = useTrips(filters);
   
    return (
        <>
            <div className="pb-10">
                <ButtonSearch filters={ filters } setFilters={ setFilters } />
            </div>

            { trips && 
                <TripsList trips={ trips } loading={ loading } />
            }
            
        </>
    );
}

export default TripsSearch;