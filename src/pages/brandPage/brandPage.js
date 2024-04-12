import { brandPage } from "@/templates";
import { El } from "@/utils";

export const BrandPage = (brand, data) => {
  return El({
    element: "div",
    children: [brandPage(brand, data)],
  });
};
