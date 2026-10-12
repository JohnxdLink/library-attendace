const STORAGE_KEY = "libraryStudents";

// HTML elements
const studentSearch = document.getElementById("studentSearch");
const studentTableBody = document.getElementById("studentTableBody");
const studentModal = document.getElementById("studentModal");
const studentForm = document.getElementById("studentForm");

const addStudentButton = document.getElementById("addStudentButton");
const closeStudentModal = document.getElementById("closeStudentModal");
const cancelStudentButton = document.getElementById("cancelStudentButton");

const studentNumberInput = document.getElementById("studentNumber");
const studentLastnameInput = document.getElementById("studentLastname");
const studentFirstnameInput = document.getElementById("studentFirstname");
const studentGradeInput = document.getElementById("studentGrade");
const studentSchoolYearInput = document.getElementById("studentSchoolYear");
const studentSectionInput = document.getElementById("studentSection");

const studentCount = document.querySelector(".bg-white .text-sm.text-gray");

const tableFooterText = document.querySelector(".bg-light.border-t .text-xs.text-gray");

let editingStudentId = null;

// Load registered students.
function getStudents() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Unable to load student records:", error);
    return [];
  }
}

// Save registered students.
function saveStudents(students) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    return true;
  } catch (error) {
    console.error("Unable to save student records:", error);
    alert("Unable to save student records. Please check browser storage.");
    return false;
  }
}

// Generate an internal record ID.
function generateStudentId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// Get a student's full name, including compatibility with older records.
function getFullName(student) {
  return (student.name || [student.firstname, student.middlename, student.lastname].filter(Boolean).join(" ")).trim();
}

// Format registration date.
function formatDate(date) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Update the student count.
function updateStudentCount(count) {
  if (studentCount) {
    studentCount.textContent = `${count} ${count === 1 ? "Student" : "Students"}`;
  }

  if (tableFooterText) {
    tableFooterText.textContent = `Showing ${count} registered ${count === 1 ? "student" : "students"}`;
  }
}

