import axios, { AxiosResponse } from "axios";
import {
  ICityList,
  ICityListResponse,
  IWeatherData,
} from "../../types/WeatherTypes";
import { toast } from "react-toastify";
const apiKey = "2475c9fe37a0fd389e88ed18ac6a56f9";

export const fetchCityList = async (
  input: string
): Promise<ICityListResponse[]> => {
  try {
    const response: AxiosResponse<{ list: ICityList[] }> = await axios.get(
      `https://api.openweathermap.org/data/2.5/find?q=${input}&type=like&sort=population&cnt=5&appid=${apiKey}`
    );

    const cityMap = new Map<string, ICityList>();
    response.data.list.forEach((city) => {
      cityMap.set(city.name, city);
    });

    const uniqueNewList = Array.from(cityMap.values()).map((city) => ({
      id: city.id,
      name: city.name,
      country: city.sys.country,
    }));

    return uniqueNewList;
  } catch (error: any) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
};
export const fetchWeatherByCity = async (
  cityName: string
): Promise<IWeatherData> => {
  try {
    const response: AxiosResponse<IWeatherData> = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=en&appid=${apiKey}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response.status === 404) {
      toast.error("City not found");
    }
    console.error("Error fetching temperature data:", error);
    throw error;
  }
};

export const fetchWeatherCard = async (
  city: string,
  temperatureUnit: string
): Promise<IWeatherData> => {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${temperatureUnit}&lang=en&appid=${apiKey}`;
    const response: AxiosResponse<IWeatherData> = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
