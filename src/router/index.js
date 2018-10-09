import NestedRoute from "./NestedRoute";
import StatusRoute from "./StatusRoute";

import Bar from "../views/Bar";
import Baz from "../views/Baz";
import Foo from "../views/Foo";
import TopList from "../containers/TopList";
import TopDetail from "../containers/TopDetail";

const router = [
  {
    path: "/bar",
    component: Bar
  },
  {
    path: "/baz",
    component: Baz
  },
  {
    path: "/foo",
    component: Foo
  },
  {
    path: "/top-list",
    component: TopList,
    exact: true
  },
  {
    path: "/top-list/:id",
    component: TopDetail
  }
];

export default router;

export {
  router,
  NestedRoute,
  StatusRoute
}
