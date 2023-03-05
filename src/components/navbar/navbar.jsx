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
    <Navbar expand="lg" fixed="top">
     
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
      
    </Navbar>
  </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralNavBar);
