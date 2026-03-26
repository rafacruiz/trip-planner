
import { BounceLoader } from "react-spinners";
import { Alert } from "../../../../ui";
import { SectionHeader, EmptyState } from '../sections-utils';
import { createActivity, deleteActivity } from '../../../../../services/api-services';
import { handleAsyncAction } from '../../../utils/async-action';
import { useAlert, useForm } from "../../../../../hooks";
import { useState } from "react";

function ActivitiesSection({ trip, loading }) {

  const [activitiesArray, setActivitiesArray] = useState(trip?.activities);
  
  const { showAlert, serverType, serverMessage, activeAlert } = useAlert();

  const { values: activity, handleChange, reset } = useForm({
    title: ''
  });
  
  const handleAddActivity = () => {
    handleAsyncAction({
      action: () => createActivity(trip.id, activity),
      onSuccess: async (res) => {
        reset();
        setActivitiesArray(prev => [...prev, res]);
        showAlert(
          'You’ve successfully created a new activity to your trip!', 
          'success'
        );
      },
      onError: (msg) => showAlert(msg, 'errorValidation'),
    });
  };

  const handleRemoveActivity = (activityId) => {
    handleAsyncAction({
      action: () => deleteActivity(trip.id, activityId),
      onSuccess: async () => {
        reset();
        setActivitiesArray(activitiesArray.filter((activity => activity.id !== activityId)));
        showAlert(
          'You’ve removed a activity from your trip’s list.',
          'warning'
        );
      },
      onError: (msg) => showAlert(msg, 'errorValidation'),
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
        icon="🎯"
        title="Activities"
        description="Plan activities for your trip"
      />

      <div className="flex items-center gap-4">
        <div className="flex items-center w-full">

          <input
            type="text"
            id="title"
            value={ activity.title }
            onChange={ (e) => handleChange('title', e.target.value) }
            placeholder="Activity title..."
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
              flex-grow
            `}
          />
        
          <button
            type="button"
            onClick={ () => handleAddActivity() }
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
              ml-4
            "
          >
            ➕ Add activity
          </button>

        </div>
      </div>

      { activeAlert && (
        <div className="mt-4 transition">
          <Alert 
            message={ serverMessage } 
            type={ serverType } 
            center 
          />
        </div>
      )}

      { activitiesArray?.length === 0 && (
        <EmptyState
          text="No activities yet"
        />
      )}

      <div className="flex flex-col gap-3">
        
        { activitiesArray?.map((activity) => (
          <div
            key={ activity.id }
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
                { activity.title }
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleRemoveActivity(activity.id)}
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

export default ActivitiesSection;