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

      <div className="sticky-top p-2 d-flex flex-nowrap align-items-center text-white bg-dark">
        <div className="display-1 col-sm-1 text-center border-end">
          NW
        </div>
        <div className="display-4 col-sm-10 text-left px-5">
          Northwind
        </div>
        
        {/*<div className="h4 col-sm-2 text-right">
          <div class="d-flex flex-nowrap align-items-baseline justify-content-end">
            Powered by React
            <img className="react-logo" src={ReactLogo}></img>
          </div>
        </div>
        */}

        <div className="col-sm-1 d-flex justify-content-end">
          <button className="btn-default px-5" type="button" onClick={handleShowNav}>
            <img src={MenuIcon}></img>
          </button>
        </div>
      </div>

      <Offcanvas className="bg-dark" show={showNav} onHide={handleCloseNav}>
        <Offcanvas.Header className="justify-content-between border-bottom">
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

      <div className="container-fluid bg-black vh-100">
        <Outlet />
      </div>

      <div className="container-fluid bg-black h-10 border-top">
        <div className="d-flex justify-content-center">
          <div className="d-flex m-2 p-2">
            <h1>Powered by React</h1>
            <img className="react-logo ms-2 my-1" src={ReactLogo}></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;