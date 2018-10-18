import axios from "axios";
import jsonp from "jsonp";

const topListUrl = "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg";
const topDetailUrl = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?&type=top";

function getTopList() {
  if (process.env.REACT_ENV === "server") {
    return axios.get(topListUrl + "?format=json");
  } else {
    // 客户端使用jsonp请求
    return new Promise((resolve, reject) => {
      jsonp(topListUrl + "?format=jsonp", {
        param: "jsonpCallback",
        prefix: "callback"
      }, (err, data) => {
        if (!err) {
          const response = {};
          response.data = data;
          resolve(response);
        } else {
          reject(err);
        }
      });
    });
  }
}

function getTopDetail(id) {
  if (process.env.REACT_ENV === "server") {
    return axios.get(topDetailUrl + "&format=json&topid=" + id);
  } else {
    return new Promise((resolve, reject) => {
      jsonp(topDetailUrl + "&format=jsonp&topid=" + id, {
        param: "jsonpCallback",
        prefix: "callback"
      }, (err, data) => {
        if (!err) {
          const response = {};
          response.data = data;
          resolve(response);
        } else {
          reject(err);
        }
      });
    });
  }
}

export {
  getTopList,
  getTopDetail
}
