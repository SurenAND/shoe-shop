import { El } from "@/utils";

const passIcon = (showIcon) => {
  return El({
    element: "span",
    className: `${showIcon} absolute top-3 right-4 w-[14px] h-[14px] cursor-pointer`,
    id: "pass-icon",
    onclick: (e) => {
      if (document.getElementById("password").type === "password") {
        document.getElementById("password").type = "text";
        document.getElementById("pass-icon").classList.add("icon-[mdi--eye]");
        document.getElementById("pass-icon").classList.remove(`${showIcon}`);
      } else if (document.getElementById("password").type === "text") {
        document.getElementById("password").type = "password";
        document
          .getElementById("pass-icon")
          .classList.remove("icon-[mdi--eye]");
        document.getElementById("pass-icon").classList.add(`${showIcon}`);
      }
    },
  });
};

const filterIcon = (showIcon) => {
  return El({
    element: "span",
    className: `${showIcon} absolute top-3 right-4 w-[14px] h-[14px] cursor-pointer`,
  });
};

export function CreateInput({
  icon,
  showIcon = "",
  isPass = false,
  isFilter = false,
  ...restProps
}) {
  return El({
    element: "div",
    className: `relative text-gray-500 text-left px-7 py-2 bg-gray-100 rounded-md`,
    children: [
      El({
        className: `w-full px-1 py-0 bg-gray-100 border-none focus:ring-0 focus:outline-none`,
        element: "input",
        autocomplete: "off",
        ...restProps,
      }),
      El({
        element: "span",
        className: `${icon} login-icon absolute top-3 left-3 w-[14px] h-[14px]`,
      }),
      isPass ? passIcon(showIcon) : "",
      isFilter ? filterIcon(showIcon) : "",
    ],
  });
}
