import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import AddEvent from "../pages/AddEvent";
import Search from "../pages/Search";
import RecordList from "../pages/RecordList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/event/add ",
    element: <AddEvent />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/list/:type",
    element: <RecordList />,
  },
]);

export default router;
