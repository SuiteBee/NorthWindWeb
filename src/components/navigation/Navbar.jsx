import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/navbar.css";

import HomeIcon from "../../assets/icon/homeIcon.svg";
import TaskIcon from "../../assets/icon/taskIcon.svg";
import OrderIcon from "../../assets/icon/orderIcon.svg";
import ClientsIcon from "../../assets/icon/clientsIcon.svg";
import CatalogIcon from "../../assets/icon/productIcon.svg";
import AboutIcon from "../../assets/icon/aboutIcon.svg";
import LogoutIcon from "../../assets/icon/logoutIcon.svg";

export const Navbar = () => {
    return (
        <>
            <div className="nav">
                <div className="navMenu">
                    <NavLink className="navLink" to="/">
                        <img className="icon" src={HomeIcon}></img>
                        Home
                    </NavLink>
                    <NavLink className="navLink" to="/tasks">
                        <img className="icon" src={TaskIcon}></img>
                        Task Manager
                    </NavLink>
                    <NavLink className="navLink" to="/orders">
                        <img className="icon" src={OrderIcon}></img>
                        Orders
                    </NavLink>
                    <NavLink className="navLink" to="/customers">
                        <img className="icon" src={ClientsIcon}></img>
                        Clients
                    </NavLink>
                    <NavLink className="navLink" to="/products">
                        <img className="icon" src={CatalogIcon}></img>
                        Catalog
                    </NavLink>
                    <NavLink className="navLink" to="/about">
                        <img className="icon" src={AboutIcon}></img>
                        About
                    </NavLink>
                    <NavLink className="navLink" to="/logout">
                        <img className="icon" src={LogoutIcon}></img>
                        Log Out
                    </NavLink>
                </div>
            </div>
        </>
    );
};