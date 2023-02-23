import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from './reducer';

export const initialState = {
  searchSettings:{
    activeAsset:"",
    cameraPos: 0,
    page: 0
  },
  garageSettings: {
    red: 255,
    green: 255,
    blue: 255,
    intensity: 1,
    light: true,
    axes:false,
    axesSize:1
  },
  activeAsset: {},
  isLoading: false,
  isGarage: true,
  showFilters: false,
  query: "",
  searchResults:[],
  userInfo: {
    _id: "",
    username: "",
    email: "",
    avatar: ""
  },
  chats: {
    active: {}, 
    list: [],
    history: []
  },
  onlineUsers:[],
  recentMessage:{
    members:[],
    sender:"",
    content:{
      text:""
    }
  }
} 

export const store = configureStore({
  /* reducer: persistedReducer, */
  reducer: reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})
