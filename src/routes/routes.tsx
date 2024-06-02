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
import RecordDetail from "../pages/RecordDetail";
import Tutorial from "../pages/Tutorial";
import Profile from "../pages/Profile";
import EditRecord from "../pages/EditRecord";
import ChangePassword from "../pages/ChangePassword";
import UploadExcel from "../pages/UploadExcel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <PublicOnlyRoutes />,
        children: [
          {
            path: "tutorial",
            element: <Tutorial />,
          },
          {
            path: "signin",
            element: <SignIn />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
          {
            path: "record/excel/upload",
            element: <UploadExcel />,
          },
        ],
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "record/add",
            element: <AddRecord />,
          },
          {
            path: "search",
            element: <Search />,
          },
          {
            path: "list/:type",
            element: <RecordList />,
          },
          {
            path: "record/:eventId",
            element: <RecordDetail />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "event/:eventId/edit",
            element: <EditRecord />,
          },
          {
            path: "profile/change-password",
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
]);

export default router;
