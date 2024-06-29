import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { MessageProvider } from "./context/MessageContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryclient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryclient}>
      <AuthContextProvider>
        <MessageProvider>
          <RouterProvider router={router} />
        </MessageProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
