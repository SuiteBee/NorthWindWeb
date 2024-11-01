import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from "../components/navigation/Navbar";
import reactLogo from "../assets/icon/reactlogo.png";

function Layout() {
  return (
    <>
        <div className="site-container">
        <div className="titlebar"></div>
        <div className="header r1 c1">
          NW
        </div>
        <div className="header r1 c2">
          Northwind
        </div>
        
        <div className="header r1 c3">
            Powered by React 
            <img className="logo" src={reactLogo}></img>
        </div>

        <div className="box sidebar">
          <Navbar />
        </div>

        <div className="box content">
          <Outlet />
        </div>

        <div className="box footer">
          footer
        </div>

        <div className="box footer">
          footer
        </div>
      </div>
    </>
  );
}

export default Layout;