import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { logout } from "../../store/login/login.actions";
import IconImage from "../../assets/icon192x192.png";

const Header = (props) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const unlisten = props.history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  });

  const closeNav = () =>
    setTimeout(() => {
      setExpanded(false);
    }, 150);
  return (
    <Navbar bg="" expand="lg" className="header" expanded={expanded}>
      <Link className="logo" to="/">
        <img src={IconImage} alt="home" />
      </Link>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setExpanded(expanded ? false : "expanded")}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto links-wrapper">
          <Link to="/" onClick={closeNav}>
            Home
          </Link>
          <Link to="/about" onClick={closeNav}>
            About
          </Link>
          <Link to="/players" onClick={closeNav}>
            Players
          </Link>
          <Link to="/gallery" onClick={closeNav}>
            Gallery
          </Link>
          <Link to="/schedule" onClick={closeNav}>
            Schedule
          </Link>
          <Link to="/contact-us" onClick={closeNav}>
            Contact Us
          </Link>
          <Link to="/admin" onClick={closeNav}>
            Admin
          </Link>
          {props.auth.uid && (
            <Fragment>
              <button className="btn btn-link" onClick={props.logout}>
                Logout
              </button>
              <span className="user-initials"></span>
            </Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default withRouter(
  connect(mapStateToProps, {
    logout,
  })(Header)
);
