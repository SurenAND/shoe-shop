import Navigo from "navigo";
import { changePage } from "@/utils";
import { OnBoarding } from "@/pages";
import { ROUTE } from "@/constant/routes";
import { Login } from "@/templates/login";

export const router = new Navigo("/");

router
  .on(ROUTE.onBoarding, () => {
    changePage(OnBoarding);
  })
  .on(ROUTE.login, () => {
    changePage(Login);
  })
  .on(ROUTE.home, () => {
    changePage(Home);
  })
  .on(ROUTE.notFound, () => {
    changePage(NotFound);
  });
