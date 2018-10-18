import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducers";

// 导出函数，以便客户端和服务端根据初始state创建store
export default (store) => {
  return createStore(
    reducer,
    store,
    applyMiddleware(thunkMiddleware) // 允许store能dispatch函数
  );
}
