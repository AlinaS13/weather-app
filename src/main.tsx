import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage.tsx";
import { RegistrationPage } from "./pages/RegistrationPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";

const router = createBrowserRouter([
  {
    path: "/weather-app/",
    element: <App />,
    children: [
      {
        path: "/weather-app/",
        element: <HomePage />,
      },
      {
        path: "/weather-app/registration",
        element: <RegistrationPage />,
      },
      {
        path: "/weather-app/login",
        element: <LoginPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
