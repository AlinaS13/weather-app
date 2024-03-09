import { Typography } from "@mui/material";

import WeatherSVG from "../../assets/svg/WeatherSVG";
import styles from "./LoginPage.module.scss";
import { LoginForm } from "../../components/login/LoginForm";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useAuth } from "../utils/privateRoute/AuthProvider";
export const LoginPage: React.FC = () => {
  // const navigate = useNavigate();
  // const user = useAuth();
  // useEffect(() => {
  //   if (user === null) {
  //     navigate("/weather-app/", { replace: true });
  //   }
  //   // else if (user !== null) {
  //   //   navigate("/weather-app/"), { replace: false };
  //   // }
  // }, [navigate, user]);
  return (
    <div className={styles.loginPageContainer}>
      <Typography variant="h2" gutterBottom mb={5}>
        Welcome to Weather App <WeatherSVG />
      </Typography>
      <LoginForm />
    </div>
  );
};
