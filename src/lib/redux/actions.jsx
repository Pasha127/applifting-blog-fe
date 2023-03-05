import axios from "axios";
const baseURL = process.env.REACT_APP_SERVER_URL

export const LOADING = "LOADING";
export const SEARCH = "SEARCH";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_RESULTS = "SET_RESULTS";

export const setLoading =isLoading =>({       // action creator for LOADING
    type:LOADING,
    payload: isLoading
  });

export const setSearch =query =>({           // action creator for SEARCH
    type:SEARCH,
    payload: query
  });
export const setSearchResults =result =>({   // action creator for SET_RESULTS
    type:SET_RESULTS,
    payload: result
  });
export const setUserInfo = user =>({        // action creator for SET_USER_INFO
    type: SET_USER_INFO,
    payload: user
});





export const getMeWithThunk = () =>{                                                   // get user info from server
      return async (dispatch, getState) =>{
        try{
      const response = await axios.get(`${baseURL}/user/me`, {withCredentials:true})   // withCredentials:true is required for JWT Auth
      if (response.ok) {
        const data = await response.json()                                             // get the data from the response
        dispatch(setUserInfo(data[0]));                                                // dispatch the action to set the user info
        localStorage.setItem("loggedIn", true)                                         // set the local storage to logged in
      } else {
        dispatch(logOutWithThunk()); 
        console.log("error in get me");                                                // log failure
      } 
    }catch(error){
      console.log("error in get me", error, error.response);                           // log the error
    }
}
}


export const getSearchResultsWithThunk = (query="", queryOptions="limit=10&skip=0") =>{   // get search results from server
      let endpoint = "";                                                                  // set the endpoint to empty string
      if(query) endpoint = `${baseURL}/asset/search/${query}?${queryOptions}`             // if there is a query, set the endpoint to sort with query options
      if(!query) endpoint = `${baseURL}/asset?sort=createdAt`                             // if there is no query, set the endpoint to sort by createdAt

      return async (dispatch, getState) =>{                                               

        const response = await axios.get(endpoint);                                      // get the response from the server
       /*  console.log("test get me", response); */
      if (response.ok) {                                                                // check if the response is ok
        const data = await response.json()                                              // get the data from the response
        console.log("returned search results:", data)                                   // log the data
        dispatch(setSearchResults(data))                                               // dispatch the action to set the search results
                   
      } else {
        alert("Error while searching. Please try again.")                             // log failure
      }             
    }
}

export const logOutWithThunk = () =>{                                                  // log out user
      const endpoint = `${baseURL}/user/logout`                                       // set the endpoint to logout
      return async (dispatch, getState) =>{ 
        try{
      const response = await axios.put(endpoint);                                    //send log out request to the server 
      if (response.ok) {                                                             // check if the response is ok
        const data = await response.json()                                          // get the data from the response
        console.log("logged out", data)                                             // log the data
      } else {
        console.log("error logging out")                                            // log failure
      }
    }catch(error){
      console.log(error)                                                           // log the error
    };
    dispatch(setUserInfo({}));                                                     // dispatch the action to client side user info with empty object
    localStorage.removeItem("loggedIn")                                            // remove the local storage log in check
}}

export const logInWithThunk =  (email, password) =>{                               // log in user
      const endpoint = `${baseURL}/user/login`                                     // set the endpoint to login
      return async (dispatch, getState) =>{  
        try{
      const response = await axios.post(endpoint, {email,password});             // send the login request to the server
      if (response.ok) {                                                         // check if the response is ok
        const data = await response.json()                                       // get the data from the response
        dispatch(setUserInfo(data));                                             // dispatch the action to set the user info
      } else {
        console.log("Error logging in.")                                         // log failure
      }
    }catch(error){
      console.log(error)                                                         // log the error
    }           
}}

export const registerWithThunk =  (newUserData) =>{                               // register new user
      const endpoint = `${baseURL}/user/register`                                 // set the endpoint to register 
      return async (dispatch, getState) =>{ 
        try{
      const response = await axios.post(endpoint, {newUserData});                 // send the register request to the server
      if (response.ok) {                                                          // check if the response is ok
        const data = await response.json()                                       // get the data from the response
        dispatch(setUserInfo(data));                                            // dispatch the action to set the user info
      } else {
        console.log("error logging out")                                      // log failure
      }
    }catch(error){
      console.log(error)                                                      // log the error
    }finally{window.location.reload()}                                        // reload the page           
}}


 export const sendCommentWithThunk =  (comment,id) =>{                           // send comment to server
        const endpoint = `${baseURL}/comment/${id}`                            // set the endpoint to send comment
        return async (dispatch, getState) =>{
          try{
          console.log("sentComment",comment,id)                              // log the comment and id
        const response = await axios.post(endpoint, {comment});              // send the comment to the server
        if (response.ok) {                                                 // check if the response is ok
          const data = await response.json()                             // get the data from the response
          console.log(data);                                           // log the data
        } else {
          console.log("error uploading comment")                     // log failure
        }
      }catch(error){
        console.log(error)                                            // log the error
      }
}}
  