import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { fetchBgImg } from "../../api/fetchBgImg";
import { IWeatherData } from "../../types/WeatherTypes";
import { useParams } from "react-router-dom";
import { fetchWeatherByCity } from "../../redux/weather/weatherOperation";
import { Box, Card, CardContent, Typography } from "@mui/material";

export const WeatherInCityPage: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);

  useEffect(() => {
    if (cityName) {
      fetchBgImg(cityName);
    }
  }, [cityName]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cityName) {
          const data = await fetchWeatherByCity(cityName);
          setWeatherData(data);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };
  return (
    weatherData && (
      <>
        <Header />
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "rgba(41, 46, 41, 0.8)",

            height: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h2" gutterBottom>
              {weatherData.name},&nbsp;
              {weatherData.sys.country}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                style={{ width: 70, height: 70 }}
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
              <Typography
                sx={{ fontSize: 18, textTransform: "capitalize" }}
                color="text.primary"
                gutterBottom
              >
                {weatherData?.weather[0].description}
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{ color: "#ffffff", marginBottom: "0px" }}
              gutterBottom
            >
              {Math.round(weatherData.main.temp)}
              <sup>o</sup>&nbsp;
              <span>C</span>
            </Typography>
            <Typography
              sx={{ mb: 1.5, fontSize: 18, color: "rgb(255, 107, 9)" }}
              color="text.secondary"
            >
              Feels Like:&nbsp;{Math.round(weatherData?.main.feels_like)}
              <sup>o</sup>&nbsp;
              <span>C</span>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "30px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                width: 400,
                height: 250,
                backgroundColor: "rgba(41, 46, 41, 0.8)",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent
                sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
              >
                <Typography variant="h5">
                  Humidity: {weatherData?.main.humidity}&nbsp;%
                </Typography>
                <Typography variant="h5">
                  Pressure: {weatherData?.main.pressure}&nbsp;Pa
                </Typography>
                <Typography variant="h5">
                  Wind speed: {weatherData?.wind.speed}&nbsp;m/s
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                width: 400,
                height: 250,
                backgroundColor: "rgba(41, 46, 41, 0.8)",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent
                sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
              >
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Typography variant="h5" sx={{ color: "#ffffff" }}>
                    Min: {Math.round(weatherData.main.temp_min)}
                    <sup>o</sup>&nbsp;
                    <span>C</span>
                  </Typography>
                  &nbsp;
                  <Typography variant="h5" sx={{ color: "#ffffff" }}>
                    Max: {Math.round(weatherData.main.temp_max)}
                    <sup>o</sup>&nbsp;
                    <span>C</span>
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
                >
                  <Typography variant="h5">
                    Sunset: {formatTime(weatherData.sys.sunrise)}
                  </Typography>
                  <Typography variant="h5">
                    Sunrise: {formatTime(weatherData.sys.sunset)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </>
    )
  );
};
