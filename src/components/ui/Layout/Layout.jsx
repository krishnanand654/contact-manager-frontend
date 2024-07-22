// Layout.jsx
import { useEffect } from "react";
import CustomNavbar from "../Navbar/CustomNavbar";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Layout = () => {
    const nav = useNavigate();
    useEffect(() => {
        nav('/home')
    }, [])
    return (
        <>
            <CustomNavbar />
            <div style={{ display: "flex" }}>
                <Sidebar />
                <div className="test relative w-screen ">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Layout;
