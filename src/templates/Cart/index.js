import { router } from "@/Routes/router";
import { Button } from "@/components";
import { PATHS } from "@/constant/path";
import { ROUTE } from "@/constant/routes";
import { navbar } from "@/layout";
import { cartRender } from "@/pages";
import { El } from "@/utils";

const cartHeader = () => {
  return El({
    element: "div",
    className: "w-full p-6 flex items-center justify-between",
    children: [
      El({
        element: "div",
        className: "flex items-center justify-center gap-4",
        children: [
          El({
            element: "div",
            children: [
              El({
                element: "img",
                className: "w-5 h-5",
                src: `${PATHS.HOST_PATH}/images/logo.svg`,
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
                innerText: "My Cart",
              }),
            ],
          }),
        ],
      }),
      // section search icon
      El({
        element: "div",
        className: "flex items-center justify-center gap-2",
        children: [
          El({
            element: "span",
            className: "icon-[teenyicons--search-outline] w-6 h-6",
          }),
        ],
        onclick: () => {
          router.navigate(ROUTE.search);
        },
      }),
    ],
  });
};

export const Cart = () => {
  setTimeout(cartRender, 0);
  return El({
    element: "div",
    className: "h-full flex flex-col items-center justify-start",
    children: [
      cartHeader(),
      El({
        element: "div",
        id: "cart-section",
        className:
          "w-full px-6 pb-40 flex flex-col items-center justify-start gap-6 overflow-y-scroll",
      }),
      El({
        element: "div",
        className:
          "fixed bottom-0 w-full p-6 h-40 flex items-start justify-between bg-white shadow-2xl",
        children: [
          El({
            element: "div",
            className: "flex flex-col items-start justify-between gap-1",
            children: [
              El({
                element: "span",
                className: "text-gray-400 font-medium text-[10px]",
                innerText: "Total price",
              }),
              El({
                element: "span",
                id: "checkout-price",
                className: "font-bold text-2xl",
                innerText: `$ 00.00`,
              }),
            ],
          }),
          Button({
            text: "Checkout",
            extraClassName:
              "text-white px-[70px] py-4 bg-black font-medium flex items-center justify-center gap-4 flex-row-reverse",
            icon: "icon-[grommet-icons--link-next]",
            eventListener: [
              {
                event: "click",
                callback: (e) => {
                  router.navigate(ROUTE.checkout);
                },
              },
            ],
          }),
        ],
      }),
      navbar("cart"),
    ],
  });
};
