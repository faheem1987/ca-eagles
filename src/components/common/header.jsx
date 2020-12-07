import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { logout } from "../../store/login/login.actions";
import IconImage from "../../assets/icon192x192.png";

const Header = (props) => {
  return (
    <Navbar bg="" expand="lg" className="header">
      <Link className="logo" to="/">
        <img src={IconImage} alt="home" />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto links-wrapper">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/players">Players</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/results">Results</Link>
          <Link to="/schedule">Schedule</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/admin">Admin</Link>
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

// const Header = (props) => {
//   return (
//     <Navbar bg="" expand="lg" className="header">
//       <Link className="logo" to="/">
//         <img src={IconImage} alt="home" />
//       </Link>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="ml-auto">
//           <Link to="/">Home</Link>
//           <Link to="/about">About</Link>
//           <Link to="/players">Players</Link>
//           <Link to="/gallery">Gallery</Link>
//           <Link to="/results">Results</Link>
//           <Link to="/schedule">Schedule</Link>
//           <Link to="/admin">Admin</Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps, {
  logout,
})(Header);
