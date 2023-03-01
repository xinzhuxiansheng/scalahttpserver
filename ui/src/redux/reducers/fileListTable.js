import {UPDATE_CURRENTPATH} from "../constant";

const initState = {'currentPath': '/'}

export default function fileListTableReducer(preState = initState, action) {
  const {type, data} = action
  switch (type) {
    case UPDATE_CURRENTPATH:
      // return {keyword:data}  // TODO 重点
      preState.currentPath = data
      return preState
    default:
      return preState;
  }
}
