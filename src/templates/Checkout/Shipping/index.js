import { router } from "@/Routes/router";
import { Button } from "@/components";
import { ROUTE } from "@/constant/routes";
import { El } from "@/utils";

export let finalShipping = {};

const shipping = [
  {
    icon: "icon-[fluent--box-checkmark-20-filled]",
    name: "Economy",
    method: "Estimated Arrival, Dec 20-23",
    price: 10,
  },
  {
    icon: "icon-[f7--shippingbox-fill]",
    name: "Regular",
    method: "Estimated Arrival, Dec 20-22",
    price: 15,
  },
  {
    icon: "icon-[ic--round-local-shipping]",
    name: "Cargo",
    method: "Estimated Arrival, Dec 19-20",
    price: 20,
  },
  {
    icon: "icon-[fa-solid--shipping-fast]",
    name: "Express",
    method: "Estimated Arrival, Dec 18-19",
    price: 30,
  },
];

export const Shipping = () => {
  return El({
    element: "div",
    className:
      "relative overflow-y-scroll pb-16 h-full flex flex-col items-center justify-start",
    children: [
      // header section
      El({
        element: "div",
        className: "w-full px-6 py-5 flex items-center justify-between",
        children: [
          El({
            element: "div",
            className: "flex items-center justify-center gap-4",
            children: [
              El({
                element: "div",
                onclick: (e) => {
                  finalShipping = {};
                  router.navigate(ROUTE.checkout);
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
                    innerText: "Choose Shipping",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      // Shipping address
      El({
        element: "div",
        className: "w-[90%] py-4 flex flex-col items-start justify-start gap-6",
        children: [
          //Shipping Address section
          ...shipping.map((ship) => {
            return El({
              element: "label",
              for: "shipping",
              className: "w-full",
              children: [
                El({
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
                          className: `${ship.icon} w-5 h-5`,
                        }),
                      ],
                    }),
                    El({
                      element: "div",
                      className:
                        "w-full flex items-center justify-between gap-1",
                      children: [
                        // title of selected product
                        El({
                          element: "div",
                          className:
                            "flex flex-col gap-1 items-start justify-between",
                          children: [
                            El({
                              element: "span",
                              className:
                                "w-32 text-shoea text-md font-bold whitespace-nowrap truncate",
                              innerText: ship.name,
                            }),
                            //details of selected Address
                            El({
                              element: "div",
                              className:
                                "flex items-center justify-start text-sm text-gray-500",
                              children: [
                                El({
                                  element: "p",
                                  innerText: ship.method,
                                }),
                              ],
                            }),
                          ],
                        }),
                        El({
                          element: "span",
                          className: "text-shoea text-lg font-bold",
                          innerText: "$ " + ship.price,
                        }),
                        El({
                          element: "input",
                          className:
                            "p-2 border-2 border-black text-black focus:bg-black focus:ring-black focus:ring-offset-white focus:text-black",
                          name: "shipping",
                          type: "radio",
                          onchange: (e) => {
                            e.target.checked === true
                              ? (finalShipping = ship)
                              : null;
                          },
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          }),
        ],
      }),
      // footer
      El({
        element: "div",
        className:
          "fixed bottom-0 w-full p-6 h-28 flex items-start justify-between bg-white",
        children: [
          Button({
            text: "Apply",
            extraClassName:
              "w-full text-white px-[70px] py-4 bg-black font-medium flex items-center justify-center",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  router.navigate(ROUTE.checkout);
                },
              },
            ],
          }),
        ],
      }),
    ],
  });
};
