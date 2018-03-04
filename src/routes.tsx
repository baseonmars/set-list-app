import React from "react";

import { asyncComponent } from "@jaredpalmer/after";
import Loader from "./common/Loader";

export default [
  {
    path: "/",
    exact: true,
    component: asyncComponent({
      loader: () => import("./pages/Home"),
      Placeholder: () => <Loader />
    })
  },
  {
    path: "/setlist/make/:artist",
    exact: true,
    component: asyncComponent({
      loader: () => import("./pages/MakeSetList"),
      Placeholder: () => <Loader />
    })
  },
  {
    path: "/palette",
    exact: true,
    component: asyncComponent({
      loader: () => import("./common/styled-components/ColorPalette"),
      Placeholder: () => <Loader />
    })
  }
];
