import { router } from "@/Routes/router";
import { filterSection } from "@/components";
import { ROUTE } from "@/constant/routes";
import { MostPopularPage } from "@/pages/mostPopular/mostPopular";
import { El } from "@/utils";

const header = (title) => {
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
                className: "text-[#152536] text-xl font-bold",
                innerText: title,
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

export const mostPopular = () => {
  return El({
    element: "div",
    className:
      "px-4 overflow-y-scroll pb-16 h-full flex flex-col items-center justify-start",
    children: [
      El({
        element: "div",
        className: "w-full bg-white",
        children: [header("Most Popular"), filterSection(MostPopularPage)],
      }),
      El({
        element: "div",
        className: "w-full px-6 py-4 grid grid-cols-12 gap-4 product-section",
        children: [1, 2, 3, 4].map(() => {
          return El({
            element: "div",
            className:
              "max-w-sm animate-pulse flex flex-col items-start justify-center gap-2 col-span-6",
            children: [
              El({
                element: "div",
                className: "w-full h-2/3 bg-gray-200 rounded-2xl aspect-square",
              }),
              El({
                element: "div",
                className: "w-full h-5 rounded-full bg-gray-200",
              }),
              El({
                element: "div",
                className: "w-1/3 h-4 rounded-full bg-gray-200",
              }),
            ],
          });
        }),
      }),
    ],
  });
};
