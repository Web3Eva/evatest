import React from "react";
import './MessageInFeed.css';
import {defaultImgs} from "../defaultimgs"
import {Icon} from "web3uikit"
import { Link } from "react-router-dom";
import { useMoralis} from "react-moralis";
import { useEffect, useState } from "react";
const MessageInFeed = ({profile, other,  accountother}) => {
  const [MessageArr, setMessageArr] = useState();
  const {Moralis, account} = useMoralis();
  const user = Moralis.User.current();
  let rendtrue = 0
  async function follow(id){
    if(rendtrue == 1){
      let usersend = id
      const queryt = new Moralis.Query("_User")
      if(user.attributes.ethAddress != usersend){
       queryt.equalTo("ethAddress", user.attributes.ethAddress)
       const resultst = await queryt.find()
       resultst.map((ei) =>{
         let following = ei.attributes.following
         let followinglist = following.split("§")
         if(followinglist.includes(usersend)){
           const index = followinglist.indexOf(usersend);
           if (index > -1) {
             followinglist.splice(index, 1);
           }
           user.set("following", followinglist.join("§"))
           user.save()
           for (var i=0;i<document.getElementsByName(id).length;i++){
            document.getElementsByName(id)[i].innerText="following";
            }
         }else{
           followinglist.push(usersend)
           user.set("following", followinglist.join("§"))
           user.save()
           for (var i=0;i<document.getElementsByName(id).length;i++){
            document.getElementsByName(id)[i].innerText="unfollowed";
            }
         }
       })
      }else{
        alert("Can't follow yourself!")
      }
}
    }
   setTimeout(() => {
     rendtrue = 1
   }, 1000);
   async function like(id){
    localStorage.setItem("id", id)
        const query = new Moralis.Query("Messages")
        query.equalTo("objectId",localStorage.getItem("id"))
        const results = await query.find()
        results.map((e) =>{
          let likevalue = e.attributes.likes
          let likelist = e.attributes.likelist
          let likelistsplit = likelist.split("§")
          if(likelistsplit.includes(user.attributes.ethAddress) === false){
            likevalue += 1
            likelistsplit.push(user.attributes.ethAddress)
            document.getElementById("icon" + localStorage.getItem("id")).className = "yellow"
            e.set("likes", likevalue)
            e.set("likelist", likelistsplit.join("§"))
            e.save()
          }else{
            likevalue -= 1
            const index = likelistsplit.indexOf(user.attributes.ethAddress);
            if (index > -1) {
              likelistsplit.splice(index, 1);
            }
            document.getElementById("icon" + localStorage.getItem("id")).className = "white"
            e.set("likes", likevalue)
            e.set("likelist", likelistsplit.join("§"))
            e.save() 
          }
          document.getElementById(localStorage.getItem("id")).innerText = likevalue 
    });
   
  }
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
        }else if (other == true){
          query.equalTo("senderAcc", accountother)
        }
        const results = await query.find();
        setMessageArr(results);
      } catch (error) {
        console.error(error);
      }
    }
    getMessages();
  }, [profile]);

  function prepare(id){
    localStorage.setItem("chp", id)
  }
  
        
  
  return (
    <>
    {MessageArr?.map((e) => {
        return (
          <>
            <div className="feedEva">
            <div className="container">
            <Link to="/profileothers">
              <img onClick={()=>prepare(e.attributes.senderAcc)} src={e.attributes.senderPfp ? e.attributes.senderPfp : defaultImgs[0]} className="profilePic" alt="profilepic"></img>
            </Link>
            
              <div className="middle">
                <div className="text">
                  <button name={e.attributes.senderAcc} onClick={()=>follow(e.attributes.senderAcc)} className="follow">Follow {e.attributes.senderUsername}</button>
                </div>
              </div>
            </div>

           
              <div  className="completeEva">
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
                          alt = "evaImg"
                        ></img>
                      )}
                </div>
                <div className="interactions">
                  <div className="interactionNums">
                    <Icon fill="#f5f5f5" size={20} svg="messageCircle" />
                  </div>
                  <div  onClick={() => like(e.id)} className="interactionNums">
                    <Icon id={"icon" + e.id} fill="currentColor" stroke="currentColor" size={20} svg="star" /><p style={{margin:0}} id={e.id}>{e.attributes.likes}</p>
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

