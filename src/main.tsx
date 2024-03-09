import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/homePage/HomePage.tsx";
import { RegistrationPage } from "./pages/registrationPage/RegistrationPage.tsx";
import { LoginPage } from "./pages/loginPage/LoginPage.tsx";
// import AuthProvider from "./utils/privateRoute/AuthProvider.tsx";
import PrivateRoute from "./utils/privateRoute/PrivateRoute.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import "./firebase/config.ts";
import { ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { theme } from "./utils/theme/theme.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from "./utils/privateRoute/PublicRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/weather-app/",
    element: <App />,
    errorElement: <div>404 page not fund</div>,
    children: [
      {
        path: "/weather-app/",
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/weather-app/registration",
        element: (
          <PublicRoute>
            <RegistrationPage />
          </PublicRoute>
        ),
      },
      {
        path: "/weather-app/login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <AuthProvider> */}
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          {/* </AuthProvider> */}
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
