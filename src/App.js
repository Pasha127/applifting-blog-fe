import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LogIn from './components/log-in/logIn';
import { getMeWithThunk } from "../src/lib/redux/actions";
import PrivateRoutes from "./lib/tools/PrivateRoutes";
import SocketManager from "./components/SocketManager/SocketManager";
import Loader2D from "./components/loader/Loader2D";
import MyArticles from "./components/myArticles/MyArticles";
import CreateArticle from "./components/createArticle/CreateArticle";
import Home from "./components/home/Home";

const mapStateToProps = state => {
  return {
  user: state.userInfo,   // This is the user object which holds all the user info
  isLoading: state.isLoading // This is a boolean that is true when the app is loading
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    getMe: ()=> {
      dispatch(getMeWithThunk()); // This is the thunk that gets the user info from the server - called from actions.js
    }     
  };  
}; 



function App(props) {
  return (<>
    <Router>
    <SocketManager/> {/*  This is the component that manages the socket connection */}
      <Routes>
        <Route element={<PrivateRoutes />}> {/* // This is the component that manages the private routes */}
                <Route element={<MyArticles/>} path="/MyArticles"/> {/* // This is a private route to the MyArticles component */} 
                <Route element={<CreateArticle/>} path="/Create"/> {/* // This is a private route to the CreateArticle component */}
        </Route>
        <Route path='/' exact element={<Home/>}/> {/* // This is a public route to the landing page */}
        <Route path="/LogIn" exact element={<LogIn/>} /> {/* // This is a public route to the LogIn component */}
      </Routes>
    </Router>
    {props.isLoading && <Loader2D/>} {/* // This is the loader that is shown when the app is loading */}
     </>);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
