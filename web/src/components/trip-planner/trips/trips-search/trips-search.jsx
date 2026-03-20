
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ButtonSearch, Loading, Pagination } from '../../../ui';
import TripsList  from "../trips-list/trips-list";
import useTrips from "../../../../hooks/use-trips";

function TripsSearch() {

    const location = useLocation();

    const params = new URLSearchParams(location.search);

    const [filters, setFilters] = useState({
        search: '',
        trips: params.get('trips') || '',
        me: params.get('me') || '',
        owner: params.get('owner') || '',
        page: 1,
        limit: 10,
    });

    if (!filters.search) delete filters.search;
    if (!filters.trips) delete filters.trips;
    if (!filters.me) delete filters.me;
    if (!filters.owner) delete filters.owner;
  
    const { trips, loading, error, pagination } = useTrips(filters);

    if (pagination?.totalPages === 1) filters.page = 1;

    const handlePageChange = (newPage) => {
        setFilters({ ...filters, page: newPage});
    };
   
    return (
        <>
            <div className="pb-10">
                <ButtonSearch 
                    filters={ filters } 
                    setFilters={ setFilters } 
                />
            </div>

            { loading && <Loading /> }

            { trips && (
                
                    <TripsList trips={ trips } loading={ loading } />
            )}

            { trips?.length !== 0 && (
                
                    <Pagination
                        pagination={ pagination }
                        onPageChange={ handlePageChange }
                    />              
                
            )}
        </>
    );
}

export default TripsSearch;