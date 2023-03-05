import { initialState } from "./store";
import {LOADING, SET_RESULTS, SEARCH, SET_USER_INFO} from "./actions";
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case LOADING:                         // action.payload is the isLoading value
        return {
          ...state,
          isLoading: action.payload        
        };        
     
      case SEARCH:                          // action.payload is the query value
        return {
          ...state,
          query: action.payload        
        };        
      case SET_RESULTS:                     // action.payload is the searchResults value
        return {
          ...state,
          searchResults: action.payload        
        };        
      case SET_USER_INFO:                   // action.payload is the userInfo value
        return {
          ...state,
          userInfo: action.payload        
        };        
     
      default:
        return state; 
    }
  };
export default reducer;