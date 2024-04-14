import { router } from "@/Routes/router";
import { getData } from "@/api/GET/get";
import { PATHS } from "@/constant/path";
import { El } from "@/utils";

export const renderProducts = (
  container,
  products,
  wishlistIcon = "hidden"
) => {
  products.map((product) => {
    const card = El({
      element: "div",
      className:
        "max-w-sm flex flex-col items-start justify-center gap-2 col-span-6",
      children: [
        El({
          element: "div",
          className:
            "relative w-full h-2/3 flex items-center justify-center bg-gray-200 rounded-2xl overflow-hidden aspect-square",
          children: [
            El({
              element: "img",
              className: "w-full h-full",
              src: product.imageURL,
              onclick: () => {
                router.navigate(`/products/${product.id}`);
              },
            }),
            El({
              element: "img",
              className: `absolute w-7 h-7 top-4 right-4 ${wishlistIcon}`,
              src: `${PATHS.HOST_PATH}/images/remove-wishlist.svg`,
            }),
          ],
        }),
        El({
          element: "span",
          className:
            "w-full text-shoea text-[20px] font-bold whitespace-nowrap truncate",
          innerText: product.name,
        }),
        //rating section
        El({
          element: "div",
          className: `flex justify-start items-center ${wishlistIcon}`,
          children: [
            El({
              element: "span",
              className: "icon-[uim--star-half-alt] w-[24px] h-[24px] mr-2",
            }),
            El({
              element: "span",
              className: "text-gray-700 font-medium text-[13px] mr-2",
              innerText: "4.8",
            }),
            El({
              element: "span",
              className: "text-gray-700 font-medium text-[13px] mr-2",
              innerText: "|",
            }),
            El({
              element: "span",
              className:
                "bg-gray-200 py-1.5 px-2 rounded-lg font-medium text-[10px]",
              innerText: "5,371 sold",
            }),
          ],
        }),
        El({
          element: "span",
          className: "text-shoea text-[16px] font-semibold w-full",
          innerText: `$ ${product.price}`,
        }),
      ],
    });

    container.appendChild(card);
  });
};

export const renderProduct = (filter = "", isWishList) => {
  if (isWishList) {
    if (!filter) {
      getData(`users`)
        .then((data) => {
          const user = data[0];
          let userWishlist = user.wishlist;
          const section = document.querySelector(".product-section");
          section.innerHTML = "";
          renderProducts(section, userWishlist, true);
        })
        .catch((error) => console.log(error));
    } else {
      getData(`users`)
        .then((data) => {
          const user = data[0];
          let userWishlist = user.wishlist.filter((item) => {
            return item.brand == filter;
          });
          const section = document.querySelector(".product-section");
          section.innerHTML = "";
          renderProducts(section, userWishlist, true);
        })
        .catch((error) => console.log(error));
    }
  } else {
    if (!filter) {
      getData(`products`)
        .then((data) => {
          const section = document.querySelector(".product-section");
          section.innerHTML = "";
          renderProducts(section, data);
        })
        .catch((error) => console.log(error));
    } else {
      getData(`products?brand=${filter}`)
        .then((data) => {
          const section = document.querySelector(".product-section");
          section.innerHTML = "";
          renderProducts(section, data);
        })
        .catch((error) => console.log(error));
    }
  }
};
