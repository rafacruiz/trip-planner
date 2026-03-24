
import { BounceLoader } from "react-spinners";
import { Alert } from "../../../../ui";
import { SectionHeader, EmptyState } from '../sections-utils';
import { createPlace, deletePlace } from '../../../../../services/api-services';
import { handleAsyncAction } from '../../../utils/async-action';
import { useAlert, useForm } from "../../../../../hooks";

function PlacesSection({ tripData }) {

  const { trip, loading, error, refetch } = tripData;

  const { showAlert, serverError, serverInfo, activeAlert } = useAlert();
  
  const { values: places, handleChange, reset } = useForm({
    name: '',
    location: '',
    notes: ''
  });

  const handleAddPlaces = () => {
    handleAsyncAction({
      action: () => createPlace(trip.id, places),
      onSuccess: async () => {
        await refetch();
        reset();
        showAlert(
          'You’ve successfully created a new places to your trip!',
          'success'
        );
      },
      onError: (msg) => showAlert(msg, 'error'),
    });
  };

  const handleRemovePlaces = (placeId) => {
    handleAsyncAction({
      action: () => deletePlace(trip.id, placeId),
      onSuccess: async () => {
        await refetch();
        reset();
        showAlert(
          'You’ve removed a places from your trip’s list.',
          'error'
        );
      },
      onError: (msg) => showAlert(msg, 'error'),
    });
  };

  if (loading) return <BounceLoader size={ 18 } color="#fff" />;

  return (
    <div 
      className="
        bg-white 
        rounded-3xl 
        border 
        border-gray-200 
        shadow-sm 
        p-6 
        flex 
        flex-col 
        gap-4"
    >

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
          onChange={ (e) => handleChange('name', e.target.value) }
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
          onChange={ (e) => handleChange('location', e.target.value) }
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
        onChange={ (e) => handleChange('notes', e.target.value) }
        rows={ 2 }
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