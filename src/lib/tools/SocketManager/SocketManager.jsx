import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import {io} from "socket.io-client";
import { getMeWithThunk, setLoading } from "../../redux/actions";
export const socket = io(process.env.REACT_APP_SERVER_URL, {transports:["websocket"], withCredentials:true})
socket.connect()





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



const mapStateToProps = state => {
    return {
    user: state.userInfo,
    isLoading: state.isLoading
    };
  };
  
   const mapDispatchToProps = dispatch => {
    return {
      getMe: ()=> {
        dispatch(getMeWithThunk());
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