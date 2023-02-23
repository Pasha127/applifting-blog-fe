import { initialState } from "./store";
import {LOADING, SETTINGS, SET_RESULTS, SET_ASSET, SEARCH_SETTINGS, GARAGE, FILTERS, SEARCH,SET_USER_INFO,SET_CHATS,SET_ACTIVE_CHAT,SET_HISTORY,NEW_MESSAGE, SET_ONLINE, SET_RECENT_MSG } from "./actions";
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case LOADING:
        return {
          ...state,
          isLoading: action.payload        
        };        
      case SETTINGS:
        return {
          ...state,
          garageSettings: {...state.garageSettings, ...action.payload}        
        };        
      case SEARCH_SETTINGS:
        return {
          ...state,
          searchSettings: {...state.searchSettings, ...action.payload}        
        };        
      case GARAGE:
        return {
          ...state,
          isGarage: action.payload        
        };        
      case FILTERS:
        return {
          ...state,
          showFilters: action.payload        
        };        
      case SEARCH:
        return {
          ...state,
          query: action.payload        
        };        
      case SET_RESULTS:
        return {
          ...state,
          searchResults: action.payload        
        };        
      case SET_USER_INFO:
        return {
          ...state,
          userInfo: action.payload        
        };        
      case SET_CHATS:
        return {
          ...state,
          chats: {active:state.chats.active, list:action.payload}        
        };        
      case SET_ASSET:
        return {
          ...state,
          activeAsset: action.payload        
        };        
        
      case SET_ACTIVE_CHAT:
        return {
          ...state,
          chats: {active:action.payload, list:state.chats.list}        
        };        
      case SET_HISTORY:
        return {
          ...state,
          chats: {...state.chats, list:action.payload}     
        };                
      case NEW_MESSAGE:
        return {
          ...state,
          chats: {active:action.payload.chatId,list:[...state.chats.list,action.payload.message]}        
        };        
      case SET_ONLINE:
        return {
          ...state,
          onlineUsers: [...action.payload]       
        };        
      case SET_RECENT_MSG:
        return {
          ...state,
          recentMessage: action.payload       
        };        
     
      default:
        return state; 
    }
  };
export default reducer;