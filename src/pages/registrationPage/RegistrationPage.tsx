import { Typography } from "@mui/material";
import { RegistationForm } from "../../components/regstration/RegistationForm";
import WeatherSVG from "../../assets/svg/WeatherSVG";
import styles from "./RegistrationPage.module.scss";
export const RegistrationPage: React.FC = () => {
  return (
    <div className={styles.registerPageContainer}>
      <Typography variant="h2" gutterBottom mb={5}>
        Welcome to Weather App <WeatherSVG />
      </Typography>

      <RegistationForm />
    </div>
  );
};
