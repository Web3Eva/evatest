import React from "react";
import './Rightbar.css';
import { useMoralis } from "react-moralis";
import { defaultImgs } from "../defaultimgs";
const Rightbar = () => {
  const { Moralis} = useMoralis();
  const user = Moralis.User.current();
  const trends = [
   /* {
      img: spaceshooter,
      text: "Learn how to build a Web3 FPS game using unity...",
      link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-space-fps-game/",
    },
    {
      img: netflix,
      text: "The fisrt Moralis Project! Let's Netflix and chill...",
      link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-netflix-clone/",
    },
    {
      img: academy,
      text: "Master DeFi in 2022. Start  at the Moralis Academy...",
      link: "https://academy.moralis.io/courses/defi-101",
    },
    {
      img: js,
      text: "Become a Web3 Developer with just simple JS...",
      link: "https://academy.moralis.io/all-courses",
    },*/
  ];
  return (
    <>
    <div className="rightbarContent">
    <div className="details">
          <img id="profileimgo" src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} className="profilePic"></img>
          <div className="profile">
            <div className="who">
              {user.attributes.username.slice(0, 6)}
            </div>
            <div className="accWhen">
              {`${user.attributes.ethAddress.slice(0, 4)}...${user.attributes.ethAddress.slice(38)}`}
            </div>
          </div>
        </div>
      <div className="trends" >
        Coming Soon!
        {trends.map((e)=> {
          return(
            <>
            <div className="trend" onClick={() => window.open(e.link)}>
              <img src={e.img} className="trendImg"></img>
              <div className="trendTxt">{e.text}</div>
            </div>
            </>
          )
        })}
      </div>
    </div>
    </>
  );
};

export default Rightbar;

