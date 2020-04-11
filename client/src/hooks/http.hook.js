import {useCallback, useState} from 'react';


export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessages] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}, create = false) => {
        setLoading(true);
        try {

            if (body && !create) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, {method, body, headers});
            const data = await response.json();
            setLoading(false);
            setMessages(data.message);

            return data;

        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }

    }, [])

    const clearError = useCallback(() => {
        setError(null);
    }, [])

    return {loading, request, error, clearError, message}

};