
import { SelectCountry } from "../utils";

function TripsSearchFilters({ filters, setFilters }) {

    const clearAll = () => {
        setFilters({
            search: "",
            country: "",
            startDate: "",
            endDate: "",
            isSurprise: false,
        });

        const startDate = document.getElementById('startDate');
        startDate.value = '';

        const endDate = document.getElementById('endDate');
        endDate.value = '';
    };

    return (
        <div className="w-full flex justify-center px-4">
            <div
                className="
                w-full max-w-4xl
                bg-white/90 backdrop-blur
                border border-gray-200
                rounded-3xl
                shadow-md
                px-5 py-4
                flex flex-col gap-4
                transition-all duration-300
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
                        value={filters.search || ''}
                        onChange={(e) =>
                            setFilters({ ...filters, search: e.target.value })
                        }
                        placeholder="Search trips, destinations..."
                        className="
                        flex-1
                        bg-transparent
                        outline-none
                        text-sm text-gray-700
                        placeholder-gray-400"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <select
                        value={filters.country || ""}
                        onChange={(e) =>
                            setFilters({ ...filters, country: e.target.value })
                        }
                        disabled={ filters.isSurprise }
                        className="
                        px-3 py-2.5 rounded-xl
                        bg-gray-50
                        border border-transparent
                        text-sm text-gray-700
                        cursor-pointer
                        transition
                        focus:outline-none
                        focus:bg-white
                        focus:border-blue-300
                        focus:ring-2 focus:ring-blue-100"
                    >
                        <SelectCountry />
                    </select>
                    
                    <input
                    id='startDate'
                    type="date"
                    onChange={ (e) => setFilters({...filters, startDate: e.target.value}) }
                    className="
                    px-3 py-2.5 rounded-xl
                    bg-gray-50
                    border border-transparent
                    text-sm text-gray-700
                    cursor-pointer
                    transition
                    focus:outline-none
                    focus:bg-white
                    focus:border-blue-300
                    focus:ring-2 focus:ring-blue-100"
                    />

                    <input
                    id='endDate'
                    type="date"
                    onChange={ (e) => setFilters({...filters, endDate: e.target.value}) }
                    className="
                    px-3 py-2.5 rounded-xl
                    bg-gray-50
                    border border-transparent
                    text-sm text-gray-700
                    cursor-pointer
                    transition
                    focus:outline-none
                    focus:bg-white
                    focus:border-blue-300
                    focus:ring-2 focus:ring-blue-100"
                    />

                    <label
                    className={`
                    flex items-center justify-center gap-2
                    px-3 py-2.5
                    rounded-xl
                    border border-transparent
                    text-sm
                    cursor-pointer
                    transition
                    hover:bg-blue-50
                    hover:text-blue-600
                    ${ filters.isSurprise
                        ? 'bg-blue-50 text-blue-600' 
                        : 'bg-gray-50 text-gray-600'
                    }`
                    }
                    >
                        <input
                        checked={ filters.isSurprise || false }
                        onChange={ (e) => 
                            setFilters({...filters, isSurprise: e.target.checked})
                        }
                        type="checkbox"
                        className="hidden bg-blue-50"
                        />
                        <span className="text-base">🎁</span>
                        Surprise
                    </label>
                </div>

                <div className="flex justify-between items-center pt-2">
                    <button
                    onClick={ () => clearAll() }
                    type="button"
                    className="
                    text-xs font-medium
                    text-gray-400
                    hover:text-blue-600
                    transition
                    cursor-pointer"
                    >
                        Clear filters
                    </button>

                    <span className="text-xs text-gray-400">
                        Typing will update results automatically
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TripsSearchFilters;