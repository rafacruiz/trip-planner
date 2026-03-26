
const getImageByCountry = async (country) => {

    const url = new URL(process.env.COUNTRY_IMAGE_URL);

    url.searchParams.append('query', country);
    url.searchParams.append('per_page', 1);
    url.searchParams.append('orientation', 'landscape');
    url.searchParams.append('client_id', process.env.USNPLASH_KEY);
    
    const response = await fetch(url);

    if (!response.ok) return { error: 500, message: "Failed to fetch images country" };
 
    const data = await response.json();

    const result = data.results[0];
    
    return result?.urls?.full;
}

export default getImageByCountry;