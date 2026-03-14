
import { useNavigate } from "react-router-dom";

function BackButton({ to = -1 }) {
    const navigate = useNavigate();

    return (
        <button
        type="button"
        onClick={() => navigate(to)}
        className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
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
  );
}

export default BackButton;