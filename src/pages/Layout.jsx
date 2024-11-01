import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from "../components/navigation/Navbar";
import reactLogo from "../assets/icon/reactlogo.png";

function Layout() {
  return (
    <>
        <div className="site-container">
        {/*<div className="header box"></div>*/}
        <div className="box header c1">
          <h1>NW</h1>
        </div>
        <div className="header c2">
          <h1>Northwind</h1>
        </div>
        
        <div className="header c3">
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