import { useState } from "react";
import { Link } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import { UserBar } from "./UserBar";

export const Navbar = () => {
  const [sideBar, toggleSideBar] = useState<boolean>(false);

  const handleToggleSidebar = () => {
    toggleSideBar(!sideBar);
  };

  return (
    <div>
      <div className="navbar">
        <button onClick={handleToggleSidebar}>
          <i className="bi bi-grid-3x2-gap fs-1"></i>
        </button>
        <UserBar />
      </div>

      <Offcanvas
        show={sideBar}
        onHide={handleToggleSidebar}
        placement="start"
        backdrop={false}
        scroll={true}
        className="custom-sidebar"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sidebar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link to="/">
            <h3>Home</h3>
          </Link>
          <br />
          <Link to="/my-lists">
            <h3>Lists</h3>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
