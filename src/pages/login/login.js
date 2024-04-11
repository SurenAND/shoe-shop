import { router } from "@/Routes/router";
import { getData } from "@/api/GET/get";
import { ROUTE } from "@/constant/routes";
import { Login } from "@/templates";
import { El } from "@/utils";
import Cookies from "js-cookie";

let UserInfo = {};

export const emailVlidationCheck = (email) => {
  const re = new RegExp("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,3}");
  return re.test(email);
};

export const passVlidationCheck = (pass) => {
  const re = new RegExp("^(?=.*[a-z])(?=.*[0-9])");
  return re.test(pass);
};

export const checkValidation = () => {
  const loginBtn = document.getElementById("login-btn");
  const form = document.getElementById("login-form");
  if (
    emailVlidationCheck(form.email.value) &&
    passVlidationCheck(form.password.value)
  ) {
    loginBtn.classList.remove("bg-opacity-50");
    loginBtn.disabled = false;
    return true;
  } else {
    loginBtn.classList.add("bg-opacity-50");
    loginBtn.disabled = true;
    return false;
  }
};

export const submitHandler = (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  checkValidation()
    ? getData(`users?email=${formData.get("email")}`)
        .then((data) => {
          UserInfo = data[0];
          if (
            UserInfo.password === formData.get("password") &&
            UserInfo.email === formData.get("email")
          ) {
            formData.has("remember")
              ? Cookies.set("shoea", UserInfo.email, { expires: 7 })
              : Cookies.set("shoea", UserInfo.email);

            router.navigate(ROUTE.home);
          } else {
            document.getElementById("wrong-msg").classList.remove("hidden");
            document.getElementById("login-form").reset();
            setTimeout(() => {
              document.getElementById("wrong-msg").classList.add("hidden");
            }, 3000);
          }
        })
        .catch(() => {
          document.getElementById("wrong-msg").classList.remove("hidden");
          document.getElementById("login-form").reset();
          setTimeout(() => {
            document.getElementById("wrong-msg").classList.add("hidden");
          }, 3000);
        })
    : "";
};

export const LoginPage = () => {
  return El({
    element: "div",
    children: [Login()],
  });
};