// Render the student table.
function displayStudents(studentList = getStudents()) {
  studentTableBody.replaceChildren();

  if (studentList.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 5;
    cell.className = "text-center";
    cell.textContent = "No student records found.";

    row.appendChild(cell);
    studentTableBody.appendChild(row);

    updateStudentCount(0);
    return;
  }

  studentList.forEach((student) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.className = "text-center";
    idCell.textContent = student.studentNumber || "—";

    const nameCell = document.createElement("td");
    nameCell.className = "font-semibold";
    nameCell.textContent = getFullName(student) || "—";

    const sectionCell = document.createElement("td");
    sectionCell.className = "text-center";
    sectionCell.textContent = student.section || "—";

    const dateCell = document.createElement("td");
    dateCell.className = "text-center";
    dateCell.textContent = formatDate(student.dateRegistered);

    // Action buttons.
    const actionsCell = document.createElement("td");
    const actionsContainer = document.createElement("div");

    actionsContainer.className = "d-flex items-center justify-center gap-2";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "btn-outline";
    editButton.title = "Edit Student";
    editButton.setAttribute("aria-label", "Edit Student");
    editButton.innerHTML = '<span class="fa-solid fa-pen"></span>';

    editButton.addEventListener("click", () => {
      editStudent(student.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn-danger";
    deleteButton.title = "Delete Student";
    deleteButton.setAttribute("aria-label", "Delete Student");
    deleteButton.innerHTML = '<span class="fa-solid fa-trash"></span>';

    deleteButton.addEventListener("click", () => {
      deleteStudent(student.id);
    });

    actionsContainer.append(editButton, deleteButton);
    actionsCell.appendChild(actionsContainer);

    row.append(idCell, nameCell, sectionCell, dateCell, actionsCell);

    studentTableBody.appendChild(row);
  });

  updateStudentCount(studentList.length);
}

// Search by ID, name, grade, section, or school year.
function searchStudents() {
  const query = studentSearch.value.trim().toLowerCase();
  const students = getStudents();

  if (!query) {
    displayStudents(students);
    return;
  }

  const filteredStudents = students.filter((student) => {
    const searchableValues = [
      student.studentNumber,
      getFullName(student),
      student.grade,
      student.section,
      student.schoolYear,
    ];

    return searchableValues.some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(query),
    );
  });

  displayStudents(filteredStudents);
}

// Open a blank form for adding a student.
function openAddStudentForm() {
  editingStudentId = null;
  studentForm.reset();

  studentModal.classList.remove("d-none");

  const title = studentModal.querySelector("h2");
  const description = studentModal.querySelector("h2 + p");
  const submitButton = studentForm.querySelector('button[type="submit"]');

  if (title) title.textContent = "Add Student";
  if (description) description.textContent = "Register a new student.";
  if (submitButton) submitButton.textContent = "Add Student";

  studentNumberInput.disabled = false;
  studentNumberInput.focus();
}

// Close and reset the form.
function closeStudentForm() {
  studentModal.classList.add("d-none");
  studentForm.reset();

  editingStudentId = null;
  studentNumberInput.disabled = false;
}

// Add or update a student.
function saveStudentForm(event) {
  event.preventDefault();

  const wasEditing = Boolean(editingStudentId);

  const studentNumber = studentNumberInput.value.trim();
  const lastname = studentLastnameInput.value.trim();
  const firstname = studentFirstnameInput.value.trim();
  const grade = studentGradeInput.value;
  const schoolYear = studentSchoolYearInput.value;
  const section = studentSectionInput.value;

  // Validate all required fields.
  if (!studentNumber || !lastname || !firstname || !grade || !schoolYear || !section) {
    alert("Please complete all required fields.");
    return;
  }

  const students = getStudents();

  // Prevent duplicate student ID numbers.
  const duplicate = students.some(
    (student) =>
      String(student.studentNumber ?? "")
        .trim()
        .toLowerCase() === studentNumber.toLowerCase() && student.id !== editingStudentId,
  );

  if (duplicate) {
    alert("This student ID number is already registered.");
    studentNumberInput.focus();
    return;
  }

  const name = `${firstname} ${lastname}`.trim();

  if (wasEditing) {
    const student = students.find((item) => item.id === editingStudentId);

    if (!student) {
      alert("Student record could not be found.");
      closeStudentForm();
      displayStudents();
      return;
    }

    // Update the existing record without changing its registration date.
    student.studentNumber = studentNumber;
    student.firstname = firstname;
    student.lastname = lastname;
    student.name = name;
    student.grade = grade;
    student.section = section;
    student.schoolYear = schoolYear;
  } else {
    students.push({
      id: generateStudentId(),
      studentNumber,
      firstname,
      lastname,
      name,
      grade,
      section,
      schoolYear,
      dateRegistered: new Date().toISOString(),
    });
  }

  if (!saveStudents(students)) return;

  closeStudentForm();
  searchStudents();

  alert(wasEditing ? "Student information updated successfully." : "Student registered successfully.");
}

// Open the form with existing student information.
function editStudent(studentId) {
  const student = getStudents().find((item) => item.id === studentId);

  if (!student) {
    alert("Student record could not be found.");
    return;
  }

  editingStudentId = student.id;

  studentNumberInput.value = student.studentNumber || "";
  studentLastnameInput.value = student.lastname || getFullName(student).split(" ").slice(1).join(" ");

  studentFirstnameInput.value = student.firstname || getFullName(student).split(" ")[0] || "";

  studentGradeInput.value = student.grade || "";
  studentSchoolYearInput.value = student.schoolYear || "";
  studentSectionInput.value = student.section || "";

  studentModal.classList.remove("d-none");

  const title = studentModal.querySelector("h2");
  const description = studentModal.querySelector("h2 + p");
  const submitButton = studentForm.querySelector('button[type="submit"]');

  if (title) title.textContent = "Edit Student";
  if (description) {
    description.textContent = "Update the student's information.";
  }
  if (submitButton) submitButton.textContent = "Save Changes";

  studentNumberInput.disabled = false;
}

// Delete a student after a warning.
function deleteStudent(studentId) {
  const students = getStudents();

  const student = students.find((item) => item.id === studentId);

  if (!student) {
    alert("Student record could not be found. Please refresh the page.");
    return;
  }

  const confirmed = window.confirm(
    "WARNING: You are about to delete a student record.\n\n" +
      `Student Name: ${getFullName(student)}\n` +
      `Student ID: ${student.studentNumber || "Not provided"}\n` +
      `Grade: ${student.grade || "Not provided"}\n` +
      `Section: ${student.section || "Not provided"}\n` +
      `School Year: ${student.schoolYear || "Not provided"}\n\n` +
      "This action cannot be undone.\n\n" +
      "The student's existing attendance records will not be deleted " +
      "automatically, but this student will no longer be available " +
      "for new attendance lookups.\n\n" +
      "Are you sure you want to continue?",
  );

  if (!confirmed) return;

  const updatedStudents = students.filter((item) => item.id !== studentId);

  if (!saveStudents(updatedStudents)) return;

  searchStudents();

  alert(`Student "${getFullName(student)}" has been deleted successfully.`);
}

// Event listeners.
addStudentButton.addEventListener("click", openAddStudentForm);
closeStudentModal.addEventListener("click", closeStudentForm);
cancelStudentButton.addEventListener("click", closeStudentForm);
studentForm.addEventListener("submit", saveStudentForm);
studentSearch.addEventListener("input", searchStudents);

// Close the form when clicking outside the form panel.
studentModal.addEventListener("click", (event) => {
  if (event.target === studentModal) {
    closeStudentForm();
  }
});

// Initial page setup.
displayStudents();
