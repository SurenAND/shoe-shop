import { router } from "@/Routes/router";
import { ROUTE } from "@/constant/routes";
import { El } from "@/utils";

const header = (brand) => {
  return El({
    element: "div",
    className: "w-full p-4 flex items-center justify-between",
    children: [
      El({
        element: "div",
        className: "flex items-center justify-center gap-4",
        children: [
          El({
            element: "div",
            className: "flex",
            onclick: (e) => {
              router.navigate(ROUTE.home);
            },
            children: [
              El({
                element: "span",
                className: "icon-[ion--arrow-back-outline] w-6 h-6",
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex flex-col items-start justify-between",
            children: [
              El({
                element: "span",
                className: "text-[#152536] text-xl font-bold ",
                innerText: brand,
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

export const brandPage = (brand, data) => {
  return El({
    element: "div",
    className:
      "px-4 overflow-y-scroll pb-16 h-full flex flex-col items-center justify-start",
    children: [
      El({
        element: "div",
        className: "bg-white py-4 w-full",
        children: [header(brand)],
      }),
      El({
        element: "div",
        className: "w-full px-6 py-4 grid grid-cols-12 gap-4 product-section",
        children: data.map((product) => {
          return El({
            element: "div",
            className:
              "max-w-sm flex flex-col items-start justify-center gap-2 col-span-6",
            eventListener: [
              {
                event: "click",
                callback: () => {
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
        }),
      }),
    ],
  });
};
