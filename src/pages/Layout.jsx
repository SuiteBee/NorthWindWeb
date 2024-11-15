import { useCallback, useState } from 'react';
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
import AlertMsg from '@/components/messaging/AlertMsg';

//////////////////////////////////////////
//Bootstrap
//////////////////////////////////////////
import Offcanvas from 'react-bootstrap/Offcanvas';


function Layout() {
  const [showNav, setNav] = useState(false);

  const handleCloseNav = () => setNav(false);
  const handleShowNav = () => setNav(true);
  
  const CloseNavbar = useCallback(() => {
    setNav(false);
  }, [showNav]);

  return (
    <>
      <div className="sticky-top p-2 d-flex flex-nowrap align-items-center text-white bg-dark justify-content-between">
        <div className="display-1 col-sm-auto text-center border-end px-3">
          NW
        </div>
        <div className="display-4 col-sm-8 flex-fill px-3">
          Northwind
        </div>

        <div className="col-sm-1 d-flex justify-content-end">
          <button className="btn-default px-5" type="button" onClick={handleShowNav}>
            <img src={MenuIcon}></img>
          </button>
        </div>
      </div>

      <Offcanvas className="bg-dark w-40" show={showNav} onHide={handleCloseNav}>
        <Offcanvas.Header className="justify-content-between border-bottom">
          <div className="display-1 text-white">Menu</div>
          <div>
            <button className="btn-default" type="button" onClick={handleCloseNav}>
              <img src={CloseIcon}></img>
            </button>
          </div>
          
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Navbar CloseNav={CloseNavbar}/>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="container-fluid d-block overflow-auto min-vh-100 bg-black">
        <Outlet />
      </div>

      <AlertMsg />

      <div className="container-fluid vw-100 bg-black border-top">
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