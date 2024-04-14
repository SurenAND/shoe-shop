import { getData } from "@/api/GET/get";
import { patchData } from "@/api/PATCH/patch";
import Cookies from "js-cookie";

export const deleteFromWL = (product) => {
  getData(`users?_email=${Cookies.get("shoea")}`).then((data) => {
    const user = data[0];
    let wishlist = user.wishlist;
    const idToDelete = +product.id;
    const index = wishlist.findIndex((item) => item.id === idToDelete);
    wishlist.splice(index, 1);
    patchData(`users/${user.id}`, user);
  });
};
