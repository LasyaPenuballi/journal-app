// script.js

// Redirect if not logged in
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

// Get today's date as key
const today = new Date().toISOString().split("T")[0];

const form = document.getElementById("entry-form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const entriesDiv = document.getElementById("entries");

// Load entries from localStorage or create empty
let entries = JSON.parse(localStorage.getItem("dailyEntries")) || {};

const datePicker = document.getElementById("entry-date");
let selectedDate = today; // Default to today


// Initialize today's array if not exists
if (!entries[today]) {
  entries[today] = [];
}

// Render all of today's entries
renderTodayEntries();

// On form submit, add new entry to today's list
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const editIndex = document.getElementById("edit-index").value;

  const updatedEntry = {
    title: titleInput.value,
    content: contentInput.value
  };

  if (editIndex === "") {
    // New entry
    entries[selectedDate].unshift(updatedEntry);
  } else {
    // Edit existing entry
    entries[selectedDate][editIndex] = updatedEntry;
    document.getElementById("edit-index").value = "";
  }

  localStorage.setItem("dailyEntries", JSON.stringify(entries));
  renderTodayEntries();

  titleInput.value = "";
  contentInput.value = "";
});


function renderTodayEntries() {
  entriesDiv.innerHTML = "";

  const todaysEntries = entries[today];

  if (!todaysEntries || todaysEntries.length === 0) {
    entriesDiv.innerHTML = "<p>No entries for today yet.</p>";
    return;
  }

  todaysEntries.forEach((entry, index) => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <h3>${entry.title}</h3>
      <small>${today}</small>
      <p>${entry.content}</p>
      <button onclick="editEntry(${index})">Edit</button>
      <button onclick="deleteEntry(${index})">Delete</button>
    `;
    entriesDiv.appendChild(div);
  });
}

window.onload = function () {
  datePicker.value = today;              // Set today's date in the picker
  renderSelectedDateEntries();           // Render entries for today
};

datePicker.addEventListener("change", function () {
  selectedDate = this.value;
  renderSelectedDateEntries();           // Show entries for the selected date
});

function renderSelectedDateEntries() {
  entriesDiv.innerHTML = "";

  const dateEntries = entries[selectedDate];

  if (!dateEntries || dateEntries.length === 0) {
    entriesDiv.innerHTML = `<p>No entries for ${selectedDate}.</p>`;
    return;
  }

  dateEntries.forEach((entry, index) => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <h3>${entry.title}</h3>
      <small>${selectedDate}</small>
      <p>${entry.content}</p>
      ${selectedDate === today ? `
        <button onclick="editEntry(${index})">Edit</button>
        <button onclick="deleteEntry(${index})">Delete</button>
      ` : ""}
    `;
    entriesDiv.appendChild(div);
  });
}

function deleteEntry(index) {
  if (confirm("Are you sure you want to delete this entry?")) {
    entries[selectedDate].splice(index, 1); // Remove from today's array
    localStorage.setItem("dailyEntries", JSON.stringify(entries));
    renderTodayEntries(); // Refresh the list
  }
}
function editEntry(index) {
  const entry = entries[selectedDate][index];
  titleInput.value = entry.title;
  contentInput.value = entry.content;
  document.getElementById("edit-index").value = index;
}

// Logout function
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}
