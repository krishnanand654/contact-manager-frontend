import axiosInstance from "../services/axiosIntance"

export const fetchUser = () => {
    const response = axiosInstance.get('/session/user');
    return response;
}

export const updateUser = (formData) => {
    const response = axiosInstance.put('/session/user-update', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    );
    return response
}