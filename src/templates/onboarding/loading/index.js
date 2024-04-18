import { spinner } from "@/components";
import { PATHS } from "@/constant/path";
import { El } from "@/utils";

export const Loading = () => {
  return El({
    element: "div",
    id: "loading",
    className:
      "w-full h-full flex flex-col items-center justify-end gap-48 transition ease-linear duration-500 transform",
    children: [
      El({
        element: "div",
        className: "flex items-center justify-center gap-2",
        children: [
          El({
            element: "img",
            src: `${PATHS.HOST_PATH}/images/shoea.svg`,
          }),
          El({
            element: "span",
            className: "text-shoea font-bold text-[52px]",
            innerText: "Shoea",
          }),
        ],
      }),
      El({
        element: "div",
        className: "my-28",
        children: [spinner()],
      }),
    ],
  });
};
