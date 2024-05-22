import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Search from "../pages/Search";
import RecordList from "../pages/RecordList";
import AddRecord from "../pages/AddRecord";
import ProtectedRoutes from "../pages/ProtectedRoutes";
import PublicOnlyRoutes from "../pages/PublicOnlyRoutes";

const router = createBrowserRouter([
  {
    element: <PublicOnlyRoutes />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [{ index: true, element: <Home /> }],
      },
      {
        path: "/event/add ",
        element: <AddRecord />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/list/:type",
        element: <RecordList />,
      },
    ],
  },
]);

export default router;
