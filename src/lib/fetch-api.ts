import { getStrapiURL } from "./utils";
import qs from "qs";

export async function fetchAPI(
    path: string,
    urlParamsObject = {},
    options = {}
  ) {
    try {
      // Merge default and user options
      const mergedOptions = {
        next: { revalidate: 10 },
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
      };
  
      // Build request URL
      const queryString = qs.stringify(urlParamsObject, {encodeValuesOnly : true}) 
      const requestUrl = `${getStrapiURL(
        `/api${path}${queryString ? `?${queryString}` : ""}`
      )}`;
  
      // Trigger API call
      const response = await fetch(requestUrl, mergedOptions);
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error(error);
      throw new Error(`Please check if your server is running and you set all the required tokens.`);
    }
  }