import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ButtonSearch({filters, setFilters}) {

    return (
        <div
            className="w-full flex justify-center"
        >
            <div
                className="
                group
                flex items-center gap-3
                w-full max-w-2xl
                px-4 py-3
                rounded-2xl
                bg-white
                border border-gray-200
                shadow-md
                transition-all duration-300

                hover:shadow-lg
                focus-within:shadow-xl
                focus-within:border-blue-400
                "
            >
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
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    placeholder="Search destinations, countries, trips..."
                    className="
                        flex-1
                        bg-transparent
                        outline-none
                        text-sm text-gray-700
                        placeholder-gray-400
                    "
                />

                <button
                    type="submit"
                    className="
                        flex items-center gap-2
                        px-4 py-2
                        rounded-xl
                        bg-gradient-to-r from-blue-600 to-indigo-600
                        text-white text-sm font-semibold
                        shadow
                        transition-all duration-300

                        hover:shadow-md
                        hover:scale-[1.03]
                        active:scale-[0.98]"
                    >
                    Search

                    <svg
                        className="w-4 h-4"
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
                </button>
            </div>
        </div>
    );
}

export default ButtonSearch;