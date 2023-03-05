import React from "react";
import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutWithThunk} from "../../lib/redux/actions";
import "./styles.css"

const defaultAvatar = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";


const mapStateToProps = state => {
  return {
  user: state.userInfo,
  isGarage: state.isGarage
  };
};
 const mapDispatchToProps = dispatch => {
  return {   
    logOut: ()=> {
      dispatch(logOutWithThunk());
    }     
  };  
}; 


const UserDropdown = (props)=>{
    const navigate = useNavigate();
    const goToGarage = () => navigate('/Garage');
    const goToLogin = () => navigate('/LogIn');
    const goToSearch = () => navigate('/');
    const goToChat = () => navigate('/Chat');

    const handleGarageButton = ()=>{
      props.setGarage(true);
       goToGarage()
    }
    const handleChatButton = ()=>{
      props.setGarage(true);
       goToChat()
    }
    const handlelogOut = ()=>{
      props.logOut();
       goToLogin()
    }


return(<>
    <DropdownButton
    className="dropdown-control"
key={"secondaryGroup"}
id={`dropdown-variants-light`}
drop={'left'}
as={ButtonGroup}
variant={"light"}
itemID="userDropdown"
title={<div className="drop-container">
  {props.user?._id && <img src={props.user.avatar} onError={(e)=>{e.target.src = defaultAvatar}} alt={"UserAvatar"} className="avatar"></img>}
  {!props.user?._id && <h2><List/></h2>}
  </div>}
>
  <Dropdown.Item className="responsive dropdown-custom-item" eventKey="5" onClick={goToSearch}>Home</Dropdown.Item> 
  <Dropdown.Divider className="responsive dropdown-custom-item" />
{props.user?._id &&<Dropdown.Item className="hide-when-big dropdown-custom-item" eventKey="2"onClick={handleGarageButton}>My Garage</Dropdown.Item>}
{props.user?._id &&<Dropdown.Item className="hide-when-big dropdown-custom-item" eventKey="6"onClick={handleChatButton}>Chat</Dropdown.Item>}
{/* {props.user?._id &&<Dropdown.Item className="hide-when-big dropdown-custom-item" eventKey="6"onClick={handleChatButton}>Requests</Dropdown.Item>} */}
{props.user?.role === "Admin" && <Dropdown.Divider className="hide-when-big" />}
{/* {props.user?.role === "Admin" && <Dropdown.Item className="dropdown-custom-item" eventKey="4">Back Office</Dropdown.Item> }
{props.user?._id && <Dropdown.Divider />} */}
{props.user?._id && <Dropdown.Item className="dropdown-custom-item" eventKey="1" onClick={handlelogOut}>Log Out</Dropdown.Item>}
{!props.user?._id && <Dropdown.Item className="dropdown-custom-item" eventKey="1" onClick={goToLogin}>Log In</Dropdown.Item>}
</DropdownButton>

</>)
}
export default  connect(mapStateToProps, mapDispatchToProps)(UserDropdown);