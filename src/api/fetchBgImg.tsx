import axios, { AxiosResponse } from "axios";
const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;
const background = document.querySelector("body");

interface ImageResponse {
  largeImageURL: string;
}

export const fetchBgImg = async (city: string): Promise<void> => {
  try {
    const response: AxiosResponse<{ hits: { largeImageURL: string }[] }> =
      await axios.get(
        `https://pixabay.com/api/?key=${apiKey}&q=${city}&image_type=photo&pretty=true&page=1&safesearch=true`
      );

    changeBcgImg(response);
  } catch (error: any) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
};

const changeBcgImg = (
  response: AxiosResponse<{ hits: ImageResponse[] }>
): void => {
  const images = response.data.hits;
  if (images.length > 0) {
    const img = images[Math.floor(Math.random() * images.length)].largeImageURL;
    if (background) {
      background.style.backgroundImage = `url(${img})`;
    }
  }
};
