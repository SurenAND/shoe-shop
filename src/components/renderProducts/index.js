import { router } from "@/Routes/router";
import { getData } from "@/api/GET/get";
import { El } from "@/utils";

export const renderProducts = (container, products) => {
  products.map((product) => {
    const card = El({
      element: "div",
      className:
        "max-w-sm flex flex-col items-start justify-center gap-2 col-span-6",
      eventListener: [
        {
          event: "click",
          callback: () => {
            // change route to product single page
            router.navigate(`/products/${product.id}`);
          },
        },
      ],
      children: [
        El({
          element: "div",
          className:
            "w-full h-2/3 flex items-center justify-center bg-gray-200 rounded-2xl overflow-hidden aspect-square",
          children: [
            El({
              element: "img",
              className: "w-full h-full",
              src: product.imageURL,
            }),
          ],
        }),
        El({
          element: "span",
          className:
            "w-full text-shoea text-[20px] font-bold whitespace-nowrap truncate",
          innerText: product.name,
        }),
        El({
          element: "span",
          className: "text-shoea text-[16px] font-semibold w-full",
          innerText: `$ ${product.price}`,
        }),
      ],
    });

    container.appendChild(card);
  });
};

export const renderProduct = (filter) => {
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
};
