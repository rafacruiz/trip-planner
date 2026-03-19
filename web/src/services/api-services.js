
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


export const getProfile = () =>
    http.get('/profile/me');

export const updateProfile = (data) => 
    http.patch('/profile/me', data);

export const getUser = (userId) =>
    http.get(`/profile/${ userId }`);


export const listTrips = (filters = {}) => 
    http.get('/trips', { params: filters });

export const getTrip = (tripId) => 
    http.get(`/trips/${ tripId }`)

export const createTrip = (data) => 
    http.post('/trips', data);

export const updateTrip = (tripId, data) =>
    http.patch(`/trips/${tripId}`, data);

export const deleteTrip = (tripId) =>
    http.delete(`/trips/${tripId}`);


export const createPlace = (tripId, data) =>
    http.post(`/trips/${tripId}/places`, data);

export const updateStatePlace = (tripId, placeId) =>
    http.patch(`/trips/${tripId}/places/${placeId}`);

export const deletePlace = (tripId, placeId) =>
    http.delete(`/trips/${tripId}/places/${placeId}`);


export const createActivity = (tripId, data) =>
    http.post(`/trips/${tripId}/activities`, data);

export const updateStateActivity = (tripId, activityId) =>
    http.patch(`/trips/${tripId}/activities/${activityId}`);

export const deleteActivity = (tripId, activityId) =>
    http.delete(`/trips/${tripId}/activities/${activityId}`);


export const listCountries = () =>
    http.get('/countries');