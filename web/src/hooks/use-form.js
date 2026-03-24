
import { useState } from "react";

export const useForm = (initialState) => {
    const [values, setValues] = useState(initialState);

    const handleChange = (field, value) => {
        setValues((prev) => ({
        ...prev,
        [field]: value,
        }));
    };

    const reset = () => setValues(initialState);

    return {
        values,
        setValues,
        handleChange,
        reset,
    };
};