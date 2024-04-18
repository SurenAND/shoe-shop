import { getData } from "@/api/GET/get";
import { patchData } from "@/api/PATCH/patch";
import { PATHS } from "@/constant/path";
import { SingleProduct } from "@/templates";
import { El } from "@/utils";
import Cookies from "js-cookie";

export const addToWishList = (product) => {
  getData(`users?_email=${Cookies.get("shoea")}`).then((data) => {
    const user = data[0];
    user.wishlist.push(product);
    patchData(`users/${user.id}`, user);
  });
};

export const addToCart = (cart, productInfo) => {
  let isNew = true;
  cart.forEach((item) => {
    if (item.id === productInfo.id) {
      item.quantity += productInfo.quantity;
      item.totalPrice += productInfo.totalPrice;
      isNew = false;
    }
  });
  if (isNew) {
    cart.push(productInfo);
  }

  getData(`users?_email=${Cookies.get("shoea")}`).then((data) => {
    const user = data[0];
    user.cart = cart;
    patchData(`users/${user.id}`, user);
  });
};

export const isInWishlist = () => {
  let wlIcon = document.getElementById("product-wl-icon");
  getData(`users?_email=${Cookies.get("shoea")}`).then((data) => {
    let markWishlistIcon;
    const wishlist = data[0].wishlist;
    wishlist.find((item) => {
      return (markWishlistIcon = item.id == location.pathname.split("/")[2]);
    });
    markWishlistIcon
      ? (wlIcon.src = `${PATHS.HOST_PATH}/images/likeFill.svg`)
      : (wlIcon.src = `${PATHS.HOST_PATH}/images/like.svg`);
  });
};

export const SingleProductPage = (data) => {
  return El({
    element: "div",
    children: [SingleProduct(data)],
  });
};
