import { router } from "@/Routes/router";
import { PATHS } from "@/constant/path";
import { ROUTE } from "@/constant/routes";
import { El } from "@/utils";

const icons = {
  home: `${PATHS.HOST_PATH}/images/navbar/HomeFill.svg`,
  cart: `${PATHS.HOST_PATH}/images/navbar/CartFill.svg`,
  orders: `${PATHS.HOST_PATH}/images/navbar/OrderFill.svg`,
  wallet: `${PATHS.HOST_PATH}/images/navbar/WalletFill.svg`,
  profile: `${PATHS.HOST_PATH}/images/navbar/UserFill.svg`,
};

export const renderNavbar = () => {
  const nav =
    document.getElementById("nav-bar") ||
    El({
      element: "div",
      className: "fixed bottom-0 w-full h-16",
    });
  nav.classList.add(
    "flex",
    "items-center",
    "justify-between",
    "px-8",
    "border-t",
    "shadow"
  );
  nav.innerHTML = "";
  nav.append(
    El({
      element: "div",
      className: "flex flex-col items-center justify-center gap-1",
      eventListener: [
        {
          event: "click",
          callback: (e) => {
            router.navigate(ROUTE.home);
          },
        },
      ],
      children: [
        El({
          element: "img",
          id: "home",
          src: `${PATHS.HOST_PATH}/images/navbar/Home.svg`,
        }),
        El({
          element: "span",
          className: "text-shoea font-semibold text-[10px]",
          innerText: "Home",
        }),
      ],
    }),
    El({
      element: "div",
      className: "flex flex-col items-center justify-center gap-1",
      eventListener: [
        {
          event: "click",
          callback: (e) => {
            router.navigate(ROUTE.cart);
          },
        },
      ],
      children: [
        El({
          element: "img",
          id: "cart",
          src: `${PATHS.HOST_PATH}/images/navbar/Cart.svg`,
        }),
        El({
          element: "span",
          className: "text-shoea font-semibold text-[10px]",
          innerText: "Cart",
        }),
      ],
    }),
    El({
      element: "div",
      className: "flex flex-col items-center justify-center gap-1",
      eventListener: [
        {
          event: "click",
          callback: (e) => {
            router.navigate(ROUTE.orders);
          },
        },
      ],
      children: [
        El({
          element: "img",
          id: "orders",
          src: `${PATHS.HOST_PATH}/images/navbar/Order.svg`,
        }),
        El({
          element: "span",
          className: "text-shoea font-semibold text-[10px]",
          innerText: "Orders",
        }),
      ],
    }),
    El({
      element: "div",
      className: "flex flex-col items-center justify-center gap-1",
      // eventListener: [
      //   {
      //     event: "click",
      //     callback: (e) => {
      //       router.navigate(ROUTE.wallet);
      //     },
      //   },
      // ],
      children: [
        El({
          element: "img",
          id: "wallet",
          src: `${PATHS.HOST_PATH}/images/navbar/Wallet.svg`,
        }),
        El({
          element: "span",
          className: "text-shoea font-semibold text-[10px]",
          innerText: "Wallet",
        }),
      ],
    }),
    El({
      element: "div",
      className: "flex flex-col items-center justify-center gap-1",
      // eventListener: [
      //   {
      //     event: "click",
      //     callback: (e) => {
      //       router.navigate(ROUTE.profile);
      //     },
      //   },
      // ],
      children: [
        El({
          element: "img",
          id: "profile",
          src: `${PATHS.HOST_PATH}/images/navbar/User.svg`,
        }),
        El({
          element: "span",
          className: "text-shoea font-semibold text-[10px]",
          innerText: "Profile",
        }),
      ],
    })
  );
  return nav;
};

export const navbar = (target) => {
  setTimeout(() => {
    const icon = document.getElementById(target);
    icon.src = icons[target];
  }, 0);

  return El({
    element: "div",
    id: "nav-bar",
    className: "fixed bottom-0 w-full h-16 bg-white",
    children: [renderNavbar()],
  });
};
