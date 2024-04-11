import { router } from "@/Routes/router";
import { ROUTE } from "@/constant/routes";
import { Loading, StartSlider, Welcome } from "@/templates";
import { El } from "@/utils";

export const OnBoarding = () => {
  const notFirstVisit = localStorage.getItem("notFirstVisit")
    ? JSON.parse(localStorage.getItem("notFirstVisit"))
    : false;
  setTimeout(() => {
    if (notFirstVisit) {
      router.navigate(ROUTE.login);
    } else {
      const getStarted = document.getElementById("get-started");
      getStarted.classList.add("-translate-x-full");
      getStarted.innerHTML = "";
      getStarted.appendChild(Welcome());
      setTimeout(() => {
        getStarted.classList.remove("-translate-x-full");
        getStarted.innerHTML = "";
        getStarted.appendChild(StartSlider());
      }, 2000);
    }
  }, 2000);
  return El({
    element: "div",
    className: "h-screen transition ease-linear duration-500 transform",
    id: "get-started",
    children: [Loading()],
  });
};
