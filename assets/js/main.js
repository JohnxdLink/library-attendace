import { initNavBar } from "./components/nav-bar/nav-bar.js";
import { getGreeting, getFormattedDate } from "./modules/utils/date.js";

const main = () => {
  const greetingElement = document.getElementById("greeting");
  const dateElement = document.getElementById("todayDate");

  initNavBar();
  greetingElement.textContent = getGreeting();
  dateElement.textContent = getFormattedDate();
};

main();
