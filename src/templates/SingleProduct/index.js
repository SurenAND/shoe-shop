import { Button } from "@/components";
import { PATHS } from "@/constant/path";
import { addToCart, addToWishList, isInWishlist } from "@/pages";
import { El, deleteFromWL } from "@/utils";
import Swiper from "swiper";

export let cart = [];

export const updateCart = (newCart) => {
  cart = newCart;
};

let productInfo;

const renderSize = (sizes, index = 0) => {
  const elem = document.getElementById("size");
  elem.innerHTML = "";
  sizes.map((size, i) => {
    if (index === i) {
      elem.append(
        El({
          element: "div",
          className:
            "w-9 h-9 flex items-center justify-center bg-shoea border-2 border-shoea rounded-full text-white cursor-pointer",
          innerText: size,
          onclick: (e) => {
            productInfo.size = size;
            renderSize(sizes, i);
          },
        })
      );
    } else {
      elem.append(
        El({
          element: "div",
          className:
            "w-9 h-9 flex items-center justify-center border-2 border-gray-400 rounded-full text-gray-400 cursor-pointer ",
          innerText: size,
          onclick: (e) => {
            productInfo.size = size;
            renderSize(sizes, i);
          },
        })
      );
    }
  });
};

export const colorStyle = {
  black: {
    bg: "bg-shoea",
    fill: "text-white",
  },
  brown: {
    bg: "bg-yellow-800",
    fill: "text-white",
  },
  white: {
    bg: "bg-gray-200",
    fill: "text-shoea",
  },
  blue: {
    bg: "bg-blue-500",
    fill: "text-shoea",
  },
  red: {
    bg: "bg-red-500",
    fill: "text-shoea",
  },
};

const renderColor = (colors, index = 0) => {
  const elem = document.getElementById("color");
  elem.innerHTML = "";
  colors.map((color, i) => {
    if (index === i) {
      elem.append(
        El({
          element: "div",
          className: `${colorStyle[color].bg} w-9 h-9 flex items-center justify-center rounded-full cursor-pointer`,
          children: [
            El({
              element: "span",
              className: `${colorStyle[color].fill} icon-[jam--check] w-6 h-6`,
            }),
          ],
          onclick: (e) => {
            productInfo.color = color;
            renderColor(colors, i);
          },
        })
      );
    } else {
      elem.append(
        El({
          element: "div",
          className: `${colorStyle[color].bg} w-9 h-9 flex items-center justify-center rounded-full cursor-pointer `,
          onclick: (e) => {
            productInfo.color = color;
            renderColor(colors, i);
          },
        })
      );
    }
  });
};

