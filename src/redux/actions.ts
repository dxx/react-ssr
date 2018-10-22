import { SET_CLIENT_LOAD, SET_TOP_LIST, SET_TOP_DETAIL } from "./actionTypes";
import { getTopList, getTopDetail } from "../api";

export function setClientLoad(clientShouldLoad) {
  return { type: SET_CLIENT_LOAD, clientShouldLoad };
}

export function setTopList(topList) {
  return { type: SET_TOP_LIST, topList };
}

export function setTopDetail(topDetail) {
  return { type: SET_TOP_DETAIL, topDetail };
}

export function fatchTopList() {
  // dispatch由thunkMiddleware传入
  return (dispatch, getState) => {
    return getTopList().then((response) => {
      const data = response.data;
      if (data.code === 0) {
        // 获取数据后dispatch，存入store
        dispatch(setTopList(data.data.topList));
      }
      if (process.env.REACT_ENV === "server") {
        dispatch(setClientLoad(false));
      }
    });
  }
}

export function fetchTopDetail(id) {
  return (dispatch, getState) => {
    return getTopDetail(id).then((response) => {
      const data = response.data;
      if (data.code === 0) {
        const topinfo = data.topinfo;
        const top = {
          id: topinfo.topID,
          name: topinfo.ListName,
          pic: topinfo.pic,
          info: topinfo.info
        };
        dispatch(setTopDetail(top));
      }
      if (process.env.REACT_ENV === "server") {
        dispatch(setClientLoad(false));
      }
    });
  }
}
