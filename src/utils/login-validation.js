import { getData } from "@/api/GET/get";
import Cookies from "js-cookie";

// validation to check if login
export const loginValidation = async () => {
  let isLogin;
  const data = await getData(`users?email=${Cookies.get("shoea")}`);
  if (data.length > 0) {
    isLogin = true;
  } else {
    isLogin = false;
  }
  return isLogin;
};
