/** useAuth Custom hook for handling auth states */
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/auth/authSlice";
import { login as loginApi } from '../api/authApi';

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleLogin = async (email, password) => {
        try {
            const response = await loginApi(email, password)
            const token = response.data.accessToken;
            dispatch(login({ token }))
        } catch (error) {
            setError(error.response ? error.response.data.message : "Login failed");
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        dispatch(logout())
        console.log("Logout");
    }

    return { handleLogin, handleLogout, loading, error, isAuthenticated }
}

export default useAuth;