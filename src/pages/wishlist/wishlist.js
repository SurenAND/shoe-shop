import { getData } from "@/api/GET/get";
import { renderProducts } from "@/components";
import { wishlist } from "@/templates";
import { El } from "@/utils";
import Cookies from "js-cookie";

export const renderWishList = () => {
  const container = document.querySelector(".product-section");
  getData(`users?_email=${Cookies.get("shoea")}`).then((data) => {
    const user = data[0];
    renderProducts(container, user.wishlist, "block");
  });
};

export const WishlistPage = () => {
  return El({
    element: "div",
    children: [wishlist()],
  });
};
