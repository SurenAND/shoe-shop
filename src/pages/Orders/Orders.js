import { getData } from "@/api/GET/get";
import { Button } from "@/components";
import { PATHS } from "@/constant/path";
import { Orders, colorStyle } from "@/templates";
import { El } from "@/utils";
import Cookies from "js-cookie";
import { addToCart } from "../singleProduct/singleProduct";
import { router } from "@/Routes/router";
import { ROUTE } from "@/constant/routes";

export const orderRender = (status = "active") => {
  getData(`users?_email=${Cookies.get("shoea")}`).then((data) => {
    const container = document.getElementById("order-section");
    container.innerHTML = "";
    // create a card of product in cart
    let orders = data[0].orders;
    let cart = data[0].cart;
    if (status === "completed") {
      orders.map((order) => {
        order.cart.map((item) => {
          const elem = El({
            element: "div",
            className:
              "w-full flex items-center gap-2 p-4 shadow-custom rounded-2xl",
            children: [
              El({
                element: "img",
                className: "rounded-lg w-28 aspect-square	",
                src: item.img,
              }),
              El({
                element: "div",
                className:
                  "w-full flex flex-col gap-2 items-start justify-between ",
                children: [
                  // title of selected product
                  El({
                    element: "div",
                    className: "w-full flex items-center justify-between",
                    children: [
                      El({
                        element: "span",
                        className:
                          "w-52 text-shoea text-xl font-bold whitespace-nowrap truncate",
                        innerText: item.name,
                      }),
                    ],
                  }),
                  //details of selected product
                  El({
                    element: "div",
                    className: "w-full flex items-center justify-start gap-1 ",
                    children: [
                      El({
                        element: "div",
                        className: `w-5 h-5 ${
                          colorStyle[item.color].bg
                        } flex items-center justify-center rounded-full`,
                      }),
                      El({
                        element: "span",
                        className: `text-gray-500 text-sm font-semibold`,
                        innerText: item.color,
                      }),
                      El({
                        element: "div",
                        className: `w-1 h-3 border-r-2 border-gray-400`,
                      }),
                      El({
                        element: "span",
                        className: `text-gray-500 text-sm font-semibold`,
                        innerText: "size = ",
                      }),
                      El({
                        element: "span",
                        className: `text-gray-500 text-sm font-semibold`,
                        innerText: item.size,
                      }),
                      El({
                        element: "div",
                        className: `w-1 h-3 border-r-2 border-gray-400`,
                      }),
                      El({
                        element: "span",
                        className: `text-gray-500 text-sm font-semibold`,
                        innerText: "Qty = ",
                      }),
                      El({
                        element: "span",
                        className: `text-gray-500 text-sm font-semibold`,
                        innerText: item.quantity,
                      }),
                    ],
                  }),
                  // status
                  El({
                    element: "span",
                    className:
                      "bg-gray-200 mr-4 py-1.5 px-2 rounded-lg font-medium text-[10px]",
                    innerText: "Completed",
                  }),
                  //product total price and quantity handel button
                  El({
                    element: "div",
                    className: "w-full flex items-center justify-between gap-6",
                    children: [
                      El({
                        element: "span",
                        id: `item-price-${item.id}`,
                        className: "text-shoea text-lg font-bold",
                        innerText: `$ ${item.totalPrice.toFixed(2)}`,
                      }),
                      Button({
                        text: "Buy Again",
                        extraClassName:
                          "bg-black px-4 py-2 text-white rounded-full flex items-center justify-center whitespace-nowrap font-bold",
                        eventListener: [
                          {
                            event: "click",
                            callback: (e) => {
                              addToCart(cart, item);
                            },
                          },
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
          container.appendChild(elem);
        });
      });
    } else {
      if (cart.length > 0) {
        cart.map((item) => {
          const elem = El({
            element: "div",
            className:
              "w-full flex items-center gap-2 p-4 shadow-custom rounded-2xl",
            children: [
              El({
                element: "img",
                className: "rounded-lg w-28 aspect-square	",
                src: item.img,
              }),
              El({
                element: "div",
                className:
                  "w-full flex flex-col gap-2 items-start justify-between ",
                children: [
                  // title of selected product
                  El({
                    element: "div",
                    className: "w-full flex items-center justify-between",
                    children: [
                      El({
                        element: "span",
                        className:
                          "w-52 text-shoea text-xl font-bold whitespace-nowrap truncate",
                        innerText: item.name,
                      }),
                    ],
                  }),
                  //details of selected product
                  El({
                    element: "div",
                    className: "w-full flex items-center justify-start gap-1 ",
                    children: [
                      El({
                        element: "div",
                        className: `w-5 h-5 ${
                          colorStyle[item.color].bg
                        } flex items-center justify-center rounded-full`,
                      }),
                      El({
                        element: "span",
                        className: `text-gray-500 text-sm font-semibold`,
                        innerText: item.color,
                      }),
                      El({
                        element: "div",
                        className: `w-1 h-3 border-r-2 border-gray-400`,
                      }),
                      El({
                        element: "span",
                        className: `text-gray-500 text-sm font-semibold`,
                        innerText: "size = ",
                      }),
                      El({
                        element: "span",
                        className: `text-gray-500 text-sm font-semibold`,
                        innerText: item.size,
                      }),
                      El({
                        element: "div",
                        className: `w-1 h-3 border-r-2 border-gray-400`,
                      }),
                      El({
                        element: "span",
                        className: `text-gray-500 text-sm font-semibold`,
                        innerText: "Qty = ",
                      }),
                      El({
                        element: "span",
                        className: `text-gray-500 text-sm font-semibold`,
                        innerText: item.quantity,
                      }),
                    ],
                  }),
                  // status
                  El({
                    element: "span",
                    className:
                      "bg-gray-200 mr-4 py-1.5 px-2 rounded-lg font-medium text-[10px]",
                    innerText: "In Cart",
                  }),
                  //product total price and quantity handel button
                  El({
                    element: "div",
                    className: "w-full flex items-center justify-between gap-6",
                    children: [
                      El({
                        element: "span",
                        id: `item-price-${item.id}`,
                        className: "text-shoea text-lg font-bold",
                        innerText: `$ ${item.totalPrice.toFixed(2)}`,
                      }),
                      Button({
                        text: "Complete Order",
                        extraClassName:
                          "bg-black px-4 py-2 text-white rounded-full flex items-center justify-center whitespace-nowrap font-bold",
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
                ],
              }),
            ],
          });
          container.appendChild(elem);
        });
      } else {
        const notFound = El({
          element: "div",
          className:
            "w-full mt-20 p-4 flex flex-col items-center justify-center",
          children: [
            El({
              element: "img",
              src: `${PATHS.HOST_PATH}/images/not-found.png`,
            }),
            El({
              element: "span",
              className: "font-bold text-xl text-black mt-6",
              innerText: "You don't have an order yet",
            }),
            El({
              element: "span",
              className: "font-medium text-md text-black text-center mt-4",
              innerText: "You don't have an active orders at this time",
            }),
          ],
        });
        container.appendChild(notFound);
      }
    }
  });
};

export const orderHeader = () => {
  return El({
    element: "div",
    className: "w-full py-6 px-4 flex items-center justify-between",
    children: [
      El({
        element: "div",
        className: "flex items-center justify-center gap-4",
        children: [
          El({
            element: "div",
            className: "",
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
                innerText: "My Orders",
              }),
            ],
          }),
        ],
      }),
      // section search icon
      El({
        element: "div",
        className: "flex items-center justify-center gap-4",
        children: [
          El({
            element: "span",
            className: "icon-[flowbite--search-outline] w-6 h-6",
            onclick: () => {
              router.navigate(ROUTE.search);
            },
          }),
          El({
            element: "img",
            className: "w-6 h-6",
            src: `${PATHS.HOST_PATH}/images/more.svg`,
          }),
        ],
      }),
    ],
  });
};

export const OrdersPage = () => {
  return El({
    element: "div",
    children: [Orders()],
  });
};
