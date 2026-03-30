
import TripsCountdown from './trips-countdown';

function SurpriseBanner({ trip, showCountdown, revealReached }) {

    return (
        <>
            { trip.isSurprise && showCountdown && (
                <>
                    <div className="
                        bg-gradient-to-br 
                        from-indigo-100 
                        to-purple-100
                        border 
                        border-purple-200
                        rounded-2xl
                        p-6
                        text-center
                    ">
                        <div className="text-3xl mb-2">
                            ⏳
                        </div>

                        <p className="
                            text-sm
                            text-purple-700
                            font-medium
                        ">
                            Destination reveal in
                        </p>

                        <div className="
                            text-2xl
                            font-bold
                            text-purple-800
                            mt-1
                        ">
                            <TripsCountdown revealDate={ trip.revealDate }/>
                        </div>
                    </div>
                </>
            )}

            { trip.isSurprise && !revealReached &&

                <div className="
                    bg-white
                    rounded-2xl
                    border 
                    border-gray-100
                    p-6
                ">
                    <h3 className="font-semibold mb-4">
                        🔐 Hidden destination details
                    </h3>

                    <div className="space-y-2 text-sm">

                        <p>🌍 Country: ???</p>

                        <p>🏙 City: Locked</p>

                        <p>🌡 Weather: Locked</p>
                    </div>
                </div>
            }
        </>
    );
}

export default SurpriseBanner;