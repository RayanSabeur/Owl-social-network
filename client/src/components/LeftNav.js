import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


const LeftNav = () => {
  const mystyle = {

    width: "35px",
    margin: "4px 0px 0px 5px"
  };
  const userData = useSelector((state) => state.userReducer)
let chemin = "/profile/"
    return (
        <div className="left-nav-container">
        <div className="icons">
          <div className="icons-bis">
            <NavLink to='/'  activeClassName="active-left-nav">
              <img src="../img/icons/home.svg" alt="home"/>
            </NavLink>
            <br/>
            <NavLink to='/trending' activeClassName="active-left-nav">
              <img src="../img/icons/rocket.svg" alt="home"/>
            </NavLink>
            <br/>
            <NavLink to={chemin + userData.pseudo}  activeClassName="active-left-nav">
              <img src="../img/icons/user.svg" alt="home"/>
            </NavLink>
            <br />
            <NavLink to="/messenger">
              <img src="../img/icons/enveloppe.png" style={mystyle} alt="home"/>
            </NavLink>
          </div>
        </div>
      </div>
    );
};

export default LeftNav;