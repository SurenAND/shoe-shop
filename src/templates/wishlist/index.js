import { router } from "@/Routes/router";
import { filterSection } from "@/components";
import { ROUTE } from "@/constant/routes";
import { renderWishList } from "@/pages";
import { El } from "@/utils";

const wishlistHeader = (title) => {
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
              window.history.back();
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
                innerText: title,
              }),
            ],
          }),
        ],
      }),
      El({
        element: "div",
        className: "flex",
        onclick: (e) => {
          //
        },
        children: [
          El({
            element: "span",
            className: "icon-[teenyicons--search-outline] w-6 h-6",
            onclick: () => {
              router.navigate(ROUTE.search);
            },
          }),
        ],
      }),
    ],
  });
};

export const wishlist = () => {
  setTimeout(renderWishList, 0);
  return El({
    element: "div",
    className:
      "px-4 overflow-y-scroll pb-16 h-full flex flex-col items-center justify-start",
    children: [
      El({
        element: "div",
        className: "w-full bg-white",
        children: [wishlistHeader("My WishList"), filterSection(true)],
      }),
      El({
        element: "div",
        className: "w-full px-6 py-4 grid grid-cols-12 gap-4 product-section",
      }),
    ],
  });
};
