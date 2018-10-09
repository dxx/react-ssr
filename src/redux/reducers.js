import { combineReducers } from "redux";
import * as ActionTypes from "./actionTypes";

const initialState = {
  clientShouldLoad: true,
  topList: [],
  topDetail: {}
}

function clientShouldLoad(clientShouldLoad = initialState.clientShouldLoad, action) {
  switch (action.type) {
    case ActionTypes.SET_CLIENT_LOAD:
      return action.clientShouldLoad;
    default:
      return clientShouldLoad;
  }
}

function topList(topList = initialState.topList, action) {
  switch (action.type) {
    case ActionTypes.SET_TOP_LIST:
      return action.topList;
    default:
      return topList;
  }
}

function topDetail(topDetail = initialState.topDetail, action) {
  switch (action.type) {
    case ActionTypes.SET_TOP_DETAIL:
      return action.topDetail;
    default:
      return topDetail;
  }
}

const reducer = combineReducers({
  clientShouldLoad,
  topList,
  topDetail
});

export default reducer;
