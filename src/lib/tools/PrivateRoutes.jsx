import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'
import { getMeWithThunk } from '../redux/actions';


const mapStateToProps = state => {
    return {
    user: state.userInfo // this is the user object from the redux store
    };
  };
  
   const mapDispatchToProps = dispatch => {
    return {
        getMe: ()=> {
            dispatch(getMeWithThunk()); // this gets the user object from the backend - called from actions.js
          }    
    };  
}; 
const PrivateRoutes = (props) => {
    useEffect(()=>{
        props.getMe() //at initial render, get the user object from the backend
      },[])
    return(
        (props.user && props.user._id) || localStorage.getItem("loggedIn") ? <Outlet/> : <Navigate to="/LogIn"/> // if the user is logged in, show the page, otherwise redirect to the login page
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoutes);