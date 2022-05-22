import React from "react";
import './MessageInFeed.css';
import {defaultImgs} from "../defaultimgs"
import {Icon} from "web3uikit"
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
const MessageInFeed = ({profile}) => {
  const [MessageArr, setMessageArr] = useState();
  const {Moralis, account} = useMoralis();
  
  useEffect(() => {
    
    async function getMessages() {
      try {
        let queriy = new Moralis.Query('Messages');
        let messageget = await queriy.subscribe();
        messageget.on('create', (object) => {
          getMessages()
        });
        const Messages = Moralis.Object.extend("Messages");
        const query = new Moralis.Query(Messages);
        if (profile) {
          query.equalTo("senderAcc", account);
        }
        const results = await query.find();
        setMessageArr(results);
      } catch (error) {
        console.error(error);
      }
    }
    getMessages();
  }, [profile]);
  
  return (
    <>
    {MessageArr?.map((e) => {
        return (
          <>
            <div className="feedEva">
              <img src={e.attributes.senderPfp ? e.attributes.senderPfp : defaultImgs[0]} className="profilePic"></img>
              <div className="completeEva">
                <div className="who">
                {e.attributes.senderUsername.slice(0, 6)}
                  <div className="accWhen">{
                        `${e.attributes.senderAcc.slice(0, 4)}...${e.attributes.senderAcc.slice(38)} · 
                        ${e.attributes.createdAt.toLocaleString('en-us', { month: 'short' })}  
                        ${e.attributes.createdAt.toLocaleString('en-us', { day: 'numeric' })}
                        `  
                      }
                      </div>
                </div>
                <div className="evaContent">
                {e.attributes.messageTxt}
                {e.attributes.messageImg && (
                        <img
                          src={e.attributes.messageImg}
                          className="evaImg"
                        ></img>
                      )}
                </div>
                <div className="interactions">
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
                  </div>
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="star" />
                  </div>
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="matic" />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }).reverse()}
    </>
  );
};
export default MessageInFeed;

