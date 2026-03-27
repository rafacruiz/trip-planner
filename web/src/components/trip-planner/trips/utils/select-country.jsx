
import { useEffect, useState } from "react";
import { listCountries } from '../../../../services/api-services';

function SelectCountry({ name = true }) {

    const [countries, setCountries] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countries = await listCountries();
                setCountries(countries);    
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchCountries();
    }, []);

    return (
        <>
            <option value="">🌍 Country</option>
            { countries?.map((option) => (
                <option 
                    key={ option.code } 
                    value={ name ? option.name : option.code }
                >
                    { option.flag } { option.name }
                </option>))
            } 
        </>
    );
}

export default SelectCountry;