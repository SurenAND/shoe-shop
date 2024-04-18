import { router } from "@/Routes/router";
import { getData } from "@/api/GET/get";
import { patchData } from "@/api/PATCH/patch";
import { Button, paymentModal } from "@/components";
import { PATHS } from "@/constant/path";
import { ROUTE } from "@/constant/routes";
import { cart } from "@/templates/SingleProduct";
import { El } from "@/utils";
import Cookies from "js-cookie";

let order = {};
const payments = [
  {
    name: "My Wallet",
    icon: `${PATHS.HOST_PATH}/images/navbar/WalletFill.svg`,
    amount: 9379,
  },
  {
    name: "PayPal",
    icon: `${PATHS.HOST_PATH}/images/paypal.png`,
    amount: 0,
  },
  {
    name: "Google Pay",
    icon: `${PATHS.HOST_PATH}/images/google-pay.png`,
    amount: 0,
  },
  {
    name: "Apple Pay",
    icon: `${PATHS.HOST_PATH}/images/apple-logo.png`,
    amount: 0,
  },
  {
    name: "···· ···· ···· 4679",
    icon: `${PATHS.HOST_PATH}/images/mc.png`,
    amount: 0,
  },
];

export const Payment = () => {
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
                className: "",
                onclick: (e) => {
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
                    innerText: "Payment Methods",
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
        className: "w-[90%] py-4 flex flex-col items-start justify-start gap-8",
        children: [
          El({
            element: "p",
            className: "text-sm",
            innerText: "Select the payment method you want to use.",
          }),
          //Shipping Address section
          ...payments.map((pay) => {
            return El({
              element: "label",
              for: "shipping",
              className: "w-full",
              children: [
                El({
                  element: "div",
                  className:
                    "w-full flex items-center gap-4 p-6 shadow-custom rounded-2xl",
                  children: [
                    //location icon
                    El({
                      element: "img",
                      className: "w-10 h-8 flex items-center justify-center",
                      src: pay.icon,
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
                              innerText: pay.name,
                            }),
                            El({
                              element: "div",
                              className: "flex items-center gap-3",
                              children: [
                                El({
                                  element: "span",
                                  className: "text-shoea text-md font-bold",
                                  innerText: "$ " + pay.amount.toLocaleString(),
                                }),
                                El({
                                  element: "label",
                                  className:
                                    "relative flex items-center pr-1 rounded-full",
                                  restAttrs: {
                                    for: `${pay.name}-input`,
                                  },
                                  children: [
                                    El({
                                      element: "input",
                                      name: "shipping",
                                      className:
                                        "peer relative p-2 border-[3px] border-black text-black focus:bg-black focus:ring-black focus:ring-offset-white focus:text-black",
                                      id: `${pay.name}-input`,
                                      type: "radio",
                                    }),
                                    El({
                                      element: "span",
                                      className:
                                        "absolute opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100",
                                      innerHTML: `<svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-3.5 w-3.5"
                                      viewBox="0 0 16 16"
                                      fill="currentColor"
                                    >
                                      <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                    </svg>`,
                                    }),
                                  ],
                                }),
                                // El({
                                //   element: "input",
                                //   className:
                                //     "p-2 border-[3px] border-black text-black focus:bg-black focus:ring-black focus:ring-offset-white focus:text-black",
                                //   name: "shipping",
                                //   type: "radio",
                                //   checked: true,
                                // }),
                              ],
                            }),
                          ],
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
          "fixed bottom-0 w-full p-6 h-28 flex items-start justify-between bg-white shadow-2xl",
        children: [
          Button({
            text: "Confirm Payment",
            extraClassName:
              "w-full text-white px-[70px] py-4 bg-black font-medium flex items-center justify-center",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  getData(`users?_email=${Cookies.get("shoea")}`).then(
                    (data) => {
                      order = {
                        id: Date.now(),
                        status: "completed",
                        cart,
                      };
                      data[0].orders.push(order);
                      data[0].cart = [];
                      patchData(`users/${data[0].id}`, data[0]);
                    }
                  );
                  paymentModal();
                },
              },
            ],
          }),
        ],
      }),
    ],
  });
};
