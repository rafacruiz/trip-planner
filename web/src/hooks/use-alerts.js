
import { useState } from "react";

export const useAlert = () => {
    const [serverType, setServerType] = useState(null);
    const [serverMessage, setServerMessage] = useState(null);
    const [activeAlert, setActiveAlert] = useState(false);

    const showAlert = async (message, type) => {
        setActiveAlert(true);
        setServerMessage(null);
        setServerType(null);

        setServerType(type)
        setServerMessage(message);
        
        if (type === 'errorValidation') {
            let errors = null;
            Object.keys(message).forEach((field) => {
                errors = message[field].message;
            });

            setServerType('error');
            setServerMessage(errors);
        }
       
        setTimeout(() => setActiveAlert(false), 3000);
    };

    return {
        serverType,
        serverMessage,
        activeAlert,
        showAlert
    };
};