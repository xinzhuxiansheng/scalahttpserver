/*
	该文件用于汇总所有的reducer为一个总的reducer
*/
//引入combineReducers，用于汇总多个reducer
import {combineReducers} from 'redux'
import navReducer from "./nav";
import fileListTableReducer from "./fileListTable";

//汇总所有的reducer变为一个总的reducer
export default combineReducers({
  navReducer,
  fileListTableReducer,
})
