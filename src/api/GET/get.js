import axios from "axios";
import { PATHS } from "@/constant/path";

export async function getData(endPoint) {
  const response = await axios.get(`${PATHS.DATA_BASE}/${endPoint}`);
  return response.data;
}
