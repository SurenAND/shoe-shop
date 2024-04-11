import { SearchInput } from "@/components";
import { renderRecentSearch } from "@/pages";
import { El } from "@/utils";

export const search = () => {
  return El({
    element: "div",
    className:
      "h-full flex flex-col items-center justify-start overflow-y-scroll pb-16",
    children: [
      El({
        element: "div",
        className:
          "fixed top-0 bg-white w-full py-4 z-20 flex flex-col items-center justify-center gap-2",
        children: [SearchInput("icon-[mi--filter]", true)],
      }),
      El({
        element: "div",
        className: "relative w-full mt-16",
        children: [
          renderRecentSearch(),
          El({
            element: "div",
            className: "overflow-y-scroll",
            children: [
              El({
                element: "div",
                className:
                  "w-full px-6 py-4 grid grid-cols-12 gap-4 search-section",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
