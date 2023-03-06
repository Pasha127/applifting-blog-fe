import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./logIn.css"
import { connect } from "react-redux";
import { getMeWithThunk, setLoading } from "../../lib/redux/actions";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Person } from "react-bootstrap-icons";
import Navbar from "../navbar/navbar";

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
    setLoading: (bool)=>{
        dispatch(setLoading(bool))
    }     
  };  
}; 


const LogIn = (props) => {
  const baseURL = process.env.REACT_APP_SERVER_URL
  const navigate = useNavigate()
  const goToSearch = ()=> navigate("/", {replace: true})
  const usernameRef = useRef()
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const [avatar, setAvatar] = useState(null);
  const [avatarDataURL, setAvatarDataURL] = useState({});
  const [wantLogIn, setWantLogIn] = useState(true);
  const [awaitingConnection, setAwaitingConnection] = useState(false);
  

  useEffect(()=>{
    if(awaitingConnection && !props.user._id ){const errorTimeout = setTimeout(()=>{
      tryAgainAlert()
    },10000)
    return ()=> clearTimeout(errorTimeout)}
  },[awaitingConnection])

const tryAgainAlert = ()=>{
    if(props.isLoading){alert("Something went wrong. Please try again.");
      window.location.reload();}
}

const postAvatar = async (id) =>{ 
  let formData = new FormData()
  formData.append('image', avatar)
  const options = {
    method: 'POST',
    credentials:"include",    
    body: formData
    };
    const baseEndpoint = `${baseURL}/user/avatar`
    try {    
      const response = await fetch(baseEndpoint, options);
      if (response.ok) {           
        const data = await response.json() 
        console.log(data)      
     } else {
       alert('Error Uploading Avatar')
     } 
    } catch (error) {
      console.log(error)
    }finally{console.log("submitted avatar");}
  }

const readAvatar = (e)=>{
  const file = e.target.files[0]
  setAvatar(file);
  let fileReader, isCancel = false;
      if (file) {
        fileReader = new FileReader();
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result && !isCancel) {
            setAvatarDataURL(result)
          }
        }
        fileReader.readAsDataURL(file);
      }
      return () => {
        isCancel = true;
        if (fileReader && fileReader.readyState === 1) {
          fileReader.abort();
        }
      }
}

 const postNewUser = async (postObj) => {
    props.setLoading(true)
    const options = {
        
      method: 'POST',
      credentials:'include',
          headers: {"Content-Type": "application/json",
          },
          body: JSON.stringify(postObj)
        
      };
      const baseEndpoint = `${baseURL}/user/register`
    console.log("1 submit-post")    
      try {
        const response = await fetch(baseEndpoint,options);
        if (response.ok) {           
          const data = await response.json()
          console.log(data._id);
          await postAvatar(data._id)
          console.log("2 submit-post",baseEndpoint)
          props.setLoading(false);      
          goToSearch()
       } else {
         alert('Registration Failed - Unique Email, Username and Password are Required')
         props.setLoading(false);
       } 
      } catch (error) {
        console.log(error)
      }
    }


const handleSubmit = (e) => {
    e.preventDefault()
    let postObj = null;
    if(firstNameRef && lastNameRef){
       postObj = {username: usernameRef.current.value,password: passwordRef.current.value,email:emailRef.current.value.toLowerCase(), firstName:firstNameRef.current.value, lastName:lastNameRef.current.value}
    }
    if(!firstNameRef && lastNameRef){
       postObj = {username: usernameRef.current.value,password: passwordRef.current.value,email:emailRef.current.value.toLowerCase(),lastName:lastNameRef.current.value}
    }
    if(firstNameRef && !lastNameRef){
       postObj = {username: usernameRef.current.value,password: passwordRef.current.value,email:emailRef.current.value.toLowerCase(),firstName:firstNameRef.current.value}
    }
    if(!firstNameRef && !lastNameRef){
       postObj = {username: usernameRef.current.value,password: passwordRef.current.value,email:emailRef.current.value.toLowerCase()}
    }
/*     console.log(postObj); */
    postNewUser(postObj);

  }

