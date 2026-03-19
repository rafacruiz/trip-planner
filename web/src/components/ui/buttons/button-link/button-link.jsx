
import { Link } from "react-router-dom";

function ButtonLink({ url='', text='' }) {

    return (
        <div className="flex justify-center mt-10">
            <Link
                to={ url }
                className="
                group relative inline-flex items-center gap-2
                px-6 py-3
                rounded-2xl
                bg-gradient-to-r from-blue-600 to-indigo-600
                text-white text-sm font-semibold
                shadow-md
                hover:shadow-lg
                transition-all duration-300
                hover:scale-[1.02]
                "
            >
                <span>{ text }</span>

                <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>

                <span
                className="
                    absolute inset-0 rounded-2xl
                    bg-white/10 opacity-0
                    group-hover:opacity-100
                    transition
                "
                />
            </Link>
        </div>
    );
}

export default ButtonLink;