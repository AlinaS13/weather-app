export interface ICity {
  id: number;
  name: string;
  temperatureUnit: "metric" | "imperial";
  location?: boolean;
}

export interface IWeatherState {
  cities: ICity[];
}

// export interface RootState {
//   weather: IWeatherState;
// }

export interface IWeatherData {
  id: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
  };
  wind: {
    speed: number;
  };
}

// export interface OpenWeatherResponse {
//   name: string;
//   id: number;
//   main: {
//     temp: number;
//   };
// }

export interface ICityList {
  name: string;
  id: number;
  sys: {
    country: string;
  };
}

export interface ICityListResponse {
  id: number;
  name: string;
  country: string;
}

// export interface GeoNamesResponse {
//   time: string;
// }

// export interface Forecast {
//   dt_txt: string;
//   main: {
//     temp: number;
//   };
// }

// export interface Resources {
//   translation: Record<string, string>;
// }
