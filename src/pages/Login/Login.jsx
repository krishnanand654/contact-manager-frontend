import LoginForm from "../../components/form/LoginForm";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { getUser } from "../../features/user/userSlice";
import { Segmented } from 'antd';
import Registration from "../Registration/Registration";

const Login = () => {
    const { handleLogin, loading, error, isAuthenticated } = useAuth();
    const nav = useNavigate();
    const [selector, setSelector] = useState("Sign in");

    const dispatch = useDispatch();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await fetchUser();
                console.log(response)
                const data = response.data;
                dispatch(getUser({ userData: data }));
            } catch (error) {
                console.log(error)
            }
        }

        if (isAuthenticated) {
            getUserData();
            nav('/home');
        }
    }, [isAuthenticated, nav]);

    const handleSubmit = (formData) => {
        const email = formData.email
        const password = formData.password
        handleLogin(email, password)
    };

    return (
        <div className=" ">
            <div className="flex flex-col md:flex-row">

                <div className="w-full md:w-3/4 relative">
                    <img src="https://cdn.dribbble.com/userupload/4094964/file/original-6466429eea29e834a337a3c7fb6f6fb9.jpg?resize=1200x900" className="w-full h-full" />

                    <p className="absolute  top-[80%] left-[-4%] text-end   sm:text-4xl text-white text-bold w-full ">Streamline Your Contact Management<br /> with Our CMS</p>
                </div>
                <div className="w-full md:w-2/4 p-2 flex-row justify-center  border-l sm:h-screen">
                    <div className="w-full flex justify-end p-5">
                        <div>
                            <Segmented
                                className="font-medium"
                                options={['Sign in', 'Sign up']}
                                onChange={(value) => {
                                    setSelector(value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="text-center flex sm:h-[80vh] flex-col items-center justify-center ">

                        {selector === "Sign in" ? (<>
                            <div className=" mb-10">
                                <h1 className="font-bold text-2xl">Login to CMS</h1>
                                <p className="text-[14px] font-[200] text-zinc-500">Not logged in yet? <span>Switch to Sign up</span></p>
                            </div>
                            <LoginForm onSubmit={handleSubmit} loading={loading} />
                            <p className="mt-2 text-center text-danger">{error && error}</p>
                        </>
                        ) : <Registration />}
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Login;
