
import './trips-slider.css';
import { useEffect, useRef, useState } from "react";
import * as ServicesApi from '../../../../services/api-services';
import CommunityTripCard from "./trips-comunity";

function TripsSlider() {
    const sliderRef = useRef();

    const [trips, setTrips] = useState(null);

    useEffect(() => {
        const fechtTrips = async () => {
            try {
                const trips = await ServicesApi.getTrips();
                setTrips(trips.data);
            } catch (error) {
                console.error("Error fetching trips:", error);
            }
        };

        fechtTrips();
    }, []);

    const scroll = (direction) => {
        const container = sliderRef.current;
        const scrollAmount = 320;

        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth"
        });
    };

    if (!trips || trips.length === 0) return null;

    return (
        <div className="w-full">

    <div className="flex items-center justify-between mb-3">

        <div className="flex gap-2">

            <button
                onClick={() => scroll("left")}
                className="bg-white border border-gray-200 rounded-full w-8 h-8 
                flex items-center justify-center hover:bg-gray-50"
            >
                ←
            </button>

            <button
                onClick={() => scroll("right")}
                className="bg-white border border-gray-200 rounded-full w-8 h-8 
                flex items-center justify-center hover:bg-gray-50"
            >
                →
            </button>

        </div>
    </div>

    <div
        ref={sliderRef}
        className="no-scrollbar flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2"
    >
        {trips.map((trip) => (
            <div key={trip.id} className="min-w-[300px] snap-start">
                <CommunityTripCard trip={trip} />
            </div>
        ))}
    </div>

</div>
    );
}

export default TripsSlider;