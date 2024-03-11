import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux-hooks";

import { CardWeather } from "../../components/cardCardWeather/CardWeather";
import { SearchWeather } from "../../components/searchWeather/SearchWeather";
import { removeCity } from "../../redux/weather/weatherSlice";
import { Header } from "../../components/header/Header";
import { ICity } from "../../types/WeatherTypes";

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) => state.weather.cities);
  const background: HTMLBodyElement | null = document.querySelector("body");
  if (background) {
    background.style.backgroundImage = "";
  }

  const handleRemoveCity = (cityToRemove: number) => {
    dispatch(removeCity(cityToRemove));
  };
  return (
    <>
      <Header />
      <SearchWeather />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          padding: "20px",
          flexWrap: "wrap",
          justifyContent: "start",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {cities.map((city: ICity) => (
          <CardWeather
            key={city.id}
            city={city}
            onRemove={() => handleRemoveCity(city.id)}
          />
        ))}
      </Box>
    </>
  );
};
