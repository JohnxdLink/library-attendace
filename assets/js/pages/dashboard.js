const ATTENDANCE_STORAGE_KEY = "attendanceRecords";
const STUDENT_STORAGE_KEY = "libraryStudents";

// STORAGE

function getAttendance() {
  try {
    const records = JSON.parse(localStorage.getItem(ATTENDANCE_STORAGE_KEY) || "[]");

    return Array.isArray(records) ? records : [];
  } catch (error) {
    console.error("Unable to load attendance:", error);
    return [];
  }
}

function getStudents() {
  try {
    const students = JSON.parse(localStorage.getItem(STUDENT_STORAGE_KEY) || "[]");

    return Array.isArray(students) ? students : [];
  } catch (error) {
    console.error("Unable to load students:", error);
    return [];
  }
}

// DATE AND TIME

function getToday() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getRecordDate(record) {
  const value = record.date || record.attendanceDate || record.timeInDate || "";

  if (!value) return "";

  const dateString = String(value);

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatTime(time) {
  if (!time) return "—";

  const value = String(time);

  // Keep times already formatted by attendance.js
  if (/\b(AM|PM)\b/i.test(value)) {
    return value;
  }

  const date = new Date(time);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString("en-PH", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// TODAY'S ATTENDANCE

function getTodayAttendance() {
  const today = getToday();

  return getAttendance().filter((record) => {
    return getRecordDate(record) === today;
  });
}

// DASHBOARD STATISTICS

function updateDashboardStats() {
  const allRecords = getAttendance();
  const todayRecords = getTodayAttendance();

  const totalVisitors = todayRecords.length;

  const currentlyInside = todayRecords.filter((record) => {
    return Boolean(record.timeIn) && !record.timeOut;
  }).length;

  const completedVisits = todayRecords.filter((record) => {
    return Boolean(record.timeOut);
  }).length;

  const recordedDays = new Set(allRecords.map((record) => getRecordDate(record)).filter(Boolean));

  const validRecords = allRecords.filter((record) => {
    return Boolean(getRecordDate(record));
  }).length;

  const averageVisitors = recordedDays.size > 0 ? Math.round(validRecords / recordedDays.size) : 0;

  const visitorsElement = document.getElementById("totalVisitors");
  const timeInElement = document.getElementById("totalTimeIn");
  const timeOutElement = document.getElementById("totalTimeOut");
  const averageElement = document.getElementById("averageVisitors");

  if (visitorsElement) {
    visitorsElement.textContent = totalVisitors;
  }

  if (timeInElement) {
    timeInElement.textContent = currentlyInside;
  }

  if (timeOutElement) {
    timeOutElement.textContent = completedVisits;
  }

  if (averageElement) {
    averageElement.textContent = averageVisitors;
  }
}

// STUDENT INFORMATION

function getStudentDetails(record, students) {
  const studentId = String(record.studentNumber ?? record.studentId ?? record.idNumber ?? "")
    .trim()
    .toLowerCase();

  const student = students.find((item) => {
    const registeredId = String(item.studentNumber ?? item.idNumber ?? item.id ?? "")
      .trim()
      .toLowerCase();

    return studentId !== "" && studentId === registeredId;
  });

  const registeredName = student ? student.name || [student.firstname, student.lastname].filter(Boolean).join(" ") : "";

  return {
    name: record.name || record.studentName || registeredName || "—",

    grade:
      record.grade ||
      record.gradeLevel ||
      record.gradeStrand ||
      (student ? student.grade || student.gradeLevel || student.gradeStrand : "") ||
      "—",

    section: record.section || record.gradeSection || (student ? student.section || student.gradeSection : "") || "—",
  };
}

// RECENT ATTENDANCE TABLE

function displayRecentAttendance() {
  const tableBody = document.getElementById("recentAttendanceBody");

  if (!tableBody) return;

  const records = getTodayAttendance();
  const students = getStudents();

  tableBody.replaceChildren();

  if (records.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 5;
    cell.className = "text-center text-gray";
    cell.textContent = "No attendance records today.";

    row.appendChild(cell);
    tableBody.appendChild(row);

    return;
  }

  // Show the newest records first
  const recentRecords = [...records].reverse().slice(0, 5);

  recentRecords.forEach((record) => {
    const details = getStudentDetails(record, students);
    const row = document.createElement("tr");

    const values = [
      details.name,
      details.grade,
      details.section,
      formatTime(record.timeIn),
      formatTime(record.timeOut),
    ];

    values.forEach((value) => {
      const cell = document.createElement("td");

      cell.className = "text-center";
      cell.textContent = value;

      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}

// REFRESH DASHBOARD

function refreshDashboard() {
  updateDashboardStats();
  displayRecentAttendance();
}

// AUTO REFRESH

function startDashboardRefresh() {
  // Updates when another browser tab changes the records
  window.addEventListener("storage", (event) => {
    if (event.key === ATTENDANCE_STORAGE_KEY || event.key === STUDENT_STORAGE_KEY) {
      refreshDashboard();
    }
  });

  // Updates when the user returns to the dashboard
  window.addEventListener("focus", refreshDashboard);
  window.addEventListener("pageshow", refreshDashboard);

  // Checks for updates every 2 seconds
  setInterval(refreshDashboard, 2000);
}

// INITIALIZE

document.addEventListener("DOMContentLoaded", () => {
  refreshDashboard();
  startDashboardRefresh();
});