const productSwiper = () => {
  const swiper = new Swiper(".pswiper", {
    loop: true,
    autoplay: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
};

export const SingleProduct = (product) => {
  setTimeout(() => {
    isInWishlist();
    renderSize(product.sizes);
    renderColor(product.colors);
    productSwiper();
  }, 0);
  // initialize product info
  productInfo = {
    id: "",
    name: "",
    img: "",
    size: 0,
    color: "",
    quantity: 1,
    totalPrice: 0,
  };
  productInfo.id = product.id;
  productInfo.name = product.name;
  productInfo.img = product.imageURL;
  productInfo.size = product.sizes[0];
  productInfo.color = product.colors[0];
  productInfo.totalPrice += product.price;
  return El({
    element: "div",
    className: "relative w-full h-full flex flex-col items-start justify-start",
    children: [
      El({
        element: "span",
        className:
          "icon-[ion--arrow-back-outline] text-gray-500 absolute left-5 top-6 z-50 w-6 h-6",
        onclick: () => {
          window.history.back();
        },
      }),
      // image section
      El({
        element: "div",
        className: "swiper pswiper w-full aspect-square",
        children: [
          El({
            element: "div",
            className: "swiper-wrapper",
            children: [
              El({
                element: "div",
                className: "swiper-slide",
                children: [
                  El({
                    element: "img",
                    className: "w-full h-full",
                    src: product.imageURL,
                  }),
                ],
              }),
              El({
                element: "div",
                className: "swiper-slide",
                children: [
                  El({
                    element: "img",
                    src: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg",
                  }),
                ],
              }),
              El({
                element: "div",
                className: "swiper-slide",
                children: [
                  El({
                    element: "img",
                    src: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-5cc7de3b-2afc-49c2-a1e4-0508997d09e6/react-miler-mens-running-shoe-DgF6nr.jpg",
                  }),
                ],
              }),
            ],
          }),
          El({
            element: "div",
            className: "swiper-pagination",
          }),
        ],
      }),
      //content section
      El({
        element: "div",
        className:
          "w-full px-6 gap-3 py-2 flex flex-col items-start justify-between",
        children: [
          // title and rating section
          El({
            element: "div",
            className:
              "w-full flex flex-col gap-4 pb-2 border-b-2 border-gray-100",
            children: [
              El({
                element: "div",
                className: "w-full flex items-center justify-between mt-4",
                children: [
                  El({
                    element: "span",
                    className:
                      "w-[80%] text-shoea text-3xl font-bold whitespace-nowrap truncate",
                    innerText: product.name,
                  }),
                  El({
                    element: "img",
                    className: "flex justify-end",
                    id: "product-wl-icon",
                    src: `${PATHS.HOST_PATH}/images/like.svg`,
                    onclick: (e) => {
                      if (
                        e.target.src === `${PATHS.HOST_PATH}/images/like.svg`
                      ) {
                        addToWishList(product);
                        e.target.src = `${PATHS.HOST_PATH}/images/likeFill.svg`;
                      } else {
                        deleteFromWL(product);
                        e.target.src = `${PATHS.HOST_PATH}/images/like.svg`;
                      }
                    },
                  }),
                ],
              }),
              //rating section
              El({
                element: "div",
                className: "flex justify-start items-center",
                children: [
                  El({
                    element: "span",
                    className:
                      "bg-gray-200 mr-4 py-1.5 px-2 rounded-lg font-medium text-[10px]",
                    innerText: "5,371 sold",
                  }),
                  El({
                    element: "span",
                    className:
                      "icon-[uim--star-half-alt] w-[24px] h-[24px] mr-2",
                  }),
                  El({
                    element: "span",
                    className: "text-gray-700 font-medium text-[13px]",
                    innerText: "4.8 (7,124 reviews)",
                  }),
                ],
              }),
            ],
          }),
          // description section
          El({
            element: "div",
            className: "w-full flex flex-col gap-2",
            children: [
              El({
                element: "span",
                className:
                  "text-shoea text-lg font-bold whitespace-nowrap truncate",
                innerText: "Description",
              }),
              El({
                element: "p",
                className: "text-[13px]",
                innerHTML: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et <strong>View More ...</strong>`,
              }),
            ],
          }),
          // color and size section
          El({
            element: "div",
            className: "w-full flex items-center justify-between gap-10",
            children: [
              // size section
              El({
                element: "div",
                className: "w-full flex flex-col gap-2",
                children: [
                  El({
                    element: "span",
                    className:
                      "text-shoea text-lg font-bold whitespace-nowrap truncate",
                    innerText: "Size",
                  }),
                  El({
                    element: "div",
                    id: "size",
                    className: "flex gap-3",
                  }),
                ],
              }),
              // color section
              El({
                element: "div",
                className: "w-full flex flex-col gap-2",
                children: [
                  El({
                    element: "span",
                    className:
                      "text-shoea text-lg font-bold whitespace-nowrap truncate",
                    innerText: "Color",
                  }),
                  El({
                    element: "div",
                    id: "color",
                    className: "flex gap-3",
                  }),
                ],
              }),
            ],
          }),
          //Quantity section
          El({
            element: "div",
            className: "w-full flex items-center justify-start gap-6 my-3",
            children: [
              El({
                element: "span",
                className: "text-shoea text-lg font-bold",
                innerText: "Quantity",
              }),
              El({
                element: "div",
                className:
                  "w-32 h-10 bg-gray-100 rounded-full flex items-center justify-between p-4",
                children: [
                  El({
                    element: "span",
                    className: "icon-[flowbite--minus-outline] w-5 h-5",
                    onclick: (e) => {
                      productInfo.quantity > 1
                        ? productInfo.quantity--
                        : productInfo.quantity;
                      productInfo.totalPrice =
                        product.price * productInfo.quantity;
                      document.getElementById("quantity").innerText =
                        productInfo.quantity;
                      document.getElementById(
                        "total-price"
                      ).innerText = `$ ${productInfo.totalPrice.toFixed(2)}`;
                    },
                  }),
                  El({
                    element: "span",
                    id: "quantity",
                    className: "font-bold",
                    innerHTML: productInfo.quantity,
                  }),
                  El({
                    element: "span",
                    className: "icon-[heroicons--plus-16-solid] w-5 h-5",
                    onclick: (e) => {
                      productInfo.quantity < +product["items_left"]
                        ? productInfo.quantity++
                        : productInfo.quantity;
                      productInfo.totalPrice =
                        product.price * productInfo.quantity;
                      document.getElementById("quantity").innerText =
                        productInfo.quantity;

                      document.getElementById(
                        "total-price"
                      ).innerText = `$ ${productInfo.totalPrice.toFixed(2)}`;
                    },
                  }),
                ],
              }),
            ],
          }),
          // total price and add to cart button
          El({
            element: "div",
            className:
              "w-full h-full flex items-center gap-4 border-t-2 border-gray-100 pt-4 justify-between",
            children: [
              El({
                element: "div",
                className: "flex flex-col items-start justify-between gap-1",
                children: [
                  El({
                    element: "span",
                    className: "text-gray-400 font-medium text-[10px]",
                    innerText: "Total price",
                  }),
                  El({
                    element: "span",
                    id: "total-price",
                    className: "font-bold text-xl",
                    innerText: `$ ${productInfo.totalPrice.toFixed(2)}`,
                  }),
                ],
              }),
              Button({
                text: "Add to Cart",
                extraClassName:
                  "text-white px-20 py-4 bg-black font-bold flex items-center justify-center gap-2",
                icon: "icon-[solar--bag-4-bold]",
                eventListener: [
                  {
                    event: "click",
                    callback: (e) => {
                      addToCart(cart, productInfo);
                      window.history.back();
                    },
                  },
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
