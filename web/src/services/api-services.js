
import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', 
    withCredentials: true
});

http.interceptors.response.use(
    (res) => res.data,
    (err) => {
        const { status, data } = err?.response || {};
        
        if (status === 400) {
            console.error('API Error:', data || err.message);
        }

        return Promise.reject({
            message: data?.message || 'Bad Request',
            status: status
        });
    }
);

export const signup = (userData) =>
    http.post('/auth/signup', userData);

export const login = (email, password) =>
    http.post('/auth/login', { email, password });

export const logout = () => 
    http.delete('/auth/logout');

export const verify = () => 
    http.get('/auth/verify');