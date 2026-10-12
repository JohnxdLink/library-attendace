const STUDENTS_KEY = "libraryStudents";
const ATTENDANCE_KEY = "attendanceRecords";

// HTML elements
const addButton = document.getElementById("addAttendanceButton");
const formContainer = document.getElementById("attendanceFormContainer");
const attendanceForm = document.getElementById("attendanceForm");
const cancelButton = document.getElementById("cancelAttendanceButton");

const studentIdInput = document.getElementById("attendanceStudentId");
const studentNameInput = document.getElementById("attendanceStudentName");
const studentGradeInput = document.getElementById("attendanceStudentGrade");
const studentSectionInput = document.getElementById("attendanceStudentSection");
const messageElement = document.getElementById("attendanceFormMessage");

const dateInput = document.getElementById("attendanceDate");
const tableBody = document.getElementById("attendanceTableBody");
const attendanceCount = document.getElementById("attendanceCount");
const presentCount = document.getElementById("presentCount");
const absentCount = document.getElementById("absentCount");

let matchedStudent = null;

// Safely load records from localStorage.
function getStoredData(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Unable to load ${key}:`, error);
    return [];
  }
}

// Save records to localStorage.
function saveStoredData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Unable to save ${key}:`, error);
    alert("Unable to save changes. Please check your browser storage.");
    return false;
  }
}

