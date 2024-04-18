import { getData } from "@/api/GET/get";
import { cart, colorStyle, updateCart } from "../SingleProduct";
import { El } from "@/utils";
import { PATHS } from "@/constant/path";
import { Button } from "@/components";
import { router } from "@/Routes/router";
import { ROUTE } from "@/constant/routes";
import { finalShipping } from "./Shipping";
import { finalAddress } from "./Address";
import Cookies from "js-cookie";

let amount = 0;
let promo = 0;
let shippingPrice = 0;
let finalPrice = 0;
// render function for order list
const renderOrderList = () => {
  getData(`users?_email=${Cookies.get("shoea")}`).then((data) => {
    const orderList = document.getElementById("order-list");
    const amountPrice = document.getElementById("amount-price");
    const totalPrice = document.getElementById("total-price");
    const shipPrice = document.getElementById("shipping-price");
    orderList.innerHTML = "";

    // update cart data in local variable based on server data
    updateCart(data[0].cart);

    cart.map((item) => {
      getData(`products/${item.id}`).then((data) => {
        const product = data;
        //update total price of each item
        item.totalPrice = item.quantity * product.price;
        // calculate total price of all products and apply to UI
        amount += item.totalPrice;
        if (amount !== 0) {
          amountPrice.innerText = "$ " + amount.toFixed(2);
        }
        // calculate shipping price
        shippingPrice = finalShipping.price ? finalShipping.price : 0;
        if (shippingPrice !== 0) {
          shipPrice.innerText = "$ " + shippingPrice.toFixed(2);
        }

        // calculate final price: products & shipping price & promo price
        finalPrice = amount + shippingPrice;

        if (finalPrice !== 0) {
          totalPrice.innerText = "$ " + finalPrice.toFixed(2);
        }
        orderList.appendChild(
          El({
            element: "div",
            className:
              "w-full flex items-center gap-2 mx-1 p-4 shadow-custom rounded-2xl",
            children: [
              El({
                element: "img",
                className: "rounded-lg w-32 aspect-square	mr-2",
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
                          "w-32 text-shoea text-lg font-bold whitespace-nowrap truncate",
                        innerText: item.name,
                      }),
                    ],
                  }),
                  //details of selected product
                  El({
                    element: "div",
                    className: "w-full flex items-center justify-start gap-2 ",
                    children: [
                      El({
                        element: "div",
                        className: `w-5 h-5 ${
                          colorStyle[item.color].bg
                        } flex items-center justify-center rounded-full cursor-pointer`,
                      }),
                      El({
                        element: "span",
                        className: `text-gray-500 text-sm capitalize`,
                        innerText: item.color,
                      }),
                      El({
                        element: "div",
                        className: `w-1 h-3 border-r-2 border-gray-400`,
                      }),
                      El({
                        element: "span",
                        className: `text-gray-500 text-sm capitalize`,
                        innerText: "size = ",
                      }),
                      El({
                        element: "span",
                        className: `text-gray-500 text-sm capitalize`,
                        innerText: item.size,
                      }),
                    ],
                  }),
                  //product total price and quantity handel button
                  El({
                    element: "div",
                    className: "w-full flex items-center justify-between gap-6",
                    children: [
                      El({
                        element: "span",
                        className: "text-shoea text-lg font-bold",
                        innerText: `$ ${item.totalPrice.toFixed(2)}`,
                      }),
                      El({
                        element: "div",
                        className:
                          "w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center p-2",
                        children: [
                          El({
                            element: "span",
                            className: "font-bold text-xs",
                            innerHTML: item.quantity,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
        );
      });
    });
  });
};
// header of checkout page
const header = () => {
  return El({
    element: "div",
    className: "w-full px-2 py-4 flex items-center justify-between",
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
                innerText: "Checkout",
              }),
            ],
          }),
        ],
      }),
      // More icon
      El({
        element: "img",
        src: `${PATHS.HOST_PATH}/images/more.svg`,
      }),
    ],
  });
};
//footer of checkout page
const footer = () => {
  return El({
    element: "div",
    className:
      "fixed bottom-0 w-full p-6 h-28 flex items-start justify-between bg-white shadow-2xl",
    children: [
      Button({
        text: "Continue to Payment",
        extraClassName:
          "text-white w-full py-4 bg-black font-medium flex items-center justify-center gap-4 flex-row-reverse",
        icon: "icon-[grommet-icons--link-next]",
        id: "to-payment",
        eventListener: [
          {
            event: "click",
            callback: (e) => {
              if (finalPrice > 0 && shippingPrice > 0) {
                router.navigate(ROUTE.payment);
              }
            },
          },
        ],
      }),
    ],
  });
};

