export const initNavBar = () => {
  const schoolToggle = document.getElementById("schoolToggle");
  const schoolMenu = document.getElementById("schoolMenu");
  const schoolChevron = document.getElementById("schoolChevron");

  const libraryToggle = document.getElementById("libraryToggle");
  const libraryMenu = document.getElementById("libraryMenu");
  const libraryChevron = document.getElementById("libraryChevron");

  const staffToggle = document.getElementById("staffToggle");
  const staffMenu = document.getElementById("staffMenu");
  const staffChevron = document.getElementById("staffChevron");

  if (schoolToggle && schoolMenu && schoolChevron) {
    schoolToggle.addEventListener("click", (event) => {
      event.preventDefault();
      schoolMenu.classList.toggle("d-none");
      schoolMenu.classList.toggle("d-flex");
      schoolChevron.classList.toggle("fa-chevron-down");
      schoolChevron.classList.toggle("fa-chevron-up");
    });
  }

  if (libraryToggle && libraryMenu && libraryChevron) {
    libraryToggle.addEventListener("click", (event) => {
      event.preventDefault();
      libraryMenu.classList.toggle("d-none");
      libraryMenu.classList.toggle("d-flex");
      libraryChevron.classList.toggle("fa-chevron-down");
      libraryChevron.classList.toggle("fa-chevron-up");
    });
  }

  if (staffToggle && staffMenu && staffChevron) {
    staffToggle.addEventListener("click", (event) => {
      event.preventDefault();
      staffMenu.classList.toggle("d-none");
      staffMenu.classList.toggle("d-flex");
      staffChevron.classList.toggle("fa-chevron-down");
      staffChevron.classList.toggle("fa-chevron-up");
    });
  }
};
