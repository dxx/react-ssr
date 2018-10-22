import NestedRoute from "./NestedRoute";
import StatusRoute from "./StatusRoute";

import Loadable from "loadable-components";

// import Bar from "../views/Bar";
// import Baz from "../views/Baz";
// import Foo from "../views/Foo";
// import TopList from "../containers/TopList";
// import TopDetail from "../containers/TopDetail";

const router = [
  {
    path: "/bar",
    component: Loadable(() => import("../views/Bar"))
  },
  {
    path: "/baz",
    component: Loadable(() => import("../views/Baz"))
  },
  {
    path: "/foo",
    component: Loadable(() => import("../views/Foo"))
  },
  {
    path: "/top-list",
    component: Loadable(() => import("../containers/TopList")),
    exact: true
  },
  {
    path: "/top-list/:id",
    component: Loadable(() => import("../containers/TopDetail"))
  }
];

export default router;

export {
  router,
  NestedRoute,
  StatusRoute
}
