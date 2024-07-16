import axios, { AxiosResponse } from "axios";
import { IResponseFormat } from "./responsedetails.js";

const url: string = "https://dummyjson.com/users";

async function getUsersInfo(url: string): Promise<void> {
  try {
    const response: AxiosResponse<IResponseFormat> =
      await axios.get<IResponseFormat>(url);
    const result: IResponseFormat = response.data;
    console.log(result.users);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else if (error instanceof Error) {
      console.error("General error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

getUsersInfo(url);
