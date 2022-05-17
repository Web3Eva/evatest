import React from "react";
import './Sidebar.css';
import {Icon} from "web3uikit"
import {Link} from "react-router-dom"
import {useMoralis} from "react-moralis"
import eva from "./Eva.png";
const Sidebar = () => {

  const {Moralis} = useMoralis()
  return (
    <>

    <div className="siderContent">
        <div className="menu">

          <div className="details" >
            <img style={{width:70}} src={eva}></img>
          </div>

          <Link to="/" className="link" style={{marginTop:30}}>
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="list"/>
              Home
            </div>
          </Link>

          <Link to="/profile" className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="user"/>
              Profile
            </div>
          </Link>

          <Link to="/comingsoon" className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="stars"/>
              Status
            </div>
          </Link>

          <Link to="/settings" className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="cog"/>
              Settings
            </div>
          </Link>

          <div className="link" onClick={() => {
              Moralis.User.logOut().then(()=>{
                window.location.reload();
              })
            }}>
            <div className="menuItems">
                <Icon fill="#ffffff" size={33} svg="logOut"/>
                Logout
              </div>
          </div>

          
          
        </div>

        
      </div>
    </>
  );
};

export default Sidebar;

