
import { BounceLoader } from "react-spinners";
import { Alert } from '../../../../ui';
import { SectionHeader, EmptyState } from '../utils-trips';
import { useEffect, useState } from "react";
import { handleAsyncAction } from '../../../utils/async-action';
import { useAlert } from "../../../../../hooks";
import { listUsers, inviteTravelerTrip, deleteTravelerTrip } from '../../../../../services/api-services';

function TravelersSection({ trip, loading }) {

  const [search, setSearch] = useState({ search: '' });
  
  const [users, setUsers] = useState(null);

  const [travelersInvite, setTravelersInvite] = useState(trip?.travelers);
  
  const { showAlert, serverType, serverMessage, activeAlert } = useAlert();
  
  useEffect(() => {
    const fetchUsers = async () => {
      setUsers(null);

      if (search.search.length < 3) return null;

      const users = await listUsers(search);
      setUsers(users);
    };

    fetchUsers();
  }, [search.search]);

  const handleInviteTraveler = (userId) => {

    const userSelected = users.find(user => user.id === userId);
    
    handleAsyncAction({
      action: () => inviteTravelerTrip(trip.id, { userId }),

      onSuccess: async () => {  

        const userInvite = { 
          id: userId, 
          status: 'pending', 
          role: 'traveler',
          user: { ...userSelected }
        };
    
        setTravelersInvite(prev => [...prev, userInvite]);

        showAlert(
          'You’ve successfully invited a new traveler to your trip!',
          'success'
        );

        setSearch('');
      },
      onError: (msg) => showAlert(msg.message, 'errorValidation'),
    });
  };

  const handleRemoveTraveler = (userId) => {

    handleAsyncAction({
    
      action: () => deleteTravelerTrip(trip.id, { userId }),
    
      onSuccess: async () => {
        const travelers = travelersInvite.filter(traveler => traveler.user.id !== userId);
       
        setTravelersInvite(travelers);
       
        showAlert(
          'You’ve removed a traveler from your trip’s list.',
          'warning'
        );
       
        setSearch('');
      },
      onError: (msg) => showAlert(msg.message, 'errorValidation'),
    });
  };

    
  if (loading) return <BounceLoader size={ 18 } color="#fff" />;

  return (  
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
      <SectionHeader
        icon="🧑‍🤝‍🧑"
        title="Travelers"
        description="Invite people to join your trip"
      />

      <div
        className="
        w-full 
        max-w-4xl
        mx-auto
        bg-white/90 
        backdrop-blur
        border 
        border-gray-200
        rounded-3xl
        shadow-md
        px-5 
        py-4
        flex 
        flex-col 
        gap-4
        transition-all 
        duration-300
        hover:shadow-xl"
      >
        <div className="flex items-center gap-3 border-b border-gray-100 pb-3 group">
          <div className="text-gray-400 group-focus-within:text-blue-500 transition">
            <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                />
            </svg>
          </div>

          <input
            type="text"
            id="search"
            value={ search.search }
            onChange={(e) => setSearch( { search: e.target.value } )}
            placeholder="Search users by username, email..."
            className="
            flex-1
            bg-transparent
            outline-none
            text-sm text-gray-700
            placeholder-gray-400"
          />
        </div>
        
        <div className="flex flex-col gap-4">   
          <div className="
            flex flex-col gap-2
            max-h-64
            overflow-y-auto
            pr-1"
          >
            {!users && (
              <EmptyState
                text="Search for users to invite"
              />
            )}

            {users && users.length === 0 && (
              <EmptyState
                text="No users found"
              />
            )}

            {users && users.filter(user => {
              return !trip?.travelers?.some(traveler => traveler.user.id === user.id);
            }).map(user => {
              return (
                <div
                  key={ user.id }
                  onClick={() => handleInviteTraveler( user.id )}
                  className="
                    flex items-center justify-between
                    gap-3
                    px-4 py-3
                    rounded-2xl
                    bg-white
                    border border-gray-200
                    hover:shadow-sm
                    hover:border-blue-200
                    transition
                    cursor-pointer"
                >

                  <div className="flex items-center gap-3">
                    <img
                      src={ user.avatar }
                      alt={ user.username }
                      className="
                        w-10 h-10
                        rounded-full
                        object-cover
                        border border-gray-200"
                    />
                    
                    <div className="flex flex-col">
                      <span className="
                        text-sm
                        font-semibold
                        text-gray-800"
                      >
                        { user.username }
                      </span>

                      <span className="
                        text-xs
                        text-gray-400"
                      >
                        { user.email }
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
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

      <div className="flex flex-wrap gap-2 mt-2 animate-fade-in">
        
        { travelersInvite?.map((traveler) => (
          <div
            key={ traveler.user.id }
            className="
              flex items-center gap-2
              px-3 py-1.5
              rounded-full
              bg-blue-50
              text-blue-600
              text-xs font-medium
              shadow-sm
              transition-all 
              duration-200
              hover:bg-blue-100"
          >
            {traveler.user.username }

            <button
                onClick={() => handleRemoveTraveler( traveler.user.id )}
                className="hover:text-red-500 transition cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default TravelersSection;