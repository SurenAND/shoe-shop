import { router } from "@/Routes/router";
import { PATHS } from "@/constant/path";
import { El } from "@/utils";

const brands = [
  {
    name: "Nike",
    src: `${PATHS.HOST_PATH}/images/nike.png`,
  },
  {
    name: "Adidas",
    src: `${PATHS.HOST_PATH}/images/adidas.png`,
  },
  {
    name: "Puma",
    src: `${PATHS.HOST_PATH}/images/puma.png`,
  },
  {
    name: "Asics",
    src: `${PATHS.HOST_PATH}/images/asics.png`,
  },
  {
    name: "Reebok",
    src: `${PATHS.HOST_PATH}/images/reebok.png`,
  },
  {
    name: "New Balance",
    src: `${PATHS.HOST_PATH}/images/new-balance.png`,
  },
  {
    name: "Converse",
    src: `${PATHS.HOST_PATH}/images/converse.png`,
  },
];

export const brandFilter = () => {
  return El({
    element: "div",
    className: "w-full p-4 grid grid-cols-4 gap-y-8",
    children: [
      ...brands.map((brand) => {
        return El({
          element: "div",
          onclick: () => router.navigate(`/brand/${brand.name}`),
          className:
            "flex flex-col col-span-1 items-center justify-center gap-1",
          children: [
            El({
              element: "div",
              className:
                "w-16 h-16 p-4 flex items-center justify-center rounded-full bg-gray-200 overflow-hidden",
              children: [
                El({
                  element: "img",
                  src: brand.src,
                }),
              ],
            }),
            El({
              element: "span",
              className:
                "w-16 text-center text-[14px] font-semibold whitespace-nowrap truncate",
              innerText: brand.name,
            }),
          ],
        });
      }),
      El({
        element: "div",
        className: "flex flex-col col-span-1 items-center justify-center gap-1",
        children: [
          El({
            element: "div",
            className:
              "w-16 h-16 p-4 flex items-center justify-center rounded-full bg-gray-200 overflow-hidden",
            children: [
              El({
                element: "img",
                src: `${PATHS.HOST_PATH}/images/more.svg`,
              }),
            ],
          }),
          El({
            element: "span",
            className:
              "w-16 text-center text-[14px] font-semibold whitespace-nowrap truncate",
            innerText: "More..",
          }),
        ],
      }),
    ],
  });
};
