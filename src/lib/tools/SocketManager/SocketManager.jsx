import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import {io} from "socket.io-client";
import { getMeWithThunk, setActiveChat, setLoading, setOnline, setRecentMsg } from "../../lib/redux/actions";
export const socket = io(process.env.REACT_APP_SERVER_URL, {transports:["websocket"], withCredentials:true})
socket.connect()



export const joinRoom = (otherId, relevantChat) =>{ 
    /*  console.log("person to join: ", otherId); */
     socket.emit("joinRoom", {chatRoomId:relevantChat._id})
   }

export const emitLogOut = ()=>{
    socket.emit("logOut");
  }

export const sendInitialMessage = (user, otherUser) => {
    /* console.log("initial members",[user,otherUser]) */
    socket.emit("setUsername", {_id:user._id, username: user.email.split("@")[0] })
    const newMessage= {
    "members": [user._id,otherUser._id],
    "message":
    {"sender": user,
    "content":{
      "text": `${user.email.split("@")[0]} has started a chat with you!`,
      "media": "imageURLGoesHere"
          }
        }      
      }
      socket.emit("sendMessage", { message: newMessage }) 
    }

export const submitUsername = (userId, emailAddress) => {
   /*  console.log("Submission",userId,emailAddress); */
    socket.emit("setUsername", {_id:userId, username: emailAddress.split("@")[0] })
}

const mapStateToProps = state => {
    return {
    user: state.userInfo,
    activeChat: state.chats.active,
    onlineUsers: state.onlineUsers,
    messageHistory: state.chats.active.messages,
    isLoading: state.isLoading
    };
  };
  
   const mapDispatchToProps = dispatch => {
    return {
      getMe: ()=> {
        dispatch(getMeWithThunk());
      },
      setUsersRedux: (users)=> {
        dispatch(setOnline(users));
      },
      setReduxChatHistory: (chat)=>{
        dispatch(setActiveChat(chat))
      },                  
      setRecentMesg: (chat)=>{
        dispatch(setRecentMsg(chat))
      },
      setLoading: (loadBool)=>{
        dispatch(setLoading(loadBool))
      }                  
    };  
}; 

const SocketManager = (props)=>{
        const location = useLocation()
        useEffect(() => {
          props.getMe()
        }, []);
        useEffect(()=>{
          const {_id,email} = props.user
            props.setUsersRedux(["TESING"]);
             /* console.log('sent userdata',_id,email)  */
            props.user._id && submitUsername(_id,email)   
            socket.on("welcome", welcomeMessage => {
             /* console.log(welcomeMessage);  */
              
            });
        },[props.user._id])

        useEffect(() => {
            socket.on("listUpdate", onlineUsersList => {
                /* console.log("New user online: ", onlineUsersList); */
              props.setUsersRedux(onlineUsersList);
            });
        }, [socket]);

        return(<>
        
        </>)
    }

    export default connect(mapStateToProps, mapDispatchToProps)(SocketManager);