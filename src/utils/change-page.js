export function changePage(page, data, ...restData) {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(page(data, ...restData));
}
