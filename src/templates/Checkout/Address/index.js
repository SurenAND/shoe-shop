import { router } from "@/Routes/router";
import { Button } from "@/components";
import { ROUTE } from "@/constant/routes";
import { El } from "@/utils";

export let finalAddress = {
  name: "Home",
  address: "61480 Sunbrook Park, PC 5679",
};
let selectedAddress = finalAddress;

const address = [
  {
    name: "Home",
    default: "block",
    address: "61480 Sunbrook Park, PC 5679",
  },
  {
    name: "Office",
    default: "hidden",
    address: "6993 Meadaw Valley Terra, PC 3637",
  },
  {
    name: "Apartment",
    default: "hidden",
    address: "21833 Clyde Gallagher, PC 4662",
  },
  {
    name: "Parent's House",
    default: "hidden",
    address: "5259 Blue Bill Park, PC 4627",
  },
];

export const Address = () => {
  return El({
    element: "div",
    className:
      "relative px-4 overflow-y-scroll pb-16 h-full flex flex-col items-center justify-start",
    children: [
      // header section
      El({
        element: "div",
        className: "w-full py-5 flex items-center justify-between",
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
                    innerText: "Shipping Address",
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
        className: "w-full py-4 flex flex-col items-start justify-start gap-6",
        children: [
          //Shipping Address section
          ...address.map((addr) => {
            return El({
              element: "label",
              for: "address",
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
                                "w-32 flex gap-2 text-shoea text-md font-bold whitespace-nowrap truncate",
                              children: [
                                addr.name,
                                // status
                                El({
                                  element: "span",
                                  className: `bg-gray-200 mr-4 py-1.5 px-3 rounded-lg font-medium text-[10px] ${addr.default}`,
                                  innerText: "Default",
                                }),
                              ],
                              // innerText: addr.name,
                            }),
                            //details of selected Address
                            El({
                              element: "div",
                              className:
                                "flex items-center justify-start text-sm text-gray-500",
                              children: [
                                El({
                                  element: "p",
                                  innerText: addr.address,
                                }),
                              ],
                            }),
                          ],
                        }),
                        El({
                          element: "label",
                          className:
                            "relative flex items-center p-3 rounded-full",
                          restAttrs: {
                            for: `${addr.name}-input`,
                          },
                          children: [
                            El({
                              element: "input",
                              name: "address",
                              className:
                                "peer relative p-2 border-[3px] border-black text-black focus:bg-black focus:ring-black focus:ring-offset-white focus:text-black",
                              id: `${addr.name}-input`,
                              type: "radio",
                              onchange: (e) => {
                                e.target.checked === true
                                  ? (selectedAddress = addr)
                                  : null;
                              },
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
                        //   name: "address",
                        //   checked: true,
                        //   type: "radio",
                        //   onchange: (e) => {
                        //     e.target.checked === true
                        //       ? (selectedAddress = addr)
                        //       : null;
                        //   },
                        // }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          }),
          Button({
            text: "Add New Address",
            extraClassName:
              "w-full text-shoea px-[70px] py-4 bg-gray-200 font-semibold flex items-center justify-center shadow-none ",
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
            text: "Apply",
            extraClassName:
              "w-full text-white px-[70px] py-4 bg-black font-medium flex items-center justify-center",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  finalAddress = selectedAddress;
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
