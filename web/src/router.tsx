// import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";

// import SidebarLayout from "./layouts/SidebarLayout";
// import BaseLayout from "./layouts/BaseLayout";

// import SuspenseLoader from "./components/SuspenseLoader";
// import Dashboard from "src/content/dashboards/Dashboard";
import Home from "src/content/home/Home/index";
import Crypto from "src/content/dashboards/Crypto";

import Status404 from "src/content/pages/Status/Status404";
// import Status500 from "src/content/pages/Status/Status500";

import Buttons from "src/content/pages/Components/Buttons";
import Modals from "src/content/pages/Components/Modals";
import Accordions from "src/content/pages/Components/Accordions";
import Tabs from "src/content/pages/Components/Tabs";
import Badges from "src/content/pages/Components/Badges";
import Tooltips from "src/content/pages/Components/Tooltips";
import Avatars from "src/content/pages/Components/Avatars";

import Cards from "src/content/pages/Components/Cards";
import Forms from "src/content/pages/Components/Forms";

import Transactions from "src/content/applications/Transactions";
import UserProfile from "src/content/applications/Users/profile";
import UserSettings from "src/content/applications/Users/settings";
import Ballard from "./content/locations/Locations/Ballard";

const routes: RouteObject[] = [
  {
    path: "",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/locations",
        children: [
          {
            path: "ballard",
            element: <Ballard />,
          },
        ],
      },
      {
        path: "/page-demos",
        children: [
          {
            path: "crypto",
            element: <Crypto />,
          },
          {
            path: "transactions",
            element: <Transactions />,
          },
          {
            path: "user-profile",
            element: <UserProfile />,
          },
          {
            path: "user-settings",
            element: <UserSettings />,
          },
        ],
      },
      {
        path: "/component-demos",
        children: [
          {
            path: "",
            element: <Navigate to="buttons" replace />,
          },
          {
            path: "buttons",
            element: <Buttons />,
          },
          {
            path: "modals",
            element: <Modals />,
          },
          {
            path: "accordions",
            element: <Accordions />,
          },
          {
            path: "tabs",
            element: <Tabs />,
          },
          {
            path: "badges",
            element: <Badges />,
          },
          {
            path: "tooltips",
            element: <Tooltips />,
          },
          {
            path: "avatars",
            element: <Avatars />,
          },
          {
            path: "cards",
            element: <Cards />,
          },
          {
            path: "forms",
            element: <Forms />,
          },
        ],
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "/ballard",
    element: <Ballard />,
  },
];

export default routes;
