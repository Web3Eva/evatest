import React from "react";
import "./Home.css";
import {defaultImgs} from "../defaultimgs"
import { Icon} from "web3uikit";
import {useState, useRef} from "react";
import MessageInFeed from "../components/MessageInFeed"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import {Helmet} from "react-helmet"; 
const Home = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [message, setMessage] = useState();
  const [inputStr, setInputStr] = useState('');
 async function maticSend() {
   if(!message){
     message = " "
   }
   let img;
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    }else{
      img = "No Img"
    }
    let options = {
      contractAddress: "0xee8530268768C1f20A42b4B43e38e2469b651d1D",
      functionName: "sendMessage",
      abi:[{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "MessageTxt",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "MessageImage",
            "type": "string"
          }
        ],
        "name": "messageSent",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "MessageTxt",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "MessageImage",
            "type": "string"
          }
        ],
        "name": "sendMessage",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }], 
      params: {
        MessageTxt:message,
        MessageImage: img,
      },
      msgValue: Moralis.Units.ETH(1),
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        saveMessage();
      },
      onError: (error) => {
        alert(error.data.message)
      }
    });
 }
  async function saveMessage() {
    
    setInputStr(message)
    const Messages = Moralis.Object.extend("Messages");
    const newMessage = new Messages;
    var acl = new Moralis.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    newMessage.set("messageTxt", message)
    newMessage.set("senderPfp", user.attributes.pfp);
    newMessage.set("senderAcc", user.attributes.ethAddress);
    newMessage.set("senderUsername", user.attributes.username);
    newMessage.set("ACL", acl)
    newMessage.set("likes", 0)
    newMessage.set("likelist", "")
    newMessage.set("rating", 10000000000000 -  timestamp)
    if(theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newMessage.set("messageImg", file.ipfs());
    }
    await newMessage.save();
    window.location.reload();
  }
  const onImageClick = () => {
    inputFile.current.click();
  };
  const opencreate = () => {
    document.getElementById("creatememe").style.display = "flex"
  }
  const changeHandler = (event) =>{
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img))
  }
  return (
    <>
    <Helmet>
          <meta charSet="utf-8" />    
         
          <meta name="description" content = "Connect with friends and family with the power of Memes. Share memes, grow your status and become the meme lord!"/>
          <meta name="keywords" content = "connect, friends, family, share, memes"/>
  </Helmet>
    <div className="pageIdentify">Home</div>
      <div className="mainContent">
       
        <div className="profileEva">
          <img src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} className="profilePic" alt="profilepic"></img>
          <div className="evaBox">
            <textArea  label="" id="tweetTxtArea" name="tweetTxtArea" value={inputStr} onChange={(e) => setMessage(e.target.value)} placeholder="Start a message!" type="text" width="100%" style={{backgroundColor: "transparent", fontSize: 20, fontFamily: "Arial, Helvetica, sans-serif", resize: "none", color:"white", border: "none",outline: "none", paddingLeft:"20px"}}></textArea>
              {selectedFile && (
                <img src={selectedFile} className="evaImg"></img>
              )}
            <div className="imgOrEva">
              <div className="imgDiv" onClick={onImageClick}>
                <input
                  type="file"
                  name = "file"
                  ref={inputFile}
                  onChange={changeHandler}
                  style={{display:"none"}}
                />
                <Icon fill="#1DA1F2" size={20} svg="image"></Icon>
              </div><div>
    </div>
   
              <div className="evaOptions">
                  <div className="eva" onClick={saveMessage}>Send</div>
                  <div className="eva" onClick={opencreate}>Create</div>
                  <div className="eva" onClick={maticSend} style={{backgroundColor:"#8247e5"}}><Icon fill="#ffffff" size={20} svg="matic"></Icon></div>
                  
              </div>
            </div>
          </div>
        </div>
        
        
        <MessageInFeed profile={false} other={false}  accountother=""/>
      </div>
    </>
  );
};
export default Home;
