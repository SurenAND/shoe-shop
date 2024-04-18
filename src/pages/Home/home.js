import { getData } from "@/api/GET/get";
import { renderProduct, renderProducts } from "@/components";
import { Home } from "@/templates";
import { El } from "@/utils";

export const HomePage = (info, filter = "") => {
  renderProduct(filter);
  return El({
    element: "div",
    children: [Home(info)],
  });
};
