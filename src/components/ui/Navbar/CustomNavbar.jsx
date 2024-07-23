import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, Link } from "@nextui-org/react";
import { useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function CustomNavbar() {
    const userData = useSelector((state) => state.user.userData);

    const [isMenuOpen, setIsMenuOpen] = React.useReducer((current) => !current, false);
    const { handleLogout } = useAuth();
    const nav = useNavigate();

    const menuItems = [
        { name: "Home", href: "/home" },
        { name: "Add Contact", href: "/create" },
        { name: "Profile", href: "/profile" },
    ];

    const logout = () => {
        handleLogout()
        nav("/login")
    }


    const handleRoute = (route) => {
        nav(route)
        setIsMenuOpen();
    }

    return (
        <Navbar isBordered className="max-w-full navbar" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="start">
                <NavbarBrand>
                    <p className="font-black text-2xl ">CMS</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4 justify-start" >
                <NavbarBrand >
                    <p className="font-black text-2xl ">CMS</p>
                </NavbarBrand>

            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            onPress={() => { handleRoute(item.href) }}
                            size="lg"
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>

            <NavbarContent as="div" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>

                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="default"
                            name="Jason Hughes"
                            size="sm"
                            src={userData?.profilePicture ? `data:image/jpeg;base64,${userData.profilePicture?.data}` : "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                        />

                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">{userData && userData.firstName || "User"}</p>
                        </DropdownItem>
                        <DropdownItem key="settings" onPress={() => { nav('/profile') }}>Profile</DropdownItem>
                        <DropdownItem key="logout" color="danger" onPress={logout}>
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
