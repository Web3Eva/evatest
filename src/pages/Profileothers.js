import React from "react";
import './Profile.css';
import { useState } from "react";
import { defaultImgs } from "../defaultimgs";
import MessageInFeed from "../components/MessageInFeed";
import { useMoralis } from "react-moralis";
const Profileothers = () => {
  const { Moralis} = useMoralis();
  const [results, setresults] = useState();
  async function getuser(){
    const query = new Moralis.Query("_User")
    query.equalTo("ethAddress",localStorage.getItem("chp"))
    const resultsi = await query.find()
    setresults(resultsi);
   
  }
  getuser()
  
  
  return (
    <>
    {results?.map((e) => {
        return (
            <>
            <div className="pageIdentify">Profile</div>
            <img alt="profilebanner" id="profileBanner" className="profileBanner" src={e.attributes.banner ? e.attributes.banner : defaultImgs[1]}></img>
            <div className="pfpContainer">
              <img alt="profilepfp" id="profilePFP" className="profilePFP" src={e.attributes.pfp ? e.attributes.pfp : defaultImgs[0]}></img>
              <div id="profileName" className="profileName">{e.attributes.username.slice(0, 6)}</div>
              <div className="profileWallet">{`${e.attributes.ethAddress.slice(0, 4)}...
                    ${e.attributes.ethAddress.slice(38)}`}</div>
             
              <div id="profileBio" className="profileBio">
              {e.attributes.bio}
              </div>
              <div className="profileTabs">
                  <div className="profileTab">
                  Their Messages
                  </div>
              </div>
            </div>
            <MessageInFeed profile={false} other={true}  accountother={e.attributes.ethAddress}></MessageInFeed>
            </>
        )
    })}
    </>
  );
};
export default Profileothers;