import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


import { logout } from '../store/login/login.actions';
import { toggleVideoUploader } from '../store/form/form.actions'


const Header = (props) => {
  const showUploader = () => props.toggleVideoUploader()
  return (
    <Navbar bg="" expand="lg" className="header">
    <Link className="logo" to="/"><img src="../assets/icon192x192.png" alt=""/></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto links-wrapper">
          <Link to="/">Home</Link>
          <Link to="/players">Players</Link>
          <Link to="/gallery">Gallery</Link>
          { props.auth.uid && 
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <Link to="/rankings">Rankings</Link>
              <a onClick={showUploader}>Video uploader</a>
            </NavDropdown>
          }
          {!props.auth.uid && 
            <Link to="/login">Login</Link>
          }
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps, {
  logout,
  toggleVideoUploader
})(Header);