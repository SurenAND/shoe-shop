import { router } from "@/Routes/router";
import { SearchInput, brandFilter, filterSection } from "@/components";
import { ROUTE } from "@/constant/routes";
import { header, navbar } from "@/layout";
import { El } from "@/utils";

export const Home = (info) => {
  return El({
    element: "div",
    className:
      "h-full flex flex-col items-center justify-start overflow-y-scroll pb-16",
    children: [
      El({
        element: "div",
        className: "fixed top-0 bg-white w-full pb-2",
        children: [header(info), SearchInput()],
      }),
      El({
        element: "div",
        className: "w-full mt-32",
        children: [
          brandFilter(),
          El({
            element: "div",
            className: "w-full px-6 py-2 flex items-center justify-between",
            children: [
              El({
                element: "span",
                className: "text-[20px] font-semibold ",
                innerText: "Most Popular",
              }),
              El({
                element: "span",
                className: "text-4 font-semibold ",
                onclick: (e) => router.navigate(ROUTE.mostPopular),
                innerText: "See All",
              }),
            ],
          }),
          filterSection(),
          El({
            element: "div",
            className:
              "w-full px-6 py-4 grid grid-cols-12 gap-4 product-section",
            children: [1, 2, 3, 4].map(() => {
              return El({
                element: "div",
                className:
                  "max-w-sm animate-pulse flex flex-col items-start justify-center gap-2 col-span-6",
                children: [
                  El({
                    element: "div",
                    className:
                      "w-full h-2/3 bg-gray-200 rounded-2xl aspect-square",
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
      }),
      navbar("home"),
    ],
  });
};
