
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ButtonFilters, Loading, Pagination } from '../../../ui';
import { useTrips } from "../../../../hooks";
import TripsList  from "../trips-list/trips-list";

function TripsSearch() {

    const location = useLocation();

    const params = new URLSearchParams(location.search);

    const [filters, setFilters] = useState({
        search: '',
        country: params.get('country') || '',
        traveler: params.get('traveler') || '',
        trips: params.get('trips') || '',
        me: params.get('me') || '',
        owner: params.get('owner') || '',
        isSurprise: params.get('isSurprise') || false,
        startDate: params.get('startDate') || '',
        endDate: params.get('endDate') || '',
        page: 1,
        limit: 10,
    });

    if (!filters.search) delete filters.search;
    if (!filters.country) delete filters.country;
    if (!filters.traveler) delete filters.traveler;
    if (!filters.trips) delete filters.trips;
    if (!filters.me) delete filters.me;
    if (!filters.owner) delete filters.owner;
    if (!filters.isSurprise) delete filters.isSurprise;
    if (!filters.startDate) delete filters.startDate;
    if (!filters.endDate) delete filters.endDate;
  
    const { trips, loading, error, pagination } = useTrips(filters);

    if (pagination?.totalPages === 1) filters.page = 1;

    const handlePageChange = (newPage) => {
        setFilters({ ...filters, page: newPage});
    };

    return (
        <>
            <div className="pb-10">
                <ButtonFilters 
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