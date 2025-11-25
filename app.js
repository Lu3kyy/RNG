let students = [];
const recentHistory = [];

// Grab elements from the page
const currentNameEl = document.getElementById("currentName");
const currentCodeEmailEl = document.getElementById("currentCodeEmail");
const currentPersonalEmailEl = document.getElementById("currentPersonalEmail");
const recentListEl = document.getElementById("recentList");
const pickBtn = document.getElementById("pickBtn");

// Load the data from students.json
fetch("students.json")
  .then((response) => response.json())
  .then((data) => {
    students = data;
  })
  .catch((error) => {
    console.error("Error loading students.json:", error);
    currentNameEl.textContent = "Error loading student data.";
  });

// Called when the button is clicked
function pickRandomStudent() {
  if (students.length === 0) {
    currentNameEl.textContent = "No students available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * students.length);
  const student = students[randomIndex];

  // THIS is where your data replaces the text in index.html
  displayStudent(student);
  addToRecent(student);
}

// Update the main card text
function displayStudent(student) {
  const fullName = student.firstName + " " + student.lastName;

  currentNameEl.textContent = fullName;

  currentCodeEmailEl.innerHTML =
    "<strong>CodeStack Email:</strong> " +
    (student.codeEmail === "N/A"
      ? '<span class="text-muted">N/A</span>'
      : '<span class="code-email">' + student.codeEmail + "</span>");

  currentPersonalEmailEl.innerHTML =
    "<strong>Personal Email:</strong> " + student.personalEmail;
}

// Keep track of the last 5 picked
function addToRecent(student) {
  recentHistory.unshift(student); // add to front

  if (recentHistory.length > 5) {
    recentHistory.pop(); // remove oldest
  }

  renderRecent();
}

// Update the right side recent list
function renderRecent() {
  recentListEl.innerHTML = "";

  if (recentHistory.length === 0) {
    const empty = document.createElement("div");
    empty.classList.add("text-muted");
    empty.textContent = "No picks yet.";
    recentListEl.appendChild(empty);
    return;
  }

  recentHistory.forEach((student, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className =
      "list-group-item list-group-item-action recent-name d-flex flex-column align-items-start";

    const fullName = student.firstName + " " + student.lastName;

    item.innerHTML = `
      <div class="fw-semibold">${index + 1}. ${fullName}</div>
      <div class="small">
        <div><strong>CodeStack:</strong> ${
          student.codeEmail === "N/A"
            ? '<span class="text-muted">N/A</span>'
            : '<span class="code-email">' + student.codeEmail + "</span>"
        }</div>
        <div><strong>Email:</strong> ${student.personalEmail}</div>
      </div>
    `;

    // show a recent entry
    item.addEventListener("click", () => {
      displayStudent(student);
    });

    recentListEl.appendChild(item);
  });
}

// button
pickBtn.addEventListener("click", pickRandomStudent);
