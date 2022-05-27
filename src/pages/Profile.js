import React from "react";
import { Link } from "react-router-dom";
import './Profile.css';
import { defaultImgs } from "../defaultimgs";
import MessageInFeed from "../components/MessageInFeed";
import { useMoralis } from "react-moralis";
import {Helmet} from "react-helmet";
const Profile = () => {
  const { Moralis} = useMoralis();
  const user = Moralis.User.current();
  return (
    <>
    <Helmet>
          <meta charSet="utf-8" />    
          
          <meta name="description" content = "View your name and bio and selected profile picture out of your NFTs"/>
          <meta name="keywords" content = "profile, name, bio, NFT, view"/>
          
  </Helmet>
    <div className="pageIdentify">Profile</div>
    <img alt="profilebanner" id="profileBanner" className="profileBanner" src={user.attributes.banner ? user.attributes.banner : defaultImgs[1]}></img>
    <div className="pfpContainer">
      <img alt="profilepfp" id="profilePFP" className="profilePFP" src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]}></img>
      <div id="profileName" className="profileName">{user.attributes.username.slice(0, 6)}</div>
      <div className="profileWallet">{`${user.attributes.ethAddress.slice(0, 4)}...
            ${user.attributes.ethAddress.slice(38)}`}</div>
      <Link to="/settings">
          <div className="profileEdit">Edit profile</div>
      </Link>
      <div id="profileBio" className="profileBio">
      {user.attributes.bio}
      </div>
      <div className="profileTabs">
          <div className="profileTab">
          Your Messages
          </div>
      </div>
    </div>
    <MessageInFeed profile={true} other={false}  accountother=""></MessageInFeed>
    </>
  );
};
export default Profile;