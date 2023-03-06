import React from "react";
import { Button, Navbar} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
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
    <Navbar expand="lg" fixed="top">
     <div className="nav-container">
        <div className="nav-left">
        <Navbar.Brand className="navbar-brand" as={Link} to="/">
          <img className="navbar-brand-img" alt="logo" src={logo} />
        </Navbar.Brand>
        <NavLink to="/" className="nav-link">Recent Articles</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
        {/* <Navbar.Link as={Link} href="#home">Recent Articles</Navbar.Link> */}
    </div>
    <div className="nav-right">
      <a href="/logIn"
      style={{textDecoration:"none"}}
      >Log in →</a>
      </div>
     </div>
    </Navbar>
  </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralNavBar);
