import React from "react";
import { NavLink } from "react-router-dom";

import HomeIcon from "@/assets/icon/homeIcon.svg";
import TaskIcon from "@/assets/icon/taskIcon.svg";
import OrderIcon from "@/assets/icon/orderIcon.svg";
import ClientsIcon from "@/assets/icon/clientsIcon.svg";
import CatalogIcon from "@/assets/icon/productIcon.svg";
import AboutIcon from "@/assets/icon/aboutIcon.svg";
import LogoutIcon from "@/assets/icon/logoutIcon.svg";

export const Navbar = (props) => {
    return (
        <>
            <div className="container-fluid h-100">
                <div className="navbar-nav h-100 row-gap-2">
                    <NavLink className="nav-link" to="/" onClick={props.CloseNav}>
                        <img className="me-2" src={HomeIcon}></img>
                        Home
                    </NavLink>
                    <NavLink className="nav-link" to="/tasks" onClick={props.CloseNav}>
                        <img className="me-2" src={TaskIcon}></img>
                        Task Manager
                    </NavLink>
                    <NavLink className="nav-link" to="/orders" onClick={props.CloseNav}>
                        <img className="me-2" src={OrderIcon}></img>
                        Orders
                    </NavLink>
                    <NavLink className="nav-link" to="/customers" onClick={props.CloseNav}>
                        <img className="me-2" src={ClientsIcon}></img>
                        Clients
                    </NavLink>
                    <NavLink className="nav-link" to="/products" onClick={props.CloseNav}>
                        <img className="me-2" src={CatalogIcon}></img>
                        Catalog
                    </NavLink>
                    <NavLink className="nav-link" to="/about" onClick={props.CloseNav}>
                        <img className="me-2" src={AboutIcon}></img>
                        About
                    </NavLink>
                    <NavLink className="nav-link mt-auto" to="/logout" onClick={props.CloseNav}>
                        <img className="me-2" src={LogoutIcon}></img>
                        Log Out
                    </NavLink>
                </div>
            </div>
        </>
    );
};