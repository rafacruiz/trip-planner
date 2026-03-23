
import { BounceLoader } from "react-spinners";
import SectionHeader from "../sections-utils/section-header";
import EmptyState from "../sections-utils/sections-empty";
import { useState } from "react";
import { createActivity, deleteActivity } from '../../../../../services/api-services';
import { Alert } from "../../../../ui";

function ActivitiesSection({ tripData }) {

  const [serverError, setServerError] = useState(null);
    
  const [serverInfo, setServerInfo] = useState(null);

  const [activeAlert, setActiveAlert] = useState(false);

  const [activity, setActivity] = useState({
    title: '',
  });

  const { trip, loading, error, refetch } = tripData;

  const handleAddActivity = async () => {
    setServerInfo(null);
    setServerError(null);

    try {
      await createActivity(trip.id, activity);
      
      toastAlert(
        'You’ve successfully created a new places to your trip!',
        'success'
      );

      await refetch();
    } catch (error) {
      console.log(error?.message);
      toastAlert(
        error?.message, 
        'error'
      );
    }
  };

  const handleRemoveActivity = async (activityId) => {
    setServerInfo(null);
    setServerError(null);
    
    try {
      await deleteActivity(trip.id, activityId);
      
      toastAlert(
        'You’ve removed a places from your trip’s list.',
        'error'
      );

      await refetch();
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
      
      setActivity({
        title: ''
      });
    }, 3000);
    
    setServerInfo(type === 'success' ? message : null);
    setServerError(type === 'error' ? message : null);
  };

  if (loading) return <BounceLoader size={ 18 } color="#fff" />;

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
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
            onChange={(e) => setActivity({ ...activity, title: e.target.value })}
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

      { trip.activities.length === 0 && (
        <EmptyState
          text="No activities yet"
        />
      )}

      {( serverInfo || serverError ) && activeAlert && (
        <div className="mt-4 transition">
          <Alert message={ serverInfo || serverError } type={ serverInfo ? 'success' : 'error' } center />
        </div>
      )}

      <div className="flex flex-col gap-3">
        
        { trip.activities.map((activity) => (
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