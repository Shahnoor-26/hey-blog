import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store.js";
import { Protected } from "./components/index.js";
import {
  Home,
  Login,
  Signup,
  Article,
  Articles,
  AddArticle,
  EditArticle,
} from "./pages/index.js";

import Layout from "./Layout.jsx";

import "./css/index.css";
import "./css/theme.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Protected authenticated={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authenticated={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "/articles",
        element: (
          <Protected authenticated={true}>
            <Articles />
          </Protected>
        ),
      },
      {
        path: "/add-article",
        element: (
          <Protected authenticated={true}>
            <AddArticle />
          </Protected>
        ),
      },
      {
        path: "/edit-article/:documentId",
        element: (
          <Protected authenticated={true}>
            <EditArticle />
          </Protected>
        ),
      },
      {
        path: "/article/:documentId",
        element: (
          <Protected authenticated={true}>
            <Article />
          </Protected>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
