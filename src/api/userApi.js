import axiosInstance from "../services/axiosIntance"

export const fetchUser = () => {
    const response = axiosInstance.get('/session/user');
    return response;
}