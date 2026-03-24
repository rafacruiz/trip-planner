

import { useNavigate } from "react-router-dom";

function ButtonExplorerTrips() {

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/trips")}
      className="
        group
        flex items-center gap-3
        px-6 py-4
        rounded-2xl
        bg-gradient-to-r
        from-blue-600
        to-indigo-600
        text-white
        font-semibold
        text-sm
        shadow-md
        hover:shadow-lg
        hover:scale-[1.02]
        active:scale-[0.98]
        transition-all duration-300
        cursor-pointer
      "
    >
      <div className="
        w-9 h-9
        flex items-center justify-center
        rounded-xl
        bg-white/20
        group-hover:bg-white/30
        transition
      ">
        <svg
          className="w-5 h-5 text-white"
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

      <div className="flex flex-col text-left">
        <span className="leading-none">
          Explore Trips
        </span>
        <span className="text-xs opacity-80 font-medium">
          Discover new adventures
        </span>
      </div>
    </button>
  );
}

export default ButtonExplorerTrips;