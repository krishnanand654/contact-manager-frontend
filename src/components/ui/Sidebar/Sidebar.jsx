import { NavLink } from "react-router-dom";
import './sidebar.css';

const Sidebar = () => {
    const pages = [
        { name: 'Contacts', url: '/home', icon: "https://img.icons8.com/isometric-line/50/000000/groups.png" },
        { name: 'Add New', url: '/create', icon: "https://img.icons8.com/dotty/80/000000/add.png" },
    ]
    return (
        <div className="sidebar p-5 " >
            <div aria-label="Actions" >
                {pages && pages.map((page, index) => {
                    return (<div key={index}>
                        <NavLink to={page.url} className="flex gap-1 items-center hover:bg-zinc-300  rounded-md pt-1 pb-1 mb-3 pl-2">
                            <div className="w-8">
                                <img width="64" height="64" src={page.icon} alt="user-group-man-man" />
                            </div>
                            <p className="font-medium">{page.name}</p>
                        </NavLink>
                    </div>)
                })}
            </div>
        </div>
    );
};

export default Sidebar;