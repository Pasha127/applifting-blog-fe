import { emitLogOut } from "../../components/SocketManager/SocketManager";

export const LOADING = "LOADING";
export const SETTINGS = "SETTINGS";
export const SEARCH_SETTINGS = "SEARCH_SETTINGS";
export const GARAGE = "GARAGE";
export const FILTERS = "FILTERS";
export const SEARCH = "SEARCH";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_ASSET = "SET_ASSET";
export const SET_CHATS = "SET_CHATS";
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";
export const SET_HISTORY = "SET_HISTORY";
export const NEW_MESSAGE = "NEW_MESSAGE";
export const SET_ONLINE = "SET_ONLINE";
export const SET_RECENT_MSG = "SET_RECENT_MSG";
export const SET_RESULTS = "SET_RESULTS";

export const setLoading =isLoading =>({
    type:LOADING,
    payload: isLoading
  });
export const setAsset = asset =>({
    type:SET_ASSET,
    payload:  asset
  });
export const setSettings =settingsData =>({
    type:SETTINGS,
    payload: settingsData
  });
export const setSearchSettings =settingsData =>({
    type:SEARCH_SETTINGS,
    payload: settingsData
  });
export const setGarage =isGarage =>({
    type:GARAGE,
    payload: isGarage
  });
export const setFilters = showFilters =>({
    type:FILTERS,
    payload: showFilters
  });
export const setSearch =query =>({
    type:SEARCH,
    payload: query
  });
export const setSearchResults =result =>({
    type:SET_RESULTS,
    payload: result
  });
export const setUserInfo = user =>({
    type: SET_USER_INFO,
    payload: user
});
export const setChats = input =>({
    type: SET_CHATS,
    payload: input
});
export const setActiveChat = input =>({
    type: SET_ACTIVE_CHAT,
    payload: input
});
export const setHistory = input =>({
    type: SET_HISTORY,
    payload: input
});
export const newMessage = input =>({
    type: NEW_MESSAGE,
    payload: input
});
export const setOnline = input =>({
    type: SET_ONLINE,
    payload: input
});
export const setRecentMsg = input =>({
    type: SET_RECENT_MSG,
    payload: input
});


export const getChatByIdWithThunk = (id) =>{
  const baseURL = process.env.REACT_APP_SERVER_URL
    const options = {
      method: 'GET' ,
      credentials:"include"
      };      
      const baseEndpoint = `${baseURL}/chat/${id}`

      return async (dispatch, getState) =>{

        const response = await fetch(baseEndpoint, options);
       /*  console.log("get chat by id: ", response); */
      if (response.ok) {
        const data = await response.json()
       /*  console.log("chat from ID: ", data); */
        dispatch(setActiveChat(data));            
      } else {
       window.location.reload()
      }             
    }
}
export const getAssetByIdWithThunk = (id) =>{
  const baseURL = process.env.REACT_APP_SERVER_URL
    const options = {
      method: 'GET' ,
      credentials:"include"
      };      
      const baseEndpoint = `${baseURL}/asset/${id}`

      return async (dispatch, getState) =>{

        const response = await fetch(baseEndpoint, options);
       /*  console.log("get asset by id: ", response); */
      if (response.ok) {
        const data = await response.json()
         console.log("asset from ID: ", data); 
        dispatch(setAsset(data));            
      } else {
        dispatch(setAsset({}))
      }             
    }
}


export const deleteChatByIdWithThunk = (id) =>{
  const baseURL = process.env.REACT_APP_SERVER_URL
    const options = {
      method: 'DELETE' ,
      credentials:"include"
      };      
      const baseEndpoint = `${baseURL}/chat/${id}`
      return async (dispatch, getState) =>{
        const response = await fetch(baseEndpoint, options);
       /*  console.log("delete chat by id: ", response); */
      if (response.ok) {
       /*  console.log("chat from ID: ", data); */
        dispatch(setActiveChat({}));            
      } else {
        alert("Error Encountered While Trying to Delete")
      }             
    }
}
export const deleteAssetByIdWithThunk = (id) =>{
  const baseURL = process.env.REACT_APP_SERVER_URL
    const options = {
      method: 'DELETE' ,
      credentials:"include"
      };      
      const baseEndpoint = `${baseURL}/asset/${id}`
      return async (dispatch, getState) =>{
        dispatch(setLoading(true))
        try{
        const response = await fetch(baseEndpoint, options);
       /*  console.log("delete chat by id: ", response); */
      if (response.ok) {
       /*  console.log("chat from ID: ", data); */
        dispatch(setAsset({}));            
      } else {
        alert("Error Encountered While Trying to Delete")
      }}
      catch(error){
        console.log(error)
      }finally{dispatch(setLoading(false)); window.location.reload()}             
    }
}

export const getMeWithThunk = () =>{
  const baseURL = process.env.REACT_APP_SERVER_URL
    const options = {
      method: 'GET' ,
      credentials:"include"
      };      
      const baseEndpoint = `${baseURL}/user/me`

      return async (dispatch, getState) =>{

        const response = await fetch(baseEndpoint, options);
       /*  console.log("test get me", response); */
      if (response.ok) {
        const data = await response.json()
        /* console.log("test resp", data); */
        dispatch(setUserInfo(data[0]));
        localStorage.setItem("loggedIn", true)            
      } else {
        dispatch(logOutWithThunk())
      }             
    }
}

export const getSearchResultsWithThunk = (query, queryOptions="limit=10&skip=0") =>{
  const baseURL = process.env.REACT_APP_SERVER_URL
    const options = {
      method: 'GET' ,
      credentials:"include"
      };
      let baseEndpoint = "";      
      if(query) baseEndpoint = `${baseURL}/asset/search/${query}?${queryOptions}`
      if(!query) baseEndpoint = `${baseURL}/asset?sort=createdAt`

      return async (dispatch, getState) =>{

        const response = await fetch(baseEndpoint, options);
       /*  console.log("test get me", response); */
      if (response.ok) {
        const data = await response.json()
        console.log("returned search results:", data)
        dispatch(setSearchResults(data))
                   
      } else {
        alert("Error while searching. Please try again.")
      }             
    }
}

export const logOutWithThunk = () =>{
  
  const baseURL = process.env.REACT_APP_SERVER_URL
    const options = {
      method: 'PUT' ,
      credentials:"include",
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',         
        } 
      };      
      const baseEndpoint = `${baseURL}/user/logout`
      return async (dispatch, getState) =>{try{
      const response = await fetch(baseEndpoint, options);
      if (response.ok) {
        
      } else {
        console.log("error logging out")
      }
    }catch(error){
      console.log(error)
    };
    emitLogOut();
    dispatch(setUserInfo({}));
    localStorage.removeItem("loggedIn")            
}}

export const logInWithThunk =  (email, password) =>{

  const baseURL = process.env.REACT_APP_SERVER_URL
    const options = {
      method: 'PUT' ,
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',         
        } ,
        body:JSON.stringify({email,password})
      };      
      const baseEndpoint = `${baseURL}/user/login`
      return async (dispatch, getState) =>{  try{
      const response = await fetch(baseEndpoint, options);
      if (response.ok) {
        const data = await response.json()
        dispatch(setUserInfo(data));
        getMeWithThunk()
      } else {
        console.log("Error logging in.")
      }
    }catch(error){
      console.log(error)
    }
    dispatch(setUserInfo({}));            
}}

export const registerWithThunk =  (newUserData) =>{
  
  const baseURL = process.env.REACT_APP_SERVER_URL
    const options = {
      method: 'POST' ,
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',         
        } ,
        body:JSON.stringify(newUserData)
      };      
      const baseEndpoint = `${baseURL}/user/register`
      return async (dispatch, getState) =>{try{
      const response = await fetch(baseEndpoint, options);
      if (response.ok) {
        const data = await response.json()
        dispatch(setUserInfo(data));
      } else {
        console.log("error logging out")
      }
    }catch(error){
      console.log(error)
    }finally{window.location.reload()}
   dispatch( setUserInfo({}));            
}}

export const getHistoryWithThunk = () => {
  const baseURL = process.env.REACT_APP_SERVER_URL
  const options = {
    method: 'GET' ,
    credentials:"include"
  };      
  const baseEndpoint = `${baseURL}/chat/me/history`
  /* console.log("fetch blogs") */
  return async (dispatch, getState) =>{
    const response = await fetch(baseEndpoint, options);
    /* console.log("test get me", response); */
    if (response.ok) {
      const data = await response.json()
      /* console.log("get all chats", data); */
      dispatch(setHistory(data))            
    } else {
      console.log("Error - Could not retrieve chats!") 
    }             
  }}
  
  export const uploadAssetWithThunk =  (assetData) =>{

    const baseURL = process.env.REACT_APP_SERVER_URL
    let formData = new FormData();
    formData.append('model', assetData.model);
    formData.append('name', assetData.name);
    formData.append('type', assetData.type);
    formData.append('poster', assetData.poster);
    formData.append('description', assetData.description);
    formData.append('keywords', assetData.keywords);
    
    const options = {
    method: 'POST',
    credentials:"include",    
    body: formData
    };   
    
    const assetEndpoint = `${baseURL}/asset`
    return async (dispatch, getState) =>{
      try {    
        const response = await fetch(assetEndpoint, options);
        if (response.ok) {           
          const data = await response.json() 
          console.log("Uploaded Asset: ", data)
          window.location= `http://www.3Depot.org/Garage?asset=${data}`
       } else {
         alert('Error Uploading Asset')
       } 
      } catch (error) {
        console.log(error)
      }finally{}
     ;            
  }}

  export const sendCommentWithThunk =  (comment,id) =>{
  
    const baseURL = process.env.REACT_APP_SERVER_URL
      const options = {
        method: 'POST' ,
        credentials:"include",
         headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',         
          } ,
          body:JSON.stringify(comment)
        };      
        const baseEndpoint = `${baseURL}/comment/${id}`
        return async (dispatch, getState) =>{try{
          console.log("sentComment",comment,id)
        const response = await fetch(baseEndpoint, options);
        if (response.ok) {
          const data = await response.json()
          console.log(data);
          dispatch(setAsset(data));
        } else {
          console.log("error uploading comment")
        }
      }catch(error){
        console.log(error)
      }
               
  }}
  