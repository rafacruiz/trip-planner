
const getCountryByCode = async (code) => {

    const response = await fetch(
        new URL(process.env.COUNTRY_API_URL + '/alpha/' + code)
    );

    if (!response.ok) return { error: 500, message: "Failed to fetch countries" };

    const [country] = await response.json();
    
    return { 
        name: country.name.common, 
        code: country.cca2, 
        flag: country.flag || null,
        location: { 
            type: "Point", 
            coordinates: country.capitalInfo.latlng 
        }
    };
}

export default getCountryByCode;