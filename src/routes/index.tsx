// core
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// pages
import Home from "pages/Home";
import Places from "pages/Places";
import About from "pages/About";
import NotFound from "pages/NotFound";
// components
import ErrorComponent from "components/ErrorComponent";

// ----------------------------------------------------------------------

const router = createBrowserRouter([
  {
    path: import.meta.env.PROD ? "/random-taste-app" : "/",
    errorElement: <ErrorComponent />,
    element: <Home />,
  },
  {
    path: "/places",
    errorElement: <ErrorComponent />,
    element: <Places />,
  },
  {
    path: "/about",
    errorElement: <ErrorComponent />,
    element: <About />,
  },
  { path: "404", element: <NotFound /> },
  { path: "*", element: <NotFound /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
