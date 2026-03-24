
import { useState } from "react";

export const useAlert = () => {
    const [serverError, setServerError] = useState(null);
    const [serverInfo, setServerInfo] = useState(null);
    const [activeAlert, setActiveAlert] = useState(false);

    const showAlert = (message, type) => {
        setActiveAlert(true);

        setServerError(type === 'error' ? message : null);
        setServerInfo(type !== 'error' ? message : null);

        setTimeout(() => {
            setActiveAlert(false);
        }, 3000);
    };

    return {
        serverError,
        serverInfo,
        activeAlert,
        showAlert
    };
};