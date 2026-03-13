
import createHttpError from "http-errors";

export async function countries(req, res) {
   
    const response = await fetch(
        new URL(process.env.COUNTRY_API_URL)
    );

    if (!response.ok) throw createHttpError(503, "Failed to fetch countries");

    const countries = await response.json();

    if (!Array.isArray(countries)) {
        throw createHttpError(502, "Invalid countries response");
    }

    const countriesFormart = countries
        .map((country) => ({
            name: country.name.common,
            code: country.cca2
        })).sort((a, b) => a.name.localeCompare(b.name));

    res.json({ 
        success: true, 
        data: countriesFormart 
    });
}