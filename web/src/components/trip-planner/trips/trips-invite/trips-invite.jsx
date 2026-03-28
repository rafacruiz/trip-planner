
import { Alert } from '../../../ui';
import InvitationSkeleton from './trip-invite-skeleton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTrip, useAlert } from '../../../../hooks';
import { handleAsyncAction } from '../../utils/async-action';
import { acceptInviteTravelerTrip, declineInviteTravelerTrip } from '../../../../services/api-services';

function TripInvitation() {

    const navigate = useNavigate();

    const location = useLocation();

    const params = new URLSearchParams(location.search);

    const tripId = params.get('trip');

    const token = params.get('token');

    const { trip, loading, error }  = useTrip(tripId);

    const { showAlert, serverType, serverMessage, activeAlert } = useAlert();

    const handleAcceptInvite = () => {
        handleAsyncAction({
            action: () => acceptInviteTravelerTrip({ tripId, token }),
            onSuccess: async () => {
                showAlert(
                    "🎉 You're now part of the trip!",
                    'success'
                );

                const timeOut = setTimeout(() => 
                    navigate(`/trips/${ tripId }`)
                , 3000);
            },
            onError: (msg) => showAlert(msg.message, 'errorValidation'),
        });
    };

    const handleDeclineInvite = () => {
        handleAsyncAction({
            action: () => declineInviteTravelerTrip({ tripId, token }),
            onSuccess: async () => {
                showAlert(
                    "They won’t be joining this trip, maybe next time!"
                );

                const timeOut = setTimeout(() => 
                    navigate(`/`)
                , 3000);
            },
            onError: (msg) => showAlert(msg.message, 'errorValidation'),
        });
    };

    return (
        <div className="
            min-h-screen
            bg-gradient-to-br
            from-blue-50
            via-white
            to-indigo-100
            flex
            items-center
            justify-center
            px-4
        ">
            <div className="
                w-full
                max-w-xl
                flex
                flex-col
                gap-6
            ">
                {loading && ( <InvitationSkeleton /> )}

                {!loading && error && (

                    <div className="
                        bg-white
                        rounded-3xl
                        border border-red-200
                        shadow-sm
                        p-8
                        text-center
                        space-y-4
                    ">
                        <div className="text-5xl"> ⚠️ </div>

                        <h1 className="text-xl font-semibold text-gray-800">
                            Invalid or expired invitation
                        </h1>

                        <p className="text-sm text-gray-500
                        ">
                            This invitation link is no longer valid.
                        </p>
                    </div>
                )}

                {!loading && trip && (

                    <div className="
                        bg-white
                        rounded-3xl
                        border border-gray-200
                        shadow-lg
                        overflow-hidden
                    ">
                        <div className="
                            relative
                            h-40
                            w-full
                            overflow-hidden
                        ">
                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-cover
                                    bg-center
                                "
                                style={{
                                    backgroundImage: trip?.imageUrl
                                        ? `url(${trip.imageUrl})`
                                        : `linear-gradient(
                                            to bottom right,
                                            #3b82f6,
                                            #6366f1,
                                            #a855f7
                                        )`
                                }}
                            />

                            <div className="
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-black/70
                                to-transparent
                            " />

                            <div className="
                                absolute
                                bottom-4
                                left-4
                                text-white
                            ">
                                <h2 className="
                                    text-lg
                                    font-semibold
                                ">
                                    { trip.title }
                                </h2>

                                <p className="text-xs opacity-90">
                                    { trip.country?.flag } { trip.country?.name }
                                </p>
                            </div>
                        </div>

                        <div className="p-8 text-center space-y-6">
                            <div className="text-4xl"> ✉️ </div>

                            <div className="space-y-2">
                                <h1 className="
                                    text-2xl
                                    font-bold
                                    text-gray-800
                                ">
                                    You're invited to join a trip!
                                </h1>

                                <p className="text-sm text-gray-500">
                                    <span className="font-semibold text-gray-700">
                                        { trip?.userOwner?.username }
                                    </span>

                                    {" "}invited you to join the trip

                                    {" "}

                                    <span className="font-semibold text-gray-700">
                                        { trip.title }
                                    </span>
                                </p>
                            </div>

                            <div className="flex items-center justify-center gap-3">
                                <img
                                    src={ trip?.userOwner?.avatar }
                                    className="
                                        w-12 h-12
                                        rounded-full
                                        object-cover
                                        border border-gray-200
                                    "
                                />

                                <div className="text-left">
                                    <p className="text-sm font-semibold text-gray-800">
                                        { trip?.userOwner?.username }
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Trip organizer
                                    </p>
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

                            <div className="flex gap-3 justify-center pt-4">
                                <button
                                    onClick={ () => handleDeclineInvite() }
                                    disabled={ activeAlert }
                                    className="
                                        px-6 py-3
                                        rounded-2xl
                                        border
                                        border-gray-200
                                        text-sm
                                        font-medium
                                        text-gray-600
                                        hover:bg-gray-50
                                        transition
                                        cursor-pointer
                                    "
                                >
                                    Decline
                                </button>

                                <button
                                    onClick={ () => handleAcceptInvite() }
                                    disabled={ activeAlert }
                                    className="
                                        px-6 py-3
                                        rounded-2xl
                                        bg-gradient-to-r
                                        from-blue-600
                                        to-indigo-600
                                        text-white
                                        font-semibold
                                        shadow-md
                                        hover:shadow-lg
                                        hover:scale-[1.02]
                                        transition
                                        cursor-pointer
                                    "
                                >
                                    Accept invitation ✨
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TripInvitation;