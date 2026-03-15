
function formatDate(date) {
    return new Date(date).toLocaleDateString("es-ES", {
        timeZone: "UTC",
        month: "short",
        day: "numeric"
    });
}

function tripDays(start, end) {
    const diff = new Date(end) - new Date(start);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function TripDate({ startDate, endDate, isSurprise, revealDate }) {

    if (isSurprise) {
        const reveal = new Date(revealDate);

        const formattedReveal = reveal.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
        });

        return (
            <div className="flex items-center gap-2 text-sm text-gray-500">
                🎁 Reveal on { formattedReveal }
            </div>
        );
    }

    const start = formatDate(startDate);
    const end = formatDate(endDate);
    const days = tripDays(startDate, endDate);

    return (
        <div className="flex items-center gap-2 text-sm text-gray-500">
            📅 {start} – {end}
            <span className="text-gray-400">·</span>
            <span>{days} days</span>
        </div>
    );
}

export default TripDate;