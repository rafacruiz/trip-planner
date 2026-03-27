
const getImageByCountry = async (country) => {

    try {
        const url = new URL(process.env?.COUNTRY_IMAGE_URL);

        url.searchParams.append('query', country);
        url.searchParams.append('per_page', 1);
        url.searchParams.append('orientation', 'landscape');
        url.searchParams.append('client_id', process.env?.USNPLASH_KEY);
        
        const response = await fetch(url);

        if (!response.ok){
            console.warn("Image service failed:", response?.status);
            return null;
        }
    
        const data = await response.json();
        
        return data?.results[0]?.urls?.full;

    } catch (error) {
        console.warn("Image fetch error:", error.message);
        return null;
    }
}

export default getImageByCountry;