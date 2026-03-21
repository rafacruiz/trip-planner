import { useMemo } from "react";

function ButtonSearch({ filters, setFilters }) {

    const activeFilters = useMemo(() => {
        const chips = [];

        if (filters.search) {
            chips.push({ key: "search", label: filters.search });
        }

        if (filters.country) {
            chips.push({ key: "country", label: `🌍 ${filters.country}` });
        }

        if (filters.startDate) {
            chips.push({ key: "startDate", label: `📅 ${filters.startDate}` });
        }

        if (filters.endDate) {
            chips.push({ key: "endDate", label: `➡️ ${filters.endDate}` });
        }

        if (filters.isSurprise) {
            chips.push({ key: "isSurprise", label: "🎁 Surprise" });
        }

        return chips;
    }, [filters]);

    const removeFilter = (key) => {
        setFilters({
            ...filters,
            [key]: key === "isSurprise" ? false : "",
        });
    };

    const clearAll = () => {
        setFilters({
            search: "",
            country: "",
            startDate: "",
            endDate: "",
            isSurprise: false,
        });
    };

    return (
        <div className="w-full flex justify-center px-4">
            
            <div 
                className="
                    w-full 
                    max-w-4xl 
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
                    hover:shadow-xl 
                    transition-all 
                    duration-300">

                {/* 🔍 SEARCH */}
                <div className="flex items-center gap-3 border-b border-gray-100 pb-3 group">

                    <svg 
                        className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                        />
                    </svg>

                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) =>
                            setFilters({ ...filters, search: e.target.value })
                        }
                        placeholder="Search trips, destinations..."
                        className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                    />
                </div>

                {/* 🎛 FILTERS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

                    <input
                        type="text"
                        placeholder="🌍 Country"
                        value={filters.country || ""}
                        onChange={(e) =>
                            setFilters({ ...filters, country: e.target.value })
                        }
                        className="
                            px-3 
                            py-2.5 
                            rounded-xl 
                            bg-gray-50 
                            border 
                            border-transparent 
                            text-sm 
                            transition 
                            focus:bg-white 
                            focus:border-blue-300 
                            focus:ring-2 
                            focus:ring-blue-100"
                    />

                    <input
                        type="date"
                        value={filters.startDate || ""}
                        onChange={(e) =>
                            setFilters({ ...filters, startDate: e.target.value })
                        }
                        className="
                            px-3 
                            py-2.5 
                            rounded-xl 
                            bg-gray-50 
                            border 
                            border-transparent 
                            text-sm 
                            transition 
                            focus:bg-white 
                            focus:border-blue-300 
                            focus:ring-2 
                            focus:ring-blue-100"
                    />

                    <input
                        type="date"
                        value={filters.endDate || ""}
                        onChange={(e) =>
                            setFilters({ ...filters, endDate: e.target.value })
                        }
                        className="
                            px-3 
                            py-2.5 
                            rounded-xl 
                            bg-gray-50 
                            border 
                            border-transparent 
                            text-sm 
                            transition 
                            focus:bg-white 
                            focus:border-blue-300 
                            focus:ring-2 
                            focus:ring-blue-100"
                    />

                    <label 
                        className="
                            flex 
                            items-center 
                            justify-center 
                            gap-2 
                            px-3 
                            py-2.5 
                            rounded-xl 
                            bg-gray-50 
                            text-sm 
                            cursor-pointer 
                            hover:bg-blue-50 
                            hover:text-blue-600 
                            transition">
                        <input
                            type="checkbox"
                            checked={filters.isSurprise || false}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    isSurprise: e.target.checked,
                                })
                            }
                            className="hidden"
                        />
                        🎁 Surprise
                    </label>

                </div>

                {/* 🔥 CHIPS ACTIVOS */}
                {activeFilters.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 animate-fade-in">

                        {activeFilters.map((chip) => (
                            <div
                                key={chip.key}
                                className="
                                    flex items-center gap-2
                                    px-3 py-1.5
                                    rounded-full
                                    bg-blue-50
                                    text-blue-600
                                    text-xs font-medium
                                    shadow-sm
                                    transition-all duration-200
                                    hover:bg-blue-100
                                "
                            >
                                {chip.label}

                                <button
                                    onClick={() => removeFilter(chip.key)}
                                    className="hover:text-red-500 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                    </div>
                )}

                {/* ACTIONS */}
                <div className="flex justify-between items-center pt-2">

                    <button
                        type="button"
                        onClick={clearAll}
                        className="text-xs font-medium text-gray-400 hover:text-blue-600 transition"
                    >
                        Clear all
                    </button>

                    <span className="text-xs text-gray-400">
                        Live search enabled
                    </span>

                </div>

            </div>
        </div>
    );
}

export default ButtonSearch;