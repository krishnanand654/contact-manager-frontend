// Layout.jsx
import CustomNavbar from "../Navbar/CustomNavbar";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {

    return (
        <>
            <CustomNavbar />
            <div style={{ display: "flex" }}>
                <div className="fixed hidden md:block sm:block">
                    <Sidebar />
                </div>
                <div className="test relative w-screen sm:ml-[250px]">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Layout;
