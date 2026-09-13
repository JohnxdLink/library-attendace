export const initNavBar = () => {
  const schoolToggle = document.getElementById("schoolToggle");
  const schoolMenu = document.getElementById("schoolMenu");
  const schoolChevron = document.getElementById("schoolChevron");

  if (!schoolToggle || !schoolMenu || !schoolChevron) {
    return;
  }

  schoolToggle.addEventListener("click", (event) => {
    event.preventDefault();

    schoolMenu.classList.toggle("d-none");
    schoolMenu.classList.toggle("d-flex");

    schoolChevron.classList.toggle("fa-chevron-down");
    schoolChevron.classList.toggle("fa-chevron-up");
  });
};
