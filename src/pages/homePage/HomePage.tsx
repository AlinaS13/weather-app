import { Grid } from "@mui/material";
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
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ padding: "20px" }}
      >
        {cities.map((city: ICity) => (
          <Grid item xs={4} sm={4} md={3} key={city.id}>
            <CardWeather
              city={city}
              onRemove={() => handleRemoveCity(city.id)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
