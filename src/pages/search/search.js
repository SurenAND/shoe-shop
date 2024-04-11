import { getData } from "@/api/GET/get";
import { renderProducts } from "@/components";
import { PATHS } from "@/constant/path";
import { search } from "@/templates";
import { El } from "@/utils";

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

export const searchResult = (searchVal) => {
  document.getElementById("search-result").classList.add("hidden");
  const section = document.querySelector(".search-section");
  section.innerHTML = "";
  document.getElementById("search-notfound")
    ? document.getElementById("search-notfound").remove()
    : null;
  document.getElementById("search-found")
    ? document.getElementById("search-found").remove()
    : null;
  searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  const request = () => {
    if (searchVal !== "") {
      getData(`products?name_like=${searchVal}`)
        .then((data) => {
          if (data.length > 0) {
            section.insertAdjacentElement(
              "beforebegin",
              El({
                element: "div",
                id: "search-found",
                className:
                  "w-full p-4 flex items-center justify-between border-b border-gray-300",

                children: [
                  El({
                    element: "span",
                    className: "font-bold text-lg text-black",
                    innerText: `Results for "${searchVal}"`,
                  }),
                  El({
                    element: "span",
                    className: "font-semibold text-lg text-black",
                    innerText: `${data.length} Found`,
                  }),
                ],
              })
            );
            renderProducts(section, data);
            if (searchVal !== "") {
              searchHistory.push(searchVal);
              searchHistory = Array.from(new Set(searchHistory));
              localStorage.setItem(
                "searchHistory",
                JSON.stringify(searchHistory)
              );
            }
          } else {
            section.insertAdjacentElement(
              "beforebegin",
              El({
                element: "div",
                id: "search-notfound",
                className:
                  "w-full h-screen p-4 flex flex-col items-center justify-center",

                children: [
                  El({
                    element: "img",
                    src: `${PATHS.HOST_PATH}/images/not-found.png`,
                  }),
                  El({
                    element: "span",
                    className: "font-bold text-2xl text-black mt-6",
                    innerText: "Not Found",
                  }),
                  El({
                    element: "span",
                    className:
                      "font-medium text-lg text-black text-center mt-3",
                    innerText:
                      "Sorry, the keyword you entered cannot be found, please check again or search with another keyword.",
                  }),
                ],
              })
            );
          }
        })
        .catch((error) => console.log(error));
    } else {
      document.getElementById("search-result").classList.remove("hidden");
    }
  };
  request();
};

export const renderRecentSearch = () => {
  const results = El({
    element: "div",
    id: "search-result",
    className:
      "flex flex-col items-center w-11/12 mx-auto scale-100 origin-top transition duration-200 ease-in-out",
  });
  searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  if (searchHistory.length > 0) {
    results.appendChild(
      El({
        element: "div",
        className:
          "w-full py-4 flex items-center justify-between border-b border-gray-300",
        children: [
          El({
            element: "span",
            className: "font-bold text-lg text-black",
            innerText: "Recent",
          }),
          El({
            element: "span",
            className: "font-semibold text-lg text-black",
            onclick: (e) => {
              localStorage.removeItem("searchHistory");
              renderRecentSearch();
            },
            innerText: "clear All",
          }),
        ],
      })
    );
    searchHistory.map((sh) => {
      const searchEl = El({
        element: "div",
        className: "w-full py-4 flex items-center justify-between",

        children: [
          El({
            element: "span",
            className: "text-gray-500",
            onclick: (e) => {
              searchResult(sh);
              document.getElementById("search-input").value = sh;
              document
                .getElementById("search-result")
                .classList.remove("scale-100");
              document.getElementById("search-result").classList.add("scale-0");
              renderRecentSearch();
            },
            innerText: sh,
          }),
          El({
            element: "div",
            className:
              "flex justify-center rounded-[0.6rem] p-0.5 border-2 border-gray-400",
            children: [
              El({
                element: "span",
                className: "icon-[ic--round-plus] rotate-45 text-gray-500",
                onclick: (e) => {
                  searchHistory = searchHistory.filter(
                    (history) => history !== sh
                  );
                  localStorage.setItem(
                    "searchHistory",
                    JSON.stringify(searchHistory)
                  );
                  renderRecentSearch();
                },
              }),
            ],
          }),
        ],
      });
      results.appendChild(searchEl);
    });
  }
  return results;
};

export const SearchPage = () => {
  return El({
    element: "div",
    children: [search()],
  });
};
