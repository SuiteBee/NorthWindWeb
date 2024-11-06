import { useState } from 'react';
import { Outlet } from 'react-router-dom';

//////////////////////////////////////////
//Assets
//////////////////////////////////////////
import ReactLogo from "@/assets/icon/reactlogo.png";
import MenuIcon from "@/assets/icon/menu.svg";
import CloseIcon from "@/assets/icon/closeIcon.svg";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { Navbar } from "@/components/navigation/Navbar";

//////////////////////////////////////////
//Bootstrap
//////////////////////////////////////////
import Offcanvas from 'react-bootstrap/Offcanvas';

function Layout() {
  const [showNav, setNav] = useState(false);

  const handleCloseNav = () => setNav(false);
  const handleShowNav = () => setNav(true);

  return (
    <>

      <div className="sticky-top p-2 d-flex flex-nowrap align-items-baseline text-white bg-dark">
        <div className="display-1 col-sm-2 text-center">
          NW
        </div>
        <div className="display-4 col-sm-8 text-left">
          Northwind
        </div>
        
        {/*<div className="h4 col-sm-2 text-right">
          <div class="d-flex flex-nowrap align-items-baseline justify-content-end">
            Powered by React
            <img className="react-logo" src={ReactLogo}></img>
          </div>
        </div>
        */}

        <div className="col-sm-2">
          <button className="btn-default" type="button" onClick={handleShowNav}>
            <img src={MenuIcon}></img>
          </button>
        </div>
      </div>

      <Offcanvas className="bg-black" show={showNav} onHide={handleCloseNav}>
        <Offcanvas.Header className="justify-content-between">
          <div className="display-1 text-white">Menu</div>
          <div>
            <button className="btn-default" type="button" onClick={handleCloseNav}>
              <img src={CloseIcon}></img>
            </button>
          </div>
          
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Navbar />
        </Offcanvas.Body>
      </Offcanvas>

      <div className="box content">
        <Outlet />
      </div>

      <div className="box footer">
        footer
      </div>

      <div className="box footer">
        footer
      </div>
    </>
  );
}

export default Layout;