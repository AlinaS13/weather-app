import { Button, Typography } from "@mui/material";
import { logoutUser } from "../../redux/auth/authOperaton";

import { useAppDispatch } from "../../utils/hooks/redux-hooks";
import styles from "./HomePage.module.scss";
import WeatherSVG from "../../assets/svg/WeatherSVG";
import LogoutIcon from "@mui/icons-material/Logout";
export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <header className={styles.header}>
      <div className={styles.logoWrp}>
        <Typography variant="h4" gutterBottom>
          Weather App
        </Typography>
        <WeatherSVG />
      </div>
      <Button
        sx={{
          color: "#000000",
          backgroundColor: "#transparent",
          "&:hover": {
            backgroundColor: "transparent",
            color: "#ffffff",
          },
        }}
        endIcon={<LogoutIcon />}
        type="button"
        onClick={() => {
          dispatch(logoutUser());
        }}
      >
        Logout
      </Button>
    </header>
  );
};
