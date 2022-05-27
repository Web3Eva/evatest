import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import Profileothers from "./pages/Profileothers"
import eva from "./Eva.png";
import "./App.css";
import {useMoralis} from "react-moralis"
import { ConnectButton} from "web3uikit";
import ReactGA from 'react-ga';
const App = () => {
  const {isAuthenticated} = useMoralis()
  document.title = "Eva"
  const TRACKING_ID = "UA-228923279-2"; 
  ReactGA.initialize(TRACKING_ID);
  return (
    <>        
      {isAuthenticated ? (
      
        <div className="page">
          <div id="creatememe"  style={{zIndex: 6, width: "1566.72px",height: "721.2px",backgroundColor: "rgb(0,0,0,0.6)",position: "fixed",top: 0,display: "none",justifyContent: "center",alignItems: "center"}}>
            <div id="uploadcreatememe" style={{width: 700, height: 550, borderRadius: 24, backgroundColor: "white",}}>
                <div id="closecreatememe" style={{color: "black", position: "fixed", display: "block",justifyContent:"right",  paddingLeft: "290",transform: "rotate(45deg)",fontWeight: "bold",fontSize: 40}}>+</div>
                <h1 style={{textAlign: "center", fontFamily:" Roboto", marginTop: 30}}>Create A Meme</h1>
            </div>
        </div>
        <h1 style={{display:"none"}}>Share, Connect, Memes, Eva, Family, Friends, Share memes, Funny memes, Web3, Share funny memes,  </h1>
        <div className="sideBar"> 
            <Sidebar />
          </div>
            <div className="mainWindow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profileothers" element={<Profileothers />} />
                

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
