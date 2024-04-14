import axios from "axios";
import { PATHS } from "@/constant/path";

export async function patchData(endPoint, newData) {
  const response = await axios.patch(`${PATHS.DATA_BASE}/${endPoint}`, newData);
  return response.data;
}
