import Navigo from "navigo";
import { changePage } from "@/utils";

export const router = new Navigo("/");

router.on("/", () => {
  changePage();
});
