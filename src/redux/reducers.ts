import { combineReducers } from "redux";
import * as ActionTypes from "./actionTypes";

const initialState = {
  clientShouldLoad: true,
  topList: [],
  topDetail: {}
}

function combineClientShouldLoad(clientShouldLoad = initialState.clientShouldLoad, action) {
  switch (action.type) {
    case ActionTypes.SET_CLIENT_LOAD:
      return action.clientShouldLoad;
    default:
      return clientShouldLoad;
  }
}

function combineTopList(topList = initialState.topList, action) {
  switch (action.type) {
    case ActionTypes.SET_TOP_LIST:
      return action.topList;
    default:
      return topList;
  }
}

function combineTopDetail(topDetail = initialState.topDetail, action) {
  switch (action.type) {
    case ActionTypes.SET_TOP_DETAIL:
      return action.topDetail;
    default:
      return topDetail;
  }
}

const reducer = combineReducers({
  clientShouldLoad: combineClientShouldLoad,
  topList: combineTopList,
  topDetail: combineTopDetail
});

export default reducer;
