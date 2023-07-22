const btnToggleSidebar = document.querySelector("#toggleSidebar");
const content = document.querySelector(".content");
btnToggleSidebar.addEventListener("click", function () {
  content.classList.toggle("full");
});
