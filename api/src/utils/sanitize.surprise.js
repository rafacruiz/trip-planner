
function tripsSanitizeSurprise(data, userId) {

    const sanitize = (trip) => {
        if (trip.userOwner._id.toString() !== userId.toString() 
            && trip.isSurprise === true
            && trip.revealDate.getTime() >= Date.now()) 
        {
            trip.description = 'This is a surprise trip! Details will be revealed on ' + trip.revealDate.toDateString();
            trip.title = 'This is a surprise trip! Details will be revealed on ' + trip.revealDate.toDateString();
            trip.country = {};
            trip.city = 'This is a surprise trip! Details will be revealed on ' + trip.revealDate.toDateString();
            trip.places = [];
            trip.activities = [];
            trip.imageUrl = process.env?.URL_IS_SURPRISE || '';
        }

        return trip;
    }

    return Array.isArray(data) 
        ? data.map(sanitize) : sanitize(data);
}

export default tripsSanitizeSurprise;