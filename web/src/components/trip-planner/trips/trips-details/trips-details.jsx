
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from '../../../../contexts/auth-context';
import { useTrip } from '../../../../hooks';
import { Alert } from "../../../ui";
import { TripDetailSkeleton, 
    TripsHeader, 
    SurpriseBanner, 
    InformationCard,
    TravelerCard, 
    ProgressSection, 
    PlacesCard, 
    ActivitiesCard, 
    MapSection  } from '.';

import { TravelersSection, PlacesSection, ActivitiesSection } from '../trips-sections';

const useRevealLogic = (revealDate) => {
    const now = new Date();
    const reveal = new Date(revealDate);

    const revealReached = now > reveal;

    const revealPlusOne = new Date(reveal);
    revealPlusOne.setDate(revealPlusOne.getDate() + 1);

    const showCountdown = now < revealPlusOne;

    return {
        revealReached,
        showCountdown,
    };
};

function TripsDetails() {
    
    const { tripId } = useParams();

    const { trip, loading, refetch } = useTrip( tripId );

    const { user } = useAuth();

    const [edit, setEdit] = useState(false);

    const {revealReached, showCountdown } = useRevealLogic(trip?.revealDate);
    
    if (loading) return <TripDetailSkeleton />;
    
    if (!trip) return <Alert message={ 'Trip not found' } type="warning" center/>;

    const handleEditTrip = () => {
        setEdit(prev => !prev);
        refetch();
    };

    const handleCheckToggle = async ({ onAction, idValue, value }) => {
        try {
            await onAction(tripId, idValue, value);
            refetch();
        } catch (error) {
            console.error(error?.message);
        }
    };

    return (
        <>
            { !loading && trip && (
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
                    
                    <TripsHeader 
                        trip={ trip }
                        user={ user } 
                        onEdit={ handleEditTrip } />

                    <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
                        
                        <SurpriseBanner 
                            trip={ trip }
                            showCountdown= { showCountdown }
                            revealReached={ revealReached }
                        />

                        <InformationCard 
                            trip={ trip }
                            user={ user } 
                            revealReached={ revealReached } 
                        />

                        { !edit ?
                            <TravelerCard 
                                trip={ trip }
                            />
                        :
                            <TravelersSection 
                                trip={ trip } 
                                loading={ loading }
                            />
                        }

                        <ProgressSection
                            places={ trip.places }
                            activities={ trip.activities }
                            revealReached={ revealReached }
                        />

                        { !edit ?
                            <PlacesCard 
                                trip={ trip }
                                revealReached={ revealReached }
                                handleCheckToggle={ handleCheckToggle }
                            />
                        :
                            <PlacesSection 
                                trip={ trip } 
                                loading={ loading } 
                            />
                        }

                        { !edit ?
                            <ActivitiesCard 
                                trip={ trip }
                                revealReached={ revealReached }
                                handleCheckToggle={ handleCheckToggle }
                            />
                        :
                            <ActivitiesSection 
                                trip={ trip } 
                                loading={ loading }  
                            />
                        }

                        <MapSection
                            trip={ trip }
                            user={ user }
                            revealReached={ revealReached }
                        />

                    </main>
                </div>
            )}
        </>
    );
}

export default TripsDetails;