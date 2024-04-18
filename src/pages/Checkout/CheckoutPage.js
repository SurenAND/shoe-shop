import { Checkout } from "@/templates";
import { El } from "@/utils";

export const CheckoutPage = () => {
  return El({
    element: "div",
    children: [Checkout()],
  });
};