const handleLogIn = async (e) =>{ 
  setAwaitingConnection(true)
  props.setLoading(true);
    e.preventDefault()
    const postObj = {password:passwordRef.current.value,email:emailRef.current.value.toLowerCase()}
    const options = {        
        method: 'PUT',
        credentials:'include',
            headers: {"Content-Type": "application/json",
            },
            body: JSON.stringify(postObj)          
        };
        const baseEndpoint = `${baseURL}/user/login`
        try {     
          const response = await fetch(baseEndpoint,options);
          if (response.ok) {           
            const data = await response.json()
            props.setLoading(false);
            props.getMe()
            goToSearch()
     /*        console.log(data._id);   */
         } else {
           alert('Username, Password or Both Invalid')
           window.location.reload()
           props.setLoading(false);
         } 
        } catch (error) {
          console.log(error)
        }
    
}



  return (<> 
    <Navbar/>   
    <div className="background-gears gear2"></div>
    <div className="background-gears gear3"></div>
    <div className="background-gears gear4"></div>
    <div className="background-gears gear5"></div>
    <Container className="new-blog-container mt-0">      
      {wantLogIn? 
      <div className="log-in-box holo-blue-alpha-bg">
        <Form>
        <div className="login-logo" onClick={goToSearch}></div>
        <Form.Group controlId="Email" className="mt-1 col-12">
            <Form.Label>Email</Form.Label>
          <Form.Control size="lg" placeholder="Email" ref={emailRef} />
            </Form.Group>
            <Form.Group controlId="Password" className="mt-1  col-12">
          <Form.Label>Password</Form.Label>
          <Form.Control size="lg" type="password" placeholder="Password" ref={passwordRef} />
          </Form.Group> 
            <Form.Group className="mt-4 mb-1  col-12 justify-content-around d-flex">
        <Button className="holo-blue-btn w-120" variant="primary"
        onClick={(e) => {handleLogIn(e);}}
        type="submit"
        size="lg"
        >
            Log-In
          </Button>
        <Button
          className=" w-120"
            onClick={(e) => setWantLogIn(false)}
            size="lg"
            variant="outline-secondary"         
            >
            Register
          </Button>
          </Form.Group>
        </Form>
      </div>
      
      :<Form className="mt-5 register-box holo-blue-alpha-bg">       
          <div className="d-flex justify-content-center">
            <div className="p-0 d-flex pic-space">
        <label className="uploaded-pic" htmlFor="avatarUploadBtn">{!avatar ? <Person/>:<img className="uploaded-pic" src={avatarDataURL} alt="avatar"/>}</label>
                          <input type="file" className="d-none" id="avatarUploadBtn"
                          onChange={(e)=>{readAvatar(e)}}></input>
                          </div>
                          </div>        
        <Form.Group controlId="Username" className="mt-1 col-12">
          <Form.Label>Username</Form.Label>
          <Form.Control size="lg" placeholder="Username" ref={usernameRef} />
        </Form.Group>         
        <Form.Group controlId="Password" className="mt-1  col-12">
          <Form.Label>Password</Form.Label>
          <Form.Control size="lg" type="password" placeholder="Password" ref={passwordRef} />
          </Form.Group>         
        <Form.Group controlId="email" className="mt-1  col-12">
          <Form.Label>E-mail</Form.Label>
          <Form.Control size="lg" placeholder="E-mail" ref={emailRef} />
          </Form.Group>         
        <Form.Group controlId="Given Name" className="mt-1  col-12">
          <Form.Label>Given Name</Form.Label>
          <Form.Control size="lg" placeholder="GivenName" ref={firstNameRef}/>
          </Form.Group>         
        <Form.Group controlId="Surname" className="mt-1  col-12">
          <Form.Label>Surname</Form.Label>
          <Form.Control size="lg" placeholder="Surname" ref={lastNameRef} />
          </Form.Group>         
          <Form.Group className="mt-4 mb-1  col-12 justify-content-around d-flex">
        <Button 
        className="w-120"
        size="lg" 
        variant="outline-secondary" 
        onClick={(e) => setWantLogIn(true)}>
        Back
          </Button>
        <Button
        className="holo-blue-btn w-120" 
            onClick={(e) => handleSubmit(e)}
            type="submit"
            size="lg"
            variant="primary"
            >
            Register
          </Button>
          </Form.Group>         
      </Form>}
    
    <div className="d-flex flex-wrap justify-content-center mt-5">
    <a href={`${process.env.REACT_APP_SERVER_URL}/user/googleLogin`}>
    <Button
            onClick={()=>{
              /* props.getMe(); */
            }}
            className="oauth-button holo-blue-btn"
            size="lg"
            variant="primary"            
            >
                <img className="mr-1 mt-n1" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4="></img>
            Sign in with Google
          </Button></a>

        
    </div>
    </Container>
              </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
