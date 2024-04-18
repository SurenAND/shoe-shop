import { router } from "@/Routes/router";
import { ROUTE } from "@/constant/routes";
import { El } from "@/utils";

export const header = (info) => {
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
            className: "w-12 h-12 rounded-full overflow-hidden",
            children: [
              El({
                element: "img",
                src: info.img,
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex flex-col items-start justify-between",
            children: [
              El({
                element: "span",
                className: "text-gray-500 text-[16px] font-medium ",
                innerText: "Welcome 👋",
              }),
              El({
                element: "span",
                className: "text-[#152536] text-[16px] font-bold ",
                innerText: info.name,
              }),
            ],
          }),
        ],
      }),
      // section notification and wish list
      El({
        element: "div",
        className: "flex items-center justify-center gap-4 mr-3",
        children: [
          El({
            element: "span",
            className: "icon-[clarity--notification-line] w-6 h-6",
          }),
          El({
            element: "span",
            className: "icon-[icon-park-outline--like] w-6 h-6",
            onclick: (e) => {
              router.navigate(ROUTE.wishlist);
            },
          }),
        ],
      }),
    ],
  });
};
