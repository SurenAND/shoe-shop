import Navigo from "navigo";
import { changePage } from "@/utils";
import { OnBoarding } from "@/pages";
import { ROUTE } from "@/constant/routes";

export const router = new Navigo("/");

router
  .on(ROUTE.onBoarding, () => {
    changePage(OnBoarding);
  })
  .on(ROUTE.login, () => {
    changePage(Login);
  })
  .on(ROUTE.notFound, () => {
    changePage(NotFound);
  });
