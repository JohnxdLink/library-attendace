const ATTENDANCE_KEYS = ["attendanceRecords", "libraryAttendance"];
const STUDENT_STORAGE_KEY = "libraryStudents";

// STORAGE

function readStorage(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Unable to read ${key}:`, error);
    return [];
  }
}

function getAttendance() {
  // Support either key used by the attendance page.
  // Prefer the first key that contains records.
  for (const key of ATTENDANCE_KEYS) {
    const records = readStorage(key);

    if (records.length > 0) {
      return records;
    }
  }

  return [];
}

function getStudents() {
  return readStorage(STUDENT_STORAGE_KEY);
}

// DATE HELPERS

function getLocalDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getRecordDate(record) {
  const value = record.date || record.attendanceDate || record.timeInDate || "";

  if (!value) return "";

  const text = String(value);

  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return text;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? "" : getLocalDate(date);
}

function formatTime(value) {
  if (!value) return "—";

  const text = String(value);

  // Preserve times already formatted by the attendance page.
  if (/\b(AM|PM)\b/i.test(text)) {
    return text;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return text;
  }

  return date.toLocaleTimeString("en-PH", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// STUDENT DETAILS

function getStudentDetails(record, students) {
  const id = String(record.studentNumber ?? record.studentId ?? record.idNumber ?? "")
    .trim()
    .toLowerCase();

  const student = students.find((item) => {
    const studentId = String(item.studentNumber ?? item.idNumber ?? item.id ?? "")
      .trim()
      .toLowerCase();

    return id !== "" && id === studentId;
  });

  return {
    id: record.studentNumber || record.studentId || record.idNumber || (student && student.studentNumber) || "—",

    name:
      record.name ||
      record.studentName ||
      (student && student.name) ||
      (student ? [student.firstname, student.lastname].filter(Boolean).join(" ") : "") ||
      "—",

    grade:
      record.grade ||
      record.gradeLevel ||
      record.gradeStrand ||
      (student ? student.grade || student.gradeLevel || student.gradeStrand : "") ||
      "—",

    section: record.section || record.gradeSection || (student ? student.section || student.gradeSection : "") || "—",
  };
}

// VIOLATION DETECTION

function hasViolation(record) {
  return Boolean(
    record.violation ||
    record.violations ||
    record.violationType ||
    record.violationDescription ||
    record.violationReason ||
    record.status === "Violation" ||
    record.type === "violation",
  );
}

function getRecordStatus(record) {
  if (hasViolation(record)) {
    return "Violation";
  }

  if (record.timeIn && record.timeOut) {
    return "Completed";
  }

  if (record.timeIn) {
    return "Checked In";
  }

  return record.status || "No Time In";
}

// FILTER REPORTS

function getFilteredRecords() {
  const type = document.getElementById("reportType").value;
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;

  const attendance = getAttendance();

  return attendance.filter((record) => {
    const date = getRecordDate(record);

    if (!date) return false;
    if (fromDate && date < fromDate) return false;
    if (toDate && date > toDate) return false;

    if (type === "violation" && !hasViolation(record)) {
      return false;
    }

    return true;
  });
}

// TABLE HELPERS

function addCell(row, value) {
  const cell = document.createElement("td");
  cell.className = "text-center";
  cell.textContent = value == null || value === "" ? "—" : String(value);
  row.appendChild(cell);
}

function showEmptyMessage(message, columnCount = 8) {
  const body = document.getElementById("reportTableBody");
  body.replaceChildren();

  const row = document.createElement("tr");
  const cell = document.createElement("td");

  cell.colSpan = columnCount;
  cell.className = "text-center text-gray";
  cell.textContent = message;

  row.appendChild(cell);
  body.appendChild(row);
}

// GENERATE REPORT

function generateReport() {
  const type = document.getElementById("reportType").value;
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const message = document.getElementById("reportMessage");

  if (fromDate && toDate && fromDate > toDate) {
    message.textContent = "The From date cannot be later than the To date.";

    showEmptyMessage("Please correct the selected date range.");
    document.getElementById("reportRecordCount").textContent = "0 records";
    updateTotals([]);
    return;
  }

  const records = getFilteredRecords();
  const students = getStudents();
  const tableHead = document.getElementById("reportTableHead");
  const tableBody = document.getElementById("reportTableBody");

  tableHead.replaceChildren();
  tableBody.replaceChildren();

  const columns =
    type === "violation"
      ? ["Date", "Student ID", "Name", "Violation", "Status"]
      : ["Date", "Student ID", "Name", "Grade", "Section", "Time In", "Time Out", "Status"];

  const headerRow = document.createElement("tr");

  columns.forEach((column) => {
    const th = document.createElement("th");
    th.className = "text-center";
    th.textContent = column;
    headerRow.appendChild(th);
  });

  tableHead.appendChild(headerRow);

  if (records.length === 0) {
    showEmptyMessage(
      type === "violation"
        ? "No violation records found for this date range."
        : "No attendance records found for this date range.",
      columns.length,
    );
  } else {
    records.sort((a, b) => {
      return getRecordDate(b).localeCompare(getRecordDate(a));
    });

    records.forEach((record) => {
      const row = document.createElement("tr");
      const student = getStudentDetails(record, students);

      if (type === "violation") {
        addCell(row, getRecordDate(record));
        addCell(row, student.id);
        addCell(row, student.name);
        addCell(
          row,
          record.violationDescription ||
            record.violationReason ||
            record.violationType ||
            (typeof record.violation === "string" ? record.violation : "") ||
            (typeof record.violations === "string" ? record.violations : "") ||
            "Violation recorded",
        );
        addCell(row, getRecordStatus(record));
      } else {
        addCell(row, getRecordDate(record));
        addCell(row, student.id);
        addCell(row, student.name);
        addCell(row, student.grade);
        addCell(row, student.section);
        addCell(row, formatTime(record.timeIn));
        addCell(row, formatTime(record.timeOut));
        addCell(row, getRecordStatus(record));
      }

      tableBody.appendChild(row);
    });
  }

  const rangeText = fromDate || toDate ? `${fromDate || "Beginning"} to ${toDate || "Today"}` : "All recorded dates";

  message.textContent = `${type === "violation" ? "Violation" : "Attendance"} report — ${rangeText}`;

  document.getElementById("reportRecordCount").textContent =
    `${records.length} record${records.length === 1 ? "" : "s"}`;

  updateTotals(records);
}

// REPORT TOTALS

function updateTotals(records) {
  const visitors = document.getElementById("reportTotalVisitors");
  const checkedIn = document.getElementById("reportCheckedIn");
  const checkedOut = document.getElementById("reportCheckedOut");

  if (visitors) {
    visitors.textContent = records.length;
  }

  if (checkedIn) {
    checkedIn.textContent = records.filter((record) => {
      return Boolean(record.timeIn);
    }).length;
  }

  if (checkedOut) {
    checkedOut.textContent = records.filter((record) => {
      return Boolean(record.timeOut);
    }).length;
  }
}

// PRINT REPORT

function printReport() {
  window.print();
}

// INITIALIZE

document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generateReportButton");
  const printButton = document.getElementById("printReportButton");
  const fromDate = document.getElementById("fromDate");
  const toDate = document.getElementById("toDate");

  // Default date range: today
  const today = getLocalDate();

  if (fromDate && !fromDate.value) {
    fromDate.value = today;
  }

  if (toDate && !toDate.value) {
    toDate.value = today;
  }

  if (generateButton) {
    generateButton.addEventListener("click", generateReport);
  }

  if (printButton) {
    printButton.addEventListener("click", printReport);
  }

  generateReport();

  // Refresh report totals and rows when another tab changes attendance.
  window.addEventListener("storage", (event) => {
    if (ATTENDANCE_KEYS.includes(event.key) || event.key === STUDENT_STORAGE_KEY) {
      generateReport();
    }
  });
});