export const Checkout = () => {
  setTimeout(() => {
    amount = 0;
    promo = 0;
    shippingPrice = 0;
    finalPrice = 0;
    renderOrderList();
  }, 0);
  return El({
    element: "div",
    className:
      "relative px-4 overflow-y-scroll pb-16 h-full flex flex-col items-center justify-start",
    children: [
      header(),
      // Shipping address
      El({
        element: "div",
        className:
          "w-full px-2 py-4 border-b border-gray-100 flex flex-col items-start justify-start gap-6",
        children: [
          El({
            element: "span",
            className: "text-xl font-semibold",
            innerText: "Shipping Address",
          }),
          //Shipping Address section
          El({
            element: "div",
            className:
              "w-full flex items-center gap-4 mx-1 p-4 shadow-custom rounded-2xl",
            children: [
              El({
                element: "span",
                className:
                  "p-[6px] rounded-full border-[6px] border-gray-200 bg-black text-white flex items-center justify-center",
                children: [
                  El({
                    element: "span",
                    className: "icon-[mdi--location] text-lg",
                  }),
                ],
              }),
              El({
                element: "div",
                className: "w-full flex items-center justify-between",
                children: [
                  // title of selected product
                  El({
                    element: "div",
                    className:
                      "w-full flex flex-col gap-2 items-start justify-between ",
                    children: [
                      El({
                        element: "span",
                        className:
                          "w-32 text-shoea text-md font-bold whitespace-nowrap truncate",
                        innerText: finalAddress.name,
                      }),
                      //details of selected product
                      El({
                        element: "div",
                        className:
                          "w-full flex items-center justify-start gap-2 text-sm text-gray-500",
                        children: [
                          El({
                            element: "p",
                            innerText: finalAddress.address,
                          }),
                        ],
                      }),
                    ],
                  }),
                  El({
                    element: "span",
                    className: "icon-[iconamoon--edit-fill] w-6 h-6",
                    onclick: (e) => {
                      router.navigate(ROUTE.shippingAddress);
                    },
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      //order list
      El({
        element: "div",
        className:
          "w-full px-2 py-4 border-b border-gray-100 flex flex-col items-start justify-start gap-6",
        children: [
          El({
            element: "span",
            className: "text-xl font-semibold",
            innerText: "Order List",
          }),
          //order list items
          El({
            element: "div",
            id: "order-list",
            className: "w-full flex flex-col items-center justify-start gap-4",
          }),
        ],
      }),
      //Shipping Method
      El({
        element: "div",
        className:
          "w-full px-2 py-4 border-b border-gray-100 flex flex-col items-start justify-start gap-6",
        children: [
          El({
            element: "span",
            className: "text-xl font-semibold",
            innerText: "Choose Shipping",
          }),
          //Shipping method section
          El({
            element: "div",
            className: "w-full",
            children: [
              finalShipping.hasOwnProperty("name")
                ? El({
                    element: "div",
                    className:
                      "w-full flex items-center gap-4 p-4 shadow-custom rounded-2xl",
                    children: [
                      //location icon
                      El({
                        element: "span",
                        className:
                          "rounded-full bg-shoea text-white p-4 flex items-center justify-center",
                        children: [
                          El({
                            element: "span",
                            className: `${finalShipping.icon} w-5 h-5`,
                          }),
                        ],
                      }),
                      El({
                        element: "div",
                        className: "w-full flex items-center justify-between",
                        children: [
                          // title of selected product
                          El({
                            element: "div",
                            className:
                              "flex flex-col gap-2 items-start justify-between ",
                            children: [
                              El({
                                element: "span",
                                className:
                                  "w-32 text-shoea text-lg font-bold whitespace-nowrap truncate",
                                innerText: finalShipping.name,
                              }),
                              //details of selected Address
                              El({
                                element: "div",
                                className:
                                  "flex items-center justify-start text-sm text-gray-500",
                                children: [
                                  El({
                                    element: "p",
                                    innerText: finalShipping.method,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          El({
                            element: "span",
                            className: "text-shoea text-lg font-bold",
                            innerText: "$ " + finalShipping.price,
                          }),
                          El({
                            element: "span",
                            className: "icon-[iconamoon--edit-fill] w-6 h-6",
                            onclick: (e) => {
                              router.navigate(ROUTE.shippingMethod);
                            },
                          }),
                        ],
                      }),
                    ],
                  })
                : El({
                    element: "div",
                    onclick: () => {
                      router.navigate(ROUTE.shippingMethod);
                    },
                    className:
                      "w-full flex items-center gap-4 p-4 shadow-custom rounded-2xl",
                    children: [
                      El({
                        element: "span",
                        className:
                          "icon-[ic--round-local-shipping] w-6 h-6 flex items-center justify-center",
                      }),
                      El({
                        element: "div",
                        className:
                          "w-full flex flex-col gap-2 items-start justify-between ",
                        children: [
                          // title of selected product
                          El({
                            element: "div",
                            className:
                              "w-full flex items-center justify-between",
                            children: [
                              El({
                                element: "span",
                                className: "text-shoea text-md font-bold",
                                innerText: "Choose Shipping Type",
                              }),
                              El({
                                element: "span",
                                className:
                                  "icon-[ic--sharp-navigate-next] text-gray-500 w-6 h-6",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
            ],
          }),
        ],
      }),
      //promo section
      El({
        element: "div",
        className:
          "w-full px-2 py-4 flex flex-col items-start justify-start gap-6",
        children: [
          El({
            element: "span",
            className: "text-xl font-semibold",
            innerText: "Promo Code",
          }),
          //Shipping Address section
          El({
            element: "form",
            eventListener: [
              {
                event: "submit",
                callback: (e) => {
                  e.preventDefault();
                  const promo = e.target.promoCode;
                  getData(`users?email=${Cookies.get("shoea")}`).then(
                    (data) => {
                      const user = data[0];
                      user.promo.map((disc) => {
                        if (
                          promo.value.toLowerCase() === disc.text.toLowerCase()
                        ) {
                          e.target.promoCode.classList.add("hidden");
                          e.target.prepend(
                            El({
                              element: "div",
                              id: "discount",
                              className:
                                "flex items-center gap-4 bg-black text-white font-semibold text-sm px-5 py-3 rounded-full",
                              children: [
                                El({
                                  element: "span",
                                  innerText: `Discount ${disc.percent}% off`,
                                }),
                                El({
                                  element: "button",
                                  className:
                                    "icon-[heroicons--plus-16-solid] w-4 h-4 rotate-45",
                                  onclick: (e) => {
                                    document
                                      .getElementById("discount")
                                      .remove();
                                    document
                                      .getElementById("promo-code")
                                      .classList.remove("hidden");

                                    document.getElementById(
                                      "total-price"
                                    ).innerText = `$ ${finalPrice}`;
                                    document
                                      .getElementById("promo-price-section")
                                      .classList.add("hidden");
                                  },
                                }),
                              ],
                            })
                          );

                          // //update promo price
                          let newFinalPrice =
                            finalPrice -
                            Math.floor(amount * (disc.percent / 100));

                          document.getElementById(
                            "promo-price"
                          ).innerText = `-$ ${Math.floor(
                            amount * (disc.percent / 100)
                          )}`;
                          document.getElementById(
                            "total-price"
                          ).innerText = `$ ${newFinalPrice}`;
                          document
                            .getElementById("promo-price-section")
                            .classList.remove("hidden");
                          e.target.reset();
                        } else {
                          e.target.reset();
                          e.target.promoCode.placeholder = "No promotion code!";
                          e.target.promoCode.classList.add(
                            "placeholder:text-red-500"
                          );
                        }
                      });
                    }
                  );
                },
              },
            ],
            className: "w-full flex items-center justify-start gap-2 py-4",
            children: [
              El({
                element: "input",
                name: "promoCode",
                id: "promo-code",
                className:
                  "w-[90%] text-xs bg-gray-100 rounded-2xl p-4 focus:outline-none placeholder:text-gray-400",
                placeholder: "Enter Promo Code",
              }),
              El({
                element: "button",
                type: "submit",
                className:
                  "text-white flex items-center justify-center bg-black rounded-full w-10 h-10",
                children: [
                  El({
                    element: "span",
                    className: "icon-[heroicons--plus-16-solid] w-4 h-4",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      //price section
      El({
        element: "div",
        className:
          "w-[95%] bg-white shadow-custom rounded-lg p-5 mt-4 mb-20 flex flex-col items-start justify-start gap-6",
        children: [
          El({
            element: "div",
            className: "w-full flex items-center justify-between",
            children: [
              El({
                element: "span",
                className: "text-gray-500",
                innerText: "Amount",
              }),
              El({
                element: "span",
                id: "amount-price",
                innerText: "-",
              }),
            ],
          }),
          //shipping price section
          El({
            element: "div",
            className: "w-full flex items-center justify-between",
            children: [
              El({
                element: "span",
                className: "text-gray-500",
                innerText: "Shipping",
              }),
              El({
                element: "span",
                id: "shipping-price",
                innerText: "-",
              }),
            ],
          }),
          // promo price section
          El({
            element: "div",
            id: "promo-price-section",
            className: "w-full flex items-center justify-between hidden",
            children: [
              El({
                element: "span",
                className: "text-gray-500",
                innerText: "Promo",
              }),
              El({
                element: "span",
                id: "promo-price",
                innerText: "-",
              }),
            ],
          }),
          //total price section
          El({
            element: "div",
            className:
              "w-full flex items-center justify-between border-t border-gray-200 pt-8",
            children: [
              El({
                element: "span",
                innerText: "Total",
              }),
              El({
                element: "span",
                id: "total-price",
                innerText: "-",
              }),
            ],
          }),
        ],
      }),
      // footer
      footer(),
    ],
  });
};
