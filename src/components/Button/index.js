import { El } from "@/utils";

// const variants = {
//   contained:
//     "text-white bg-black font-medium rounded-full text-md w-[21rem] px-8 py-2.5 text-center dark:bg-blue-600 shadow-lg",
//   cart: "text-white bg-black font-medium rounded-full text-md px-8 py-4 text-center dark:bg-blue-600 shadow-lg",
//   cancel:
//     "text-shoea bg-gray-200 font-medium rounded-full text-md px-8 py-4 text-center dark:bg-blue-600 shadow-sm",
// };

export const Button = ({ text, extraClassName = "", icon = "", ...rest }) => {
  return El({
    element: "button",
    children: [
      El({
        element: "span",
        className: `${icon} text-white`,
      }),
      text,
    ],
    className:
      "text-white bg-shoea text-sm rounded-full px-4 py-3 text-center shadow-lg " +
      extraClassName,
    ...rest,
  });
};
