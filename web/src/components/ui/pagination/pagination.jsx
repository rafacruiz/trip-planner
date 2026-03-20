
function Pagination({ pagination, onPageChange }) {
    
    if (!pagination || pagination?.totalPages === 1) return null;

    return (
        <div className="flex justify-center items-center gap-3 mt-8">
            <button
                disabled={!pagination.hasPrevPage}
                onClick={() => onPageChange(pagination.page - 1)}
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
                    active:scale-[0.98]
                    cursor-pointer"
            >
                Prev
            </button>

            <span className="text-sm text-gray-600">
                Page { pagination.page } of { pagination.totalPages }
            </span>

            <button
                disabled={!pagination.hasNextPage}
                onClick={() => onPageChange(pagination.page + 1)}
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
                    active:scale-[0.98]
                    cursor-pointer"
                        
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
