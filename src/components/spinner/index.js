import { PATHS } from "@/constant/path";
import { El } from "@/utils";

export const spinner = () => {
  return El({
    element: "img",
    className: "w-12 h-12 flex items-center justify-center",
    src: `${PATHS.HOST_PATH}/images/spinner.svg`,
  });
};
