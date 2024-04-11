import Navigo from "navigo";
import { changePage } from "@/utils";
import { HomePage, OnBoarding } from "@/pages";
import { ROUTE } from "@/constant/routes";
import { Login } from "@/templates/login";
import { getData } from "@/api/GET/get";
import Cookies from "js-cookie";
import { SearchSection } from "@/templates";
import { wishlist } from "@/templates/Home/wishlist";

const info = {
  name: "Ashkan",
  img: "./images/profile.jpg",
};

export const router = new Navigo("/");

// validation to check if login
const validation = () => {};

router
  .on(ROUTE.onBoarding, () => {
    changePage(OnBoarding);
  })
  .on(ROUTE.login, () => {
    changePage(Login);
  })
  .on(ROUTE.home, () => {
    getData(`users?email=${Cookies.get("shoea")}`).then((data) => {
      info.name = data[0].name;
      changePage(HomePage, info);
    });
  })
  .on(ROUTE.wishlist, () => {
    changePage(wishlist);
  })
  .on(ROUTE.search, () => {
    changePage(SearchSection);
  })
  .on("/products/:id", (res) => {
    getData(`products/${res.data.id}`).then((data) => {
      changePage(SingleProduct, data);
    });
  })
  .on("/brand/:brand", (res) => {
    getData(`products?brand=${res.data.brand.toUpperCase()}`).then((data) => {
      changePage(brandPage, res.data.brand, data);
    });
  })
  .on(ROUTE.mostPopular, () => {
    changePage(mostPopular);
  })
  .on(ROUTE.cart, () => {
    changePage(Cart);
  })
  .on(ROUTE.orders, () => {
    changePage(Orders);
  })
  .on(ROUTE.notFound, () => {
    changePage(NotFound);
  });
