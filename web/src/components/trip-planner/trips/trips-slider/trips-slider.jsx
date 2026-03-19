
import './trips-slider.css';
import { Alert } from '../../../ui';
import { BounceLoader } from "react-spinners";
import { useRef, useState } from "react";
import TripsCommunity from "./trips-comunity";
import useTrips from '../../../../hooks/use-trips';

function TripsSlider() {

    const sliderRef = useRef();

    const [filters, setFilters] = useState({
        trips: true,
    });

    const { trips, loading, error } = useTrips(filters);

    const sliderTrips = trips?.data;

    const scroll = (direction) => {
        const container = sliderRef.current;
        const scrollAmount = 320;

        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth"
        });
    };

    if (loading) {
        return (
            <div className="w-full">
                <div className="flex items-center justify-center mb-3">
                    <BounceLoader className="mt-2" color="#368fe9" size={22}  />
                </div>
            </div>
        ); 
    }

    if (error) return <Alert message={ error.message } type={ "warning" } center={ true } />

    if (!sliderTrips || sliderTrips.length === 0) return null;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-3">
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll("left")}
                        className="p-1 rounded-full hover:bg-gray-300 transition cursor-pointer"
                    >
                        <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>

                    <button
                        onClick={() => scroll("right")}
                        className="p-1 rounded-full hover:bg-gray-300 transition cursor-pointer"
                    >
                        <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div
                ref={sliderRef}
                className="no-scrollbar flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2"
            >
                {sliderTrips.map((trip) => (
                    <div key={ trip.id } className="min-w-[300px] snap-start">
                        <TripsCommunity trip={ trip } />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TripsSlider;