import NestedRoute from "./NestedRoute";
import StatusRoute from "./StatusRoute";
import { fatchTopList, fetchTopDetail } from "../redux/actions";

import Loadable from "react-loadable";

// import Bar from "../views/Bar";
// import Baz from "../views/Baz";
// import Foo from "../views/Foo";
// import TopList from "../containers/TopList";
// import TopDetail from "../containers/TopDetail";

const loading = () => null;

const router = [
  {
    path: "/bar",
    component: Loadable({
      loader: () => import("../views/Bar"),
      loading
    })
  },
  {
    path: "/baz",
    component: Loadable({
      loader: () => import("../views/Baz"),
      loading
    })
  },
  {
    path: "/foo",
    component: Loadable({
      loader: () => import("../views/Foo"),
      loading
    })
  },
  {
    path: "/top-list",
    component: Loadable({
      loader: () => import("../containers/TopList"),
      loading
    }),
    exact: true,
    asyncData(store) {
      return store.dispatch(fatchTopList());
    }
  },
  {
    path: "/top-list/:id",
    component: Loadable({
      loader: () => import("../containers/TopDetail"),
      loading
    }),
    asyncData(store, params) {
      return store.dispatch(fetchTopDetail(params.id));
    }
  }
];

export default router;

export {
  router,
  NestedRoute,
  StatusRoute
}
