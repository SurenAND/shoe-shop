import { router } from "@/Routes/router";
import { PATHS } from "@/constant/path";
import { ROUTE } from "@/constant/routes";
import { El } from "@/utils";
import { Button } from "../Button";

export const paymentModal = () => {
  const mainElem = document.getElementById("app");
  const modal = El({
    element: "div",
    id: "pay-modal-section",
    className:
      "fixed top-0 w-full h-full px-8 bg-shoea bg-opacity-80 flex items-center justify-center",
    onclick: (e) => {
      if (e.target.closest("#payment-modal")) return;
      document.getElementById("pay-modal-section").remove();
      router.navigate(ROUTE.home);
    },
    children: [
      // delete modal dialog section
      El({
        element: "div",
        id: "payment-modal",
        className:
          "w-full flex flex-col items-center justify-between bg-white rounded-[3rem] overflow-hidden py-5 px-2",
        children: [
          El({
            element: "div",
            className: "w-full flex item-center justify-center",
            children: [
              El({
                element: "img",
                className: "my-5",
                src: `${PATHS.HOST_PATH}/images/payment-confirm.jpg`,
              }),
            ],
          }),
          // item details of modal
          El({
            element: "h1",
            className: "text-shoea text-2xl font-semibold mb-5",
            innerText: "Order Successful!",
          }),
          El({
            element: "p",
            className: "text-gray-600 text-lg mb-5",
            innerText: "You Have Successfully mode order",
          }),
          // footer of modal dialog
          El({
            element: "div",
            className:
              "w-full flex flex-col flex-col item-center justify-between gap-4 p-4",
            children: [
              Button({
                text: "View Order",
                extraClassName:
                  "text-white px-[70px] py-4 bg-black font-medium gap-4",
                eventListener: [
                  {
                    event: "click",
                    callback: (e) => {
                      router.navigate(ROUTE.orders);
                      document.getElementById("delete-modal-section").remove();
                    },
                  },
                ],
              }),
              Button({
                text: "View E-Receipt",
                extraClassName:
                  "text-shoea bg-gray-200 px-16 py-4 font-medium shadow-sm",
              }),
            ],
          }),
        ],
      }),
    ],
  });
  mainElem.appendChild(modal);
};
