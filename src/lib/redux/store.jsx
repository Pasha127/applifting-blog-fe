import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from './reducer';

export const initialState = {
  isLoading: false, // true when loading
  query: "",        // search query
  searchResults:[], // search results
  userInfo: {       // user info from server
    _id: "",
    username: "",
    email: "",
    avatar: ""
  }
} 

export const store = configureStore({
  /* reducer: persistedReducer, */
  reducer: reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})
