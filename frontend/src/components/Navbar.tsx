import { useState } from "react";
import { Link } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";

export const Navbar = () => {
  const [sideBar, toggleSideBar] = useState<boolean>(false);

  const handleToggleSidebar = () => {
    toggleSideBar(!sideBar);
  };

  return (
    <div>
      <div className="navbar">
        <button onClick={handleToggleSidebar}>toggle</button>
      </div>

      <Offcanvas
        show={sideBar}
        onHide={handleToggleSidebar}
        placement="start"
        backdrop={false}
        scroll={true}
        className="side-bar"
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
