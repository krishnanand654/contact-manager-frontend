import axios from 'axios';
import { store } from '../store/store';
import { refresh, logout } from '../features/auth/authSlice';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});


axiosInstance.interceptors.request.use(
    function (config) {
        const state = store.getState();
        const token = state.auth.token;

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.post('http://localhost:3000/auth/refresh-token', {}, {
                    withCredentials: true
                });

                if (response.data && response.data.accessToken) {
                    // Update the access token in the Redux store
                    store.dispatch(refresh({ token: response.data.accessToken }));

                    // Update the token in the request headers
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

                    return axiosInstance(originalRequest);
                }
            } catch (error) {
                console.log(error)
                store.dispatch(logout());
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
