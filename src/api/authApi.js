/** This will handle the authentication and registration api requests */
import axios from "axios"

export const login = async (email, password) => {
    const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password
    }, { withCredentials: true })

    return response;
}

export const register = async (formData) => {
    const response = await axios.post('http://localhost:3000/auth/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',

        },
    });
    return response
}