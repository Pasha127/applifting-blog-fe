import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { Link} from "react-router-dom";
import logo from "../../lib/assets/UpShiba.png";
import { connect } from "react-redux";
import "./navbar.css";
import { logOutWithThunk } from "../../lib/redux/actions";
import UserDropdown from "../userDropdown/UserDropdown";
const mapStateToProps = state => {
  return {
    user: state.userInfo
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    logOut: ()=> {
      dispatch(logOutWithThunk());
    }    
  };  
}; 
const GeneralNavBar = (props) => {
/*   const navigate = useNavigate(); */
/*   const goToChat = () => navigate("/Chat") */

  return (<>
    <Navbar expand="lg" className="search-navbar" fixed="top">
      <div className="nav-container">
        <div className="nav-left">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        </div>
        <div className="page-nav">
        <Button className="filters-btn holo-nav-btn" variant="primary" 
          onClick={()=>props.setFilters(!props.showFilters)}
          ></Button>
        {props.user?._id && <div className="user-only-nav">
        <Button className="garage-btn holo-nav-btn" variant="primary" 
          onClick={()=>{}}                                                    //must add functionality
          >Garage</Button>
        <Button className="chat-btn holo-nav-btn" variant="primary" 
          onClick={()=>{}}                                                   //must add functionality
          >Chat</Button>
          </div>}
          </div>
        <div className="hamburger-zone">
          <UserDropdown/>
        </div>
      </div>
    </Navbar>
  </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralNavBar);
