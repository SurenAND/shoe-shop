import { El } from "@/utils";
import { debounce } from "lodash";
import { CreateInput } from "../Inputs";
import { router } from "@/Routes/router";
import { ROUTE } from "@/constant/routes";
import { searchResult } from "@/pages";

export const SearchInput = (showIcon = "", onSearch = false) => {
  return El({
    element: "form",
    eventListener: [
      {
        event: "submit",
        callback: (e) => {
          e.preventDefault();
          searchResult(e.target.search.value);
        },
      },
    ],
    className: "w-full px-4 py-1",
    children: [
      CreateInput({
        icon: "icon-[flowbite--search-outline]",
        showIcon,
        isFilter: true,
        placeholder: "Search",
        name: "search",
        id: "search-input",
        eventListener: [
          {
            event: "focus",
            callback: (e) => {
              if (!onSearch) {
                router.navigate(ROUTE.search);
              }
            },
          },
          {
            event: "keyup",
            callback: debounce((e) => {
              searchResult(e.target.value);
            }, 1000),
          },
        ],
      }),
    ],
  });
};
