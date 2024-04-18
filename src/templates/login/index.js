import { Button, CreateInput } from "@/components";
import { PATHS } from "@/constant/path";
import {
  checkValidation,
  emailVlidationCheck,
  passVlidationCheck,
  submitHandler,
} from "@/pages";
import { El } from "@/utils";

export const Login = () => {
  return El({
    element: "div",
    className: "w-full h-screen flex flex-col items-center justify-center pb-8",
    children: [
      El({
        element: "span",
        className:
          "icon-[ion--arrow-back-outline] absolute left-5 top-6 z-50 w-6 h-6",
        onclick: () => {
          window.history.back();
        },
      }),
      El({
        element: "img",
        src: `${PATHS.HOST_PATH}/images/logo.svg`,
      }),
      El({
        element: "span",
        className: "text-black text-[32px] text-center font-semibold mt-24",
        innerText: "Login to Your Account",
      }),
      El({
        element: "form",
        id: "login-form",
        className: "w-full px-8 text-center flex flex-col gap-6 mt-10",
        eventListener: [
          {
            event: "change",
            callback: (e) => {
              checkValidation();
            },
          },
          {
            event: "submit",
            callback: submitHandler,
          },
        ],
        children: [
          CreateInput({
            icon: "icon-[uiw--mail]",
            placeholder: "Email",
            name: "email",
            type: "email",
            id: "email",
            eventListener: [
              {
                event: "input",
                callback: (e) => {
                  const parent = e.currentTarget.parentElement;
                  emailVlidationCheck(e.currentTarget.value)
                    ? (parent.classList.remove("border-2", "border-black"),
                      parent.classList.add(
                        "border-2",
                        "border-black",
                        "text-gray-900"
                      ))
                    : (parent.classList.add("text-gray-500"),
                      parent.classList.remove("border-2", "border-black"));

                  checkValidation();
                },
              },
            ],
          }),
          CreateInput({
            icon: "icon-[bxs--lock-alt]",
            showIcon: "icon-[mdi--hide]",
            isPass: true,
            placeholder: "Password",
            type: "password",
            name: "password",
            id: "password",
            eventListener: [
              {
                event: "input",
                callback: (e) => {
                  const parent = e.currentTarget.parentElement;
                  passVlidationCheck(e.currentTarget.value)
                    ? (parent.classList.remove("border-2", "border-black"),
                      parent.classList.add(
                        "border-2",
                        "border-black",
                        "text-gray-900"
                      ))
                    : (parent.classList.add("text-gray-500"),
                      parent.classList.remove("border-2", "border-black"));

                  checkValidation();
                },
              },
            ],
          }),
          El({
            element: "div",
            className: "flex items-center justify-center gap-1",
            children: [
              El({
                element: "input",
                id: "remember",
                name: "remember",
                className:
                  "border border-gray-200 rounded-sm checked:bg-black focus:ring-transparent",
                type: "checkbox",
              }),
              El({
                element: "label",
                for: "remember",
                className: "text-[16px]",
                innerText: "Remember me",
              }),
            ],
          }),
          El({
            element: "span",
            id: "wrong-msg",
            className:
              "text-red-500 flex items-center justify-center w-full hidden",
            innerText: "incorrect email or password",
          }),
          Button({
            text: "Sign in",
            extraClassName:
              "text-white bg-shoea w-full mt-28 bg-opacity-50 px-4 py-3",
            id: "login-btn",
            type: "submit",
            disabled: true,
          }),
        ],
      }),
    ],
  });
};
