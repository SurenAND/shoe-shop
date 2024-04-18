import Navigo from "navigo";
import { changePage, loginValidation } from "@/utils";
import {
  BrandPage,
  CartPage,
  CheckoutPage,
  HomePage,
  LoginPage,
  MostPopularPage,
  OnBoarding,
  OrdersPage,
  SearchPage,
  SingleProductPage,
  WishlistPage,
} from "@/pages";
import { ROUTE } from "@/constant/routes";
import { getData } from "@/api/GET/get";
import Cookies from "js-cookie";
import { Payment } from "@/templates/Checkout/Payment";
import { Address } from "@/templates/Checkout/Address";
import { Shipping } from "@/templates/Checkout/Shipping";

const info = {
  name: "",
  img: "./images/profile.jpg",
};

export const router = new Navigo("/");

router
  .on(ROUTE.onBoarding, () => {
    changePage(OnBoarding);
  })
  .on(ROUTE.login, () => {
    loginValidation().then((valid) => {
      if (valid) {
        router.navigate(ROUTE.home);
      } else changePage(LoginPage);
    });
  })
  .on(ROUTE.home, () => {
    loginValidation().then((valid) => {
      if (valid) {
        getData(`users?email=${Cookies.get("shoea")}`).then((data) => {
          info.name = data[0].name;
          changePage(HomePage, info);
        });
      } else router.navigate(ROUTE.login);
    });
  })
  .on(ROUTE.wishlist, () => {
    loginValidation().then((valid) => {
      if (valid) {
        changePage(WishlistPage);
      } else router.navigate(ROUTE.login);
    });
  })
  .on(ROUTE.search, () => {
    loginValidation().then((valid) => {
      if (valid) {
        changePage(SearchPage);
      } else router.navigate(ROUTE.login);
    });
  })
  .on("/products/:id", (res) => {
    loginValidation().then((valid) => {
      if (valid) {
        getData(`products/${res.data.id}`).then((data) => {
          changePage(SingleProductPage, data);
        });
      } else router.navigate(ROUTE.login);
    });
  })
  .on("/brand/:brand", (res) => {
    loginValidation().then((valid) => {
      if (valid) {
        getData(`products?brand=${res.data.brand.toUpperCase()}`).then(
          (data) => {
            changePage(BrandPage, res.data.brand, data);
          }
        );
      } else router.navigate(ROUTE.login);
    });
  })
  .on(ROUTE.mostPopular, () => {
    loginValidation().then((valid) => {
      if (valid) {
        changePage(MostPopularPage);
      } else router.navigate(ROUTE.login);
    });
  })
  .on(ROUTE.cart, () => {
    loginValidation().then((valid) => {
      if (valid) {
        changePage(CartPage);
      } else router.navigate(ROUTE.login);
    });
  })
  .on(ROUTE.checkout, () => {
    loginValidation().then((valid) => {
      if (valid) {
        changePage(CheckoutPage);
      } else router.navigate(ROUTE.login);
    });
  })
  .on(ROUTE.payment, () => {
    loginValidation().then((valid) => {
      if (valid) {
        changePage(Payment);
      } else router.navigate(ROUTE.login);
    });
  })
  .on(ROUTE.shippingAddress, () => {
    loginValidation().then((valid) => {
      if (valid) {
        changePage(Address);
      } else router.navigate(ROUTE.login);
    });
  })
  .on(ROUTE.shippingMethod, () => {
    loginValidation().then((valid) => {
      if (valid) {
        changePage(Shipping);
      } else router.navigate(ROUTE.login);
    });
  })
  .on(ROUTE.orders, () => {
    loginValidation().then((valid) => {
      if (valid) {
        changePage(OrdersPage);
      } else router.navigate(ROUTE.login);
    });
  })
  .on(ROUTE.notFound, () => {
    changePage(NotFound);
  });
