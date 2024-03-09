import { Typography } from "@mui/material";
import WeatherSVG from "../../assets/svg/WeatherSVG";
import styles from "./LoginPage.module.scss";
import { LoginForm } from "../../components/login/LoginForm";
export const LoginPage: React.FC = () => {
  return (
    <div className={styles.loginPageContainer}>
      <Typography variant="h2" gutterBottom mb={5}>
        Welcome to Weather App <WeatherSVG />
      </Typography>
      <LoginForm />
    </div>
  );
};
