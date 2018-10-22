import { combineReducers } from "redux";
import * as ActionTypes from "./actionTypes";

const initialState = {
  clientShouldLoad: true,
  topList: [],
  topDetail: {}
}

function clientShouldLoad(shouldLoad = initialState.clientShouldLoad, action) {
  switch (action.type) {
    case ActionTypes.SET_CLIENT_LOAD:
      return action.clientShouldLoad;
    default:
      return shouldLoad;
  }
}

function topList(list = initialState.topList, action) {
  switch (action.type) {
    case ActionTypes.SET_TOP_LIST:
      return action.topList;
    default:
      return list;
  }
}

function topDetail(detail = initialState.topDetail, action) {
  switch (action.type) {
    case ActionTypes.SET_TOP_DETAIL:
      return action.topDetail;
    default:
      return detail;
  }
}

const reducer = combineReducers({
  clientShouldLoad,
  topList,
  topDetail
});

export default reducer;
