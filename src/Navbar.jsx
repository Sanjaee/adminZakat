import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Anda dapat membuat file CSS terpisah untuk gaya navbar

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">PGadmin</div>

        {/* Hamburger Menu untuk perangkat seluler */}
        <div className="navbar-toggle" onClick={toggleMenu}>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
        </div>

        {/* Menu Utama */}
        <ul className={`navbar-menu ${isOpen ? "open" : ""}`}>
          <Link to="/">
            <li className="navbar-item">Post</li>
          </Link>

          <Link to="/update">
            <li className="navbar-item">update</li>
          </Link>
          <Link to="/delete">
            <li className="navbar-item">delete</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
