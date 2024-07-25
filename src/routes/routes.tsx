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
import FindEmail from "../pages/FindEmail";
import FindEmailSuccess from "../pages/FindEmailSuccess";
import FindPassword from "../pages/FindPassword";
import FindPasswordSuccess from "../pages/FindPasswordSuccess";
import Terms from "../pages/Terms";
import PrivacyNotice from "../pages/PrivacyNotice";

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
        path: "privacyNotice",
        element: <PrivacyNotice />,
      },
      {
        path: "terms",
        element: <Terms />,
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
            path: "/find-email",
            element: <FindEmail />,
          },
          {
            path: "/find-password",
            element: <FindPassword />,
          },
          {
            path: "/find-email/success",
            element: <FindEmailSuccess />,
          },
          {
            path: "/find-password/success",
            element: <FindPasswordSuccess />,
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
            path: "record/excel/upload",
            element: <UploadExcel />,
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
