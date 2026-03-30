
function TripsHeader({ trip, user, onEdit }) {
    
    return (
        <div className="relative h-72 w-full overflow-hidden">
            <div className="
                relative 
                h-72 
                w-full 
                overflow-hidden
                rounded-b-3xl
            ">
                <div className="
                    absolute 
                    inset-0
                    bg-center
                    bg-cover
                    bg-no-repeat
                    transition-transform
                    duration-[4000ms]
                    hover:scale-105
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
                    from-black/80
                    via-black/40
                    to-transparent
                " />

                <div className="
                    absolute 
                    inset-0 
                    backdrop-blur-[1.5px]
                " />

                <div className="
                    absolute 
                    bottom-8 
                    left-8 
                    text-white
                    max-w-xl
                ">
                    <h1 className="
                        text-4xl 
                        font-bold 
                        tracking-tight
                        drop-shadow-xl
                    ">
                        { trip.isSurprise && '🎁' } { trip.title }
                    </h1>

                    <p className="
                        text-sm 
                        opacity-95 
                        mt-1
                        drop-shadow-md
                    ">
                        { trip.country?.flag } { trip.country?.name[0].toUpperCase() }{ trip.country?.name.slice(1) }
                    </p>
                </div>

                {user.id.toString() === trip.userOwner.id.toString() && (
                    <button
                        onClick={ onEdit }
                        className="
                            absolute 
                            top-6 
                            right-6
                            flex 
                            items-center 
                            gap-2
                            bg-white/90
                            backdrop-blur
                            px-4 
                            py-2
                            rounded-xl
                            text-sm 
                            font-medium
                            text-gray-700
                            shadow-md
                            hover:bg-white
                            hover:shadow-lg
                            hover:scale-[1.02]
                            transition
                            cursor-pointer
                        "
                    >
                        ✏️ Edit Trip
                    </button>
                )}
            </div>
        </div>
    );
}

export default TripsHeader;