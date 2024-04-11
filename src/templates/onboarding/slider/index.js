// import Swiper bundle with all modules installed
import { router } from "@/Routes/router";
import { Button, StartSlide } from "@/components";
import { PATHS } from "@/constant/path";
import { ROUTE } from "@/constant/routes";
import { El } from "@/utils";

// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";
// import styles bundle
import "swiper/css/bundle";

const slides = [
  {
    text: "We provide high quality products just for you",
    src: `${PATHS.HOST_PATH}/images/Wallpaper_slide1.jpg`,
  },
  {
    text: "Your satisfaction is our number one priority",
    src: `${PATHS.HOST_PATH}/images/Wallpaper_slide2.jpg`,
  },
  {
    text: "Let’s fulfill your fashion needs with shoea right now!",
    src: `${PATHS.HOST_PATH}/images/Wallpaper_slide3.jpg`,
  },
];

let counter = 1;

const createSwiper = () => {
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    loop: false,
    allowTouchMove: false,
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },
  });
};

export const StartSlider = () => {
  setTimeout(createSwiper, 0);
  return El({
    element: "div",
    id: "first-slider",
    className:
      "w-full h-full pb-6 flex flex-col items-center justify-between transition ease-linear duration-500 transform",
    children: [
      El({
        element: "div",
        className: "w-full swiper",
        children: [
          El({
            element: "div",
            className: "swiper-wrapper mb-16",
            children: [...slides.map((item) => StartSlide(item))],
          }),
          El({
            element: "div",
            className: "swiper-pagination first-slider",
          }),
        ],
      }),
      El({
        element: "div",
        className: "w-full text-center",
        children: [
          Button({
            text: "Next",
            extraClassName: "w-96",
            eventListener: [
              {
                event: "click",
                callback: (e) => {
                  const swiper = document.querySelector(".swiper").swiper;
                  swiper.slideNext();
                  if (e.target.innerText === "Get Started") {
                    localStorage.setItem("notFirstVisit", JSON.stringify(true));
                    router.navigate(ROUTE.login);
                  }
                  counter++ == slides.length - 1
                    ? ((e.target.innerText = "Get Started"), (counter = 1))
                    : null;
                },
              },
            ],
          }),
        ],
      }),
    ],
  });
};
