import {
  CardContent,
  Typography,
  Card,
  CardActions,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import { Loader } from "../../components/loader/Loader";
import { ICity, IWeatherData } from "../../types/WeatherTypes";
import { useEffect, useState } from "react";
import { fetchWeatherCard } from "../../redux/weather/weatherOperation";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import styles from "./CardWeather.module.scss";

type CardWeatherProps = {
  city: ICity;
  onRemove: (id: number) => void;
};

export const CardWeather: React.FC<CardWeatherProps> = ({ city, onRemove }) => {
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchWeatherCard(city.name, city.temperatureUnit);
      setWeatherData(data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const handleRefresh = () => {
    fetchData();
  };
  return (
    weatherData && (
      <Card
        sx={{
          position: "relative",
          minWidth: 350,
          minHeight: 250,
          backgroundColor: "rgba(133, 170, 159, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            boxShadow: "0px 8px 12px #00000029",
            transform: "scale(1.03)",
          },
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <CardContent>
              <img
                style={{ width: 70, height: 70 }}
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
              <Typography
                sx={{ fontSize: 18 }}
                color="text.secondary"
                gutterBottom
              >
                {weatherData?.name},&nbsp;{weatherData?.sys.country}
              </Typography>
              <Typography variant="h5" component="div">
                {Math.round(weatherData?.main.temp)}
                <sup>o</sup>&nbsp;
                <span>C</span>
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Feels Like:&nbsp;{Math.round(weatherData?.main.feels_like)}
                <sup>o</sup>&nbsp;
                <span>C</span>
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "20px" }}>
                Humidity: {weatherData?.main.humidity}&nbsp;%
                <br />
                Pressure: {weatherData?.main.pressure}&nbsp;Pa
                <br />
                Wind speed: {weatherData?.wind.speed}&nbsp;m/s
              </Typography>
              <CardActions sx={{ padding: "0px" }}>
                <NavLink
                  className={styles.lernMoreLink}
                  to={`/weather-app/weather-in-city/${city.name}`}
                >
                  Learn more about weather
                </NavLink>
              </CardActions>
            </CardContent>
          </>
        )}

        <IconButton
          sx={{ position: "absolute", top: 10, right: 50 }}
          aria-label="update"
          onClick={handleRefresh}
        >
          <RefreshIcon></RefreshIcon>
        </IconButton>

        <IconButton
          sx={{ position: "absolute", top: 10, right: 10 }}
          aria-label="delete"
          onClick={() => onRemove(city.id)}
        >
          <DeleteIcon>
            <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
          </DeleteIcon>
        </IconButton>
      </Card>
    )
  );
};
