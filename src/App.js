import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import eva from "./Eva.png";
import "./App.css";
import {useMoralis} from "react-moralis"
import { ConnectButton} from "web3uikit";


const App = () => {

  const {isAuthenticated} = useMoralis()


  return (
    <>
      {isAuthenticated ? (
        <div className="page">
        <div className="sideBar"> 
            <Sidebar />
          </div>
            <div className="mainWindow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
            <div className="rightBar"> 
              <Rightbar />
            </div>
          </div>

      ) : (
        <div className="loginPage">
          <div className="logindiv">
            <img className="logoimage" src={eva} alt="Logo"></img><br></br>
            <ConnectButton />
          </div>
          
        </div>
      )}
      
    </>
  );
};

export default App;
