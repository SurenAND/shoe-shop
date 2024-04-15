import { getData } from "@/api/GET/get";
import { patchData } from "@/api/PATCH/patch";
import { deleteModal } from "@/components";
import { Cart, cart, colorStyle, updateCart } from "@/templates";
import { El } from "@/utils";
import Cookies from "js-cookie";

export const checkoutPrice = (cart) => {
  const checkout = document.getElementById("checkout-price");
  let price = 0;
  cart.map((item) => {
    price += item.totalPrice;
  });
  checkout.innerText = `$ ${price.toFixed(2)}`;
};

export const cartRender = () => {
  getData(`users?_email=${Cookies.get("shoea")}`).then((data) => {
    const container = document.getElementById("cart-section");
    container.innerHTML = "";
    // update cart data in local variable based on server data
    updateCart(data[0].cart);
    //update total price
    checkoutPrice(cart);
    // create a card of product in cart
    cart.forEach((item) => {
      getData(`products/${item.id}`).then((data) => {
        const product = data;
        const elem = El({
          element: "div",
          className:
            "max-h-sm w-full flex items-center gap-2 p-4 shadow-[rgba(0,_0,_0,_0.1)_0px_4px_12px] rounded-2xl",
          children: [
            El({
              element: "img",
              className: "rounded-lg w-32 aspect-square	",
              src: item.img,
            }),
            El({
              element: "div",
              className:
                "w-full flex flex-col gap-2 items-start justify-between ",
              children: [
                // title of selected product
                El({
                  element: "div",
                  className: "w-full flex items-center justify-between",
                  children: [
                    El({
                      element: "span",
                      className:
                        "w-32 text-shoea text-xl font-bold whitespace-nowrap truncate",
                      innerText: item.name,
                    }),
                    El({
                      element: "span",
                      className:
                        "icon-[solar--trash-bin-minimalistic-2-outline] flex justify-end w-6 h-6",
                      onclick: (e) => {
                        deleteModal(item);
                      },
                    }),
                  ],
                }),
                //details of selected product
                El({
                  element: "div",
                  className: "w-full flex items-center justify-start gap-2 ",
                  children: [
                    El({
                      element: "div",
                      className: `w-5 h-5 ${
                        colorStyle[item.color].bg
                      } flex items-center justify-center rounded-full cursor-pointer`,
                    }),
                    El({
                      element: "span",
                      className: `text-shoea text-md font-semibold`,
                      innerText: item.color,
                    }),
                    El({
                      element: "div",
                      className: `w-1 h-5 border-r-2 border-gray-500`,
                    }),
                    El({
                      element: "span",
                      className: `text-shoea text-md font-semibold`,
                      innerText: "size",
                    }),
                    El({
                      element: "span",
                      className: `text-shoea text-md font-semibold`,
                      innerText: item.size,
                    }),
                  ],
                }),
                //product total price and quantity handel button
                El({
                  element: "div",
                  className: "w-full flex items-center justify-start gap-6",
                  children: [
                    El({
                      element: "span",
                      id: `item-price-${item.id}`,
                      className: "text-shoea text-lg font-bold",
                      innerText: `$ ${item.totalPrice}`,
                    }),
                    El({
                      element: "div",
                      className:
                        "w-24 h-10 bg-gray-200 rounded-full flex items-center justify-between p-4",
                      children: [
                        El({
                          element: "span",
                          className: "icon-[flowbite--minus-outline] w-5 h-5",
                          onclick: (e) => {
                            item.quantity > 1
                              ? item.quantity--
                              : deleteModal(item);

                            item.totalPrice = product.price * item.quantity;

                            document.getElementById(
                              `item-quantity-${item.id}`
                            ).innerText = item.quantity;

                            document.getElementById(
                              `item-price-${item.id}`
                            ).innerText = `$ ${item.totalPrice}`;

                            updateCartData(cart);
                          },
                        }),
                        El({
                          element: "span",
                          id: `item-quantity-${item.id}`,
                          className: "font-bold",
                          innerHTML: item.quantity,
                        }),
                        El({
                          element: "span",
                          className: "icon-[heroicons--plus-16-solid] w-5 h-5",
                          onclick: (e) => {
                            item.quantity < +product["items_left"]
                              ? item.quantity++
                              : item.quantity;

                            item.totalPrice = product.price * item.quantity;
                            document.getElementById(
                              `item-quantity-${item.id}`
                            ).innerText = item.quantity;

                            document.getElementById(
                              `item-price-${item.id}`
                            ).innerText = `$ ${item.totalPrice}`;

                            updateCartData(cart);
                          },
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
        container.appendChild(elem);
      });
    });
  });
};

export const updateCartData = (cart) => {
  getData(`users?_email=${Cookies.get("shoea")}`).then((data) => {
    const user = data[0];
    user.cart = cart;
    patchData(`users/${user.id}`, user).then(() => {
      //rerender the cart
      cartRender();
    });
  });
  //update total price
  checkoutPrice(cart);
};

export const CartPage = () => {
  return El({
    element: "div",
    children: [Cart()],
  });
};
