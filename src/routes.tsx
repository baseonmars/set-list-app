import React from "react";

import { asyncComponent } from "@jaredpalmer/after";

export default [
  {
    path: "(/|/setlist/create)",
    exact: true,
    component: asyncComponent({
      loader: () => import("./pages/CreateSetList"),
      Placeholder: () => <div>...LOADING...</div>
    })
  }
];
