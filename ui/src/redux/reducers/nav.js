import {NAV_SEARCH} from "../constant";

const initState = {'keyword': ''}

export default function navReducer(preState = initState, action) {
  const {type, data} = action
  switch (type) {
    case NAV_SEARCH:
      return {keyword:data}  // TODO 重点
      // preState.keyword = data
      // return preState
    default:
      return preState;
  }
}
