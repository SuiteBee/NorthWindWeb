//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import useAlert from "@root/hooks/useAlert";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import React from "react";
import { NavLink } from "react-router-dom";

//////////////////////////////////////////
//Assets
//////////////////////////////////////////
import HomeIcon from "@root/assets/icon/homeIcon.svg";
import TaskIcon from "@root/assets/icon/taskIcon.svg";
import OrderIcon from "@root/assets/icon/orderIcon.svg";
import ClientsIcon from "@root/assets/icon/clientsIcon.svg";
import CatalogIcon from "@root/assets/icon/productIcon.svg";
import AboutIcon from "@root/assets/icon/aboutIcon.svg";
import LogoutIcon from "@root/assets/icon/logoutIcon.svg";

export const Navbar = (props) => {

    const { clearAlert } = useAlert();

    function handleClick(){
        clearAlert();
        props.CloseNav();
    }

    return (
        <>
            <div className="container-fluid h-100">
                <div className="navbar-nav h-100 row-gap-2 fs-4">
                    <NavLink className="nav-link" to="/dashboard" onClick={handleClick}>
                        <img className="me-4" src={HomeIcon}></img>
                        Dashboard
                    </NavLink>
                    <NavLink className="nav-link" to="/orders" onClick={handleClick}>
                        <img className="me-4" src={OrderIcon}></img>
                        Orders
                    </NavLink>
                    <NavLink className="nav-link" to="/customers" onClick={handleClick}>
                        <img className="me-4" src={ClientsIcon}></img>
                        Clients
                    </NavLink>
                    <NavLink className="nav-link" to="/products" onClick={handleClick}>
                        <img className="me-4" src={CatalogIcon}></img>
                        Products
                    </NavLink>
                    <NavLink className="nav-link" to="/about" onClick={handleClick}>
                        <img className="me-4" src={AboutIcon}></img>
                        About
                    </NavLink>
                    <NavLink className="nav-link mt-auto" to="/logout" onClick={handleClick}>
                        <img className="me-4" src={LogoutIcon}></img>
                        Log Out
                    </NavLink>
                </div>
            </div>
        </>
    );
};