import { getData } from "@/api/GET/get";
import { renderProducts } from "@/components";
import { mostPopular } from "@/templates";
import { El } from "@/utils";

export const MostPopularPage = (info, filter = "") => {
  if (!filter) {
    getData(`products`)
      .then((data) => {
        const section = document.querySelector(".product-section");
        section.innerHTML = "";
        renderProducts(section, data);
      })
      .catch((error) => console.log(error));
  } else {
    getData(`products?brand=${filter}`)
      .then((data) => {
        const section = document.querySelector(".product-section");
        section.innerHTML = "";
        renderProducts(section, data);
      })
      .catch((error) => console.log(error));
  }

  return El({
    element: "div",
    children: [mostPopular()],
  });
};
