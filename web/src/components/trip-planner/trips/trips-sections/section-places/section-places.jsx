
import { useState } from "react";
import { BounceLoader } from "react-spinners";
import SectionHeader from "../sections-utils/section-header";
import EmptyState from "../sections-utils/sections-empty";
import { Alert } from "../../../../ui";
import { createPlace, deletePlace } from '../../../../../services/api-services';

function PlacesSection({ tripData }) {

  const [serverError, setServerError] = useState(null);
  
  const [serverInfo, setServerInfo] = useState(null);

  const [activeAlert, setActiveAlert] = useState(false);

  const [places, setPlaces] = useState({
    name: '',
    location: '',
    notes: ''
  });

  const { trip, loading, error, refetch } = tripData;

  const handleAddPlaces = async () => {
    setServerInfo(null);
    setServerError(null);

    try {
      await createPlace(trip.id, places);
      await refetch();

      toastAlert(
        'You’ve successfully created a new places to your trip!',
        'success'
      );

    } catch (error) {
      console.log(error?.message);
      toastAlert(
        error?.message, 
        'error'
      );
    }
  };

  const handleRemovePlaces = async (placeId) => {
    try {
      await deletePlace(trip.id, placeId);
      await refetch();

      toastAlert(
        'You’ve removed a places from your trip’s list.',
        'error'
      );

    } catch (error) {
      console.log(error);
      setServerError(error?.message);  
      toastAlert(
        error?.message, 
        'error'
      );
    }
  };

  const toastAlert = (message, type) => {
    setActiveAlert(true);

    const timeout = setTimeout(() => {
      setActiveAlert(false);
      
      setPlaces({name: '',
        location: '',
        notes: ''
      });
    }, 3000);
    
    setServerInfo(type === 'success' ? message : null);
    setServerError(type === 'error' ? message : null);
  };

  if (loading) return <BounceLoader size={ 18 } color="#fff" />;

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
      <SectionHeader
        icon="📍"
        title="Places"
        description="Add places you want to visit"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          id="name"
          value={ places.name }
          onChange={(e) => setPlaces({ ...places, name: e.target.value })}
          placeholder="Place name"
          required
          className={`
            px-4 py-3
            rounded-xl
            bg-gray-50
            border border-transparent
            text-sm

            focus:outline-none
            focus:bg-white
            focus:border-blue-300
            focus:ring-2 focus:ring-blue-100
          `}
        />

        <input
          type="text"
          id="location"
          value={ places.location }
          onChange={ (e) => setPlaces({...places, location: e.target.value }) }
          placeholder="Location"
          required
          className="
            px-4 py-3
            rounded-xl
            bg-gray-50
            border border-transparent
            text-sm

            focus:outline-none
            focus:bg-white
            focus:border-blue-300
            focus:ring-2 focus:ring-blue-100
          "
        />
        
      </div>

      <textarea
          id="notes"
          value={ places.notes }
          onChange={ (e) => setPlaces({...places, notes: e.target.value })}
          rows={2}
          placeholder="Notes (optional)"
          className="
            w-full
            px-4 py-3
            rounded-xl
            bg-gray-50
            border border-transparent
            text-sm

            focus:outline-none
            focus:bg-white
            focus:border-blue-300
            focus:ring-2 focus:ring-blue-100
          "
      />

      <div className="flex justify-end">

          <button
            type="button"
            onClick={ () => handleAddPlaces() }
            className="
              px-5 py-2.5
              rounded-xl

              bg-gradient-to-r
              from-blue-600
              to-indigo-600

              text-white
              text-sm
              font-semibold

              shadow-sm

              hover:shadow-md
              hover:scale-[1.02]
              active:scale-[0.98]

              transition
            "
          >
            ➕ Add place
          </button>
      </div>

      { trip.places.length === 0 && (
        <EmptyState
          text="No places added yet"
        />
      )}

      {( serverInfo || serverError ) && activeAlert && (
        <div className="mt-4 transition">
          <Alert message={ serverInfo || serverError } type={ serverInfo ? 'success' : 'error' } center />
        </div>
      )}

      <div className="flex flex-col gap-3">
        
        { trip.places.map((place) => (
          <div
            key={ place.id }
            className="
              flex justify-between items-start
              gap-4

              p-4
              rounded-2xl

              border border-gray-200
              bg-gray-50

              hover:bg-white
              hover:shadow-sm

              transition"
          >
            <div className="flex flex-col">
              <span className="
                text-sm
                font-semibold
                text-gray-800
              ">
                { place.name }
              </span>

              <span className="
                text-xs
                text-gray-500
              ">
                { place.location }
              </span>

              { place.notes && (
                <span className="
                  text-xs
                  text-gray-400
                  mt-1
                ">
                  { place.notes }
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleRemovePlaces(place.id)}
              className="
                text-xs
                text-red-500
                hover:text-red-600
                transition
                cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesSection;