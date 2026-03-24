
export const handleAsyncAction = async ({
    action,
    onSuccess,
    onError,
}) => {
    try {
        const result = await action();

        if (onSuccess) await onSuccess(result);

        return result;
    } catch (error) {
        console.error(error);

        if (onError) onError(error);

        throw error;
    }
};