import NestedRoute from "./NestedRoute";
import StatusRoute from "./StatusRoute";

import Bar from "../views/Bar";
import Baz from "../views/Baz";
import Foo from "../views/Foo";
import TopList from "../views/TopList";

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
  }
];

export default router;

export {
  router,
  NestedRoute,
  StatusRoute
}
