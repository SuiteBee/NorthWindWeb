import React from "react";
import { NavLink } from "react-router-dom";

import HomeIcon from "@/assets/icon/homeIcon.svg";
import TaskIcon from "@/assets/icon/taskIcon.svg";
import OrderIcon from "@/assets/icon/orderIcon.svg";
import ClientsIcon from "@/assets/icon/clientsIcon.svg";
import CatalogIcon from "@/assets/icon/productIcon.svg";
import AboutIcon from "@/assets/icon/aboutIcon.svg";
import LogoutIcon from "@/assets/icon/logoutIcon.svg";

export const Navbar = () => {
    return (
        <>
            <div className="container-fluid h-100">
                <div className="navbar-nav h-50">
                    <NavLink className="p-4 nav-link" to="/">
                        <img className="p-2" src={HomeIcon}></img>
                        Home
                    </NavLink>
                    <NavLink className="p-4 nav-link" to="/tasks">
                        <img className="p-2" src={TaskIcon}></img>
                        Task Manager
                    </NavLink>
                    <NavLink className="p-4 nav-link" to="/orders">
                        <img className="p-2" src={OrderIcon}></img>
                        Orders
                    </NavLink>
                    <NavLink className="p-4 nav-link" to="/customers">
                        <img className="p-2" src={ClientsIcon}></img>
                        Clients
                    </NavLink>
                    <NavLink className="p-4 nav-link" to="/products">
                        <img className="p-2" src={CatalogIcon}></img>
                        Catalog
                    </NavLink>
                    <NavLink className="p-4 nav-link" to="/about">
                        <img className="p-2" src={AboutIcon}></img>
                        About
                    </NavLink>
                </div>
                <div className="navbar-nav h-50 justify-content-end">
                    <NavLink className="p-4 nav-link" to="/logout">
                        <img className="p-2" src={LogoutIcon}></img>
                        Log Out
                    </NavLink>
                </div>
            </div>
        </>
    );
};