import { navbar } from "@/layout";
import { orderHeader, orderRender } from "@/pages";
import { El } from "@/utils";

export const Orders = () => {
  setTimeout(() => {
    const active = document.getElementById("active");
    active.classList.add(
      "border-b-4",
      "border-shoea",
      "text-shoea",
      "font-bold"
    );
    orderRender();
  }, 0);
  return El({
    element: "div",
    className: "h-full flex flex-col items-center justify-start",
    children: [
      orderHeader(),
      El({
        element: "div",
        className:
          "w-full px-4 pb-4 mt-4 text-xl flex items-center justify-center",
        children: [
          El({
            element: "div",
            id: "active",
            onclick: (e) => {
              const active = document.getElementById("active");
              const Completed = document.getElementById("Completed");
              Completed.classList.remove(
                "border-b-4",
                "border-shoea",
                "text-shoea",
                "font-bold"
              );
              active.classList.add(
                "border-b-4",
                "border-shoea",
                "text-shoea",
                "font-bold"
              );
              orderRender("active");
            },
            className:
              "w-1/2 p-2 text-gray-500 flex items-center justify-center border-b-2 border-gray-200",
            children: [
              El({
                element: "span",
                innerText: "Active",
              }),
            ],
          }),
          El({
            element: "div",
            id: "Completed",
            onclick: (e) => {
              const active = document.getElementById("active");
              const Completed = document.getElementById("Completed");
              Completed.classList.add(
                "border-b-4",
                "border-shoea",
                "text-shoea",
                "font-bold"
              );
              active.classList.remove(
                "border-b-4",
                "border-shoea",
                "text-shoea",
                "font-bold"
              );
              orderRender("completed");
            },
            className:
              "w-1/2 p-2 text-gray-500 flex items-center justify-center border-b-2 border-gray-200",
            children: [
              El({
                element: "span",
                innerText: "Complete",
              }),
            ],
          }),
        ],
      }),
      El({
        element: "div",
        id: "order-section",
        className:
          "w-full px-3 py-4 pb-24 flex flex-col items-center justify-start gap-6 overflow-y-scroll",
      }),
      navbar("orders"),
    ],
  });
};
