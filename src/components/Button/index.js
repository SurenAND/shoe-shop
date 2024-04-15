import { El } from "@/utils";

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
    className: "text-sm rounded-full text-center shadow-lg " + extraClassName,
    ...rest,
  });
};