// Generate today's local date.
function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Generate the current time.
function getCurrentTime() {
  return new Date().toLocaleTimeString("en-PH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// Generate a unique attendance record ID.
function generateRecordId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// Student information helpers.
function getStudentId(student) {
  return String(student.studentNumber ?? "").trim();
}

function getStudentName(student) {
  return String(
    student.name || [student.firstname, student.lastname].filter(Boolean).join(" ") || student.fullName || "",
  ).trim();
}

function getStudentGrade(student) {
  return String(student.grade || student.gradeLevel || student.gradeStrand || "").trim();
}

function getStudentSection(student) {
  return String(student.section || student.gradeSection || student.sectionName || "").trim();
}

// Find a registered student by ID number.
function findStudentById(id) {
  const searchedId = id.trim().toLowerCase();

  return getStoredData(STUDENTS_KEY).find((student) => getStudentId(student).toLowerCase() === searchedId);
}

// Form messages.
function showMessage(message, isError = false) {
  if (!messageElement) return;

  messageElement.textContent = message;
  messageElement.classList.toggle("text-danger", isError);
}

function clearStudentDetails() {
  matchedStudent = null;

  studentNameInput.value = "";
  studentGradeInput.value = "";
  studentSectionInput.value = "";
}

// Look up student details and check existing attendance.
function lookUpStudent() {
  const id = studentIdInput.value.trim();

  clearStudentDetails();
  showMessage("");

  if (!id) return;

  const student = findStudentById(id);

  if (!student) {
    showMessage("Student ID not found. Please register the student first.", true);
    return;
  }

  const name = getStudentName(student);
  const grade = getStudentGrade(student);
  const section = getStudentSection(student);

  if (!name || !section) {
    showMessage("The student's name or section is missing from their student record.", true);
    return;
  }

  matchedStudent = student;

  studentNameInput.value = name;
  studentGradeInput.value = grade;
  studentSectionInput.value = section;

  const selectedDate = dateInput.value || getToday();
  const studentId = getStudentId(student);

  const existingRecord = getStoredData(ATTENDANCE_KEY).find(
    (record) =>
      String(record.studentId).trim().toLowerCase() === studentId.toLowerCase() && record.date === selectedDate,
  );

  if (existingRecord && existingRecord.timeOut) {
    showMessage(`Attendance complete. Time In: ${existingRecord.timeIn}; ` + `Time Out: ${existingRecord.timeOut}.`);
  } else if (existingRecord) {
    showMessage(`Time In recorded at ${existingRecord.timeIn}. ` + "Submit again to record Time Out.");
  } else {
    showMessage("Student found. Submit to record Time In.");
  }
}

// Open the attendance form.
function openAttendanceForm() {
  attendanceForm.reset();
  clearStudentDetails();
  showMessage("");

  formContainer.classList.remove("d-none");
  studentIdInput.focus();
}

// Close and reset the attendance form.
function closeAttendanceForm() {
  formContainer.classList.add("d-none");
  attendanceForm.reset();
  clearStudentDetails();
  showMessage("");
}

// Record Time In or Time Out.
function recordAttendance(event) {
  event.preventDefault();

  // Refresh the student lookup before recording.
  lookUpStudent();

  if (!matchedStudent) return;

  const studentId = getStudentId(matchedStudent);
  const name = getStudentName(matchedStudent);
  const grade = getStudentGrade(matchedStudent);
  const section = getStudentSection(matchedStudent);
  const selectedDate = dateInput.value || getToday();

  if (selectedDate > getToday()) {
    showMessage("You cannot record attendance for a future date.", true);
    return;
  }

  if (!studentId) {
    showMessage("This student has no registered ID number.", true);
    return;
  }

  const records = getStoredData(ATTENDANCE_KEY);

  const existingIndex = records.findIndex(
    (record) =>
      String(record.studentId).trim().toLowerCase() === studentId.toLowerCase() && record.date === selectedDate,
  );

  if (existingIndex !== -1) {
    const record = records[existingIndex];

    // Do not allow another submission after Time Out.
    if (record.timeOut) {
      showMessage("This student's Time In and Time Out are already complete.", true);
      return;
    }

    // Second submission records Time Out.
    record.timeOut = getCurrentTime();
    record.name = name;
    record.grade = grade;
    record.section = section;
    record.status = "Present";

    if (!saveStoredData(ATTENDANCE_KEY, records)) return;

    renderAttendance();
    showMessage(`Time Out recorded successfully at ${record.timeOut}.`);
  } else {
    // First submission records Time In.
    const newRecord = {
      recordId: generateRecordId(),
      studentId,
      name,
      grade,
      section,
      date: selectedDate,
      timeIn: getCurrentTime(),
      timeOut: "",
      status: "Present",
    };

    records.push(newRecord);

    if (!saveStoredData(ATTENDANCE_KEY, records)) return;

    renderAttendance();
    showMessage(`Time In recorded successfully at ${newRecord.timeIn}.`);
  }

  window.setTimeout(closeAttendanceForm, 1200);
}

// Delete one attendance record after confirmation.
function deleteAttendance(recordId, studentId, date) {
  const records = getStoredData(ATTENDANCE_KEY);

  // Find by unique ID first.
  let recordIndex = recordId ? records.findIndex((record) => record.recordId === recordId) : -1;

  // Fallback for records created before recordId was introduced.
  if (recordIndex === -1) {
    recordIndex = records.findIndex(
      (record) =>
        String(record.studentId).trim().toLowerCase() === String(studentId).trim().toLowerCase() &&
        record.date === date,
    );
  }

  if (recordIndex === -1) {
    alert("Attendance record not found. Refresh the page and try again.");
    return;
  }

  const record = records[recordIndex];

  const confirmed = window.confirm(
    "WARNING: You are about to delete an attendance record.\n\n" +
      `Student: ${record.name || "Unknown"}\n` +
      `ID Number: ${record.studentId}\n` +
      `Date: ${record.date}\n` +
      `Time In: ${record.timeIn || "Not recorded"}\n` +
      `Time Out: ${record.timeOut || "Not recorded"}\n\n` +
      "This action cannot be undone. The student's registration " +
      "will not be deleted.\n\n" +
      "Do you want to continue?",
  );

  if (!confirmed) return;

  records.splice(recordIndex, 1);

  if (!saveStoredData(ATTENDANCE_KEY, records)) return;

  renderAttendance();
  alert("Attendance record deleted successfully.");
}

// Render attendance records for the selected date.
function renderAttendance() {
  const selectedDate = dateInput.value || getToday();

  const allRecords = getStoredData(ATTENDANCE_KEY);
  const records = allRecords.filter((record) => record.date === selectedDate);

  // Assign IDs to older records so future deletion can find them.
  let updatedIds = false;

  allRecords.forEach((record) => {
    if (!record.recordId) {
      record.recordId = generateRecordId();
      updatedIds = true;
    }
  });

  if (updatedIds) {
    if (!saveStoredData(ATTENDANCE_KEY, allRecords)) return;
  }

  tableBody.replaceChildren();

  if (records.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 8;
    cell.className = "text-center";
    cell.textContent = "No attendance records found for this date.";

    row.appendChild(cell);
    tableBody.appendChild(row);
  } else {
    records.forEach((record) => {
      const row = document.createElement("tr");

      const values = [
        record.studentId || "—",
        record.name || "—",
        record.grade || "—",
        record.section || "—",
        record.timeIn || "—",
        record.timeOut || "—",
      ];

      values.forEach((value, index) => {
        const cell = document.createElement("td");
        cell.textContent = value;

        if (index === 1) {
          cell.className = "font-semibold";
        }

        row.appendChild(cell);
      });

      // Status column.
      const statusCell = document.createElement("td");
      statusCell.className = "text-center";

      const statusLabel = document.createElement("span");
      statusLabel.className = "btn-success";
      statusLabel.textContent = record.status || "Present";

      statusCell.appendChild(statusLabel);
      row.appendChild(statusCell);

      // Actions column.
      const actionCell = document.createElement("td");
      actionCell.className = "text-center";

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "btn-danger";
      deleteButton.title = "Delete attendance record";
      deleteButton.setAttribute("aria-label", "Delete attendance record");
      deleteButton.innerHTML = '<span class="fa-solid fa-trash"></span> Delete';

      // Pass the record details directly to the delete function.
      deleteButton.addEventListener("click", () => {
        deleteAttendance(record.recordId || "", record.studentId, record.date);
      });

      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);

      tableBody.appendChild(row);
    });
  }

  // Update attendance count.
  if (attendanceCount) {
    attendanceCount.textContent = `${records.length} ${records.length === 1 ? "Student" : "Students"}`;
  }

  // Count students marked present for the selected date.
  const presentIds = new Set(
    records
      .filter((record) => record.status === "Present")
      .map((record) => String(record.studentId).trim().toLowerCase()),
  );

  if (presentCount) {
    presentCount.textContent = presentIds.size;
  }

  // Count registered students without an attendance record.
  const registeredIds = new Set(
    getStoredData(STUDENTS_KEY)
      .map(getStudentId)
      .filter(Boolean)
      .map((id) => id.toLowerCase()),
  );

  const absentIds = [...registeredIds].filter((id) => !presentIds.has(id));

  if (absentCount) {
    absentCount.textContent = absentIds.length;
  }
}

// Event listeners.
addButton.addEventListener("click", openAttendanceForm);
cancelButton.addEventListener("click", closeAttendanceForm);
attendanceForm.addEventListener("submit", recordAttendance);
studentIdInput.addEventListener("input", lookUpStudent);
dateInput.addEventListener("change", renderAttendance);

// Initial page setup.
dateInput.value = getToday();
renderAttendance();
