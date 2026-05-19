/* ============================================================
   INNOVATEX PROJECT EXPO 2026 — script.js
   Handles: clock, navigation, registration validation,
            feedback validation, dynamic rendering
   ============================================================ */

"use strict";

/* ════════════════════════════════════════════════════════════
   1. NAVIGATION — hamburger toggle
════════════════════════════════════════════════════════════ */
function toggleNav() {
  const links = document.getElementById("navLinks");
  const ham   = document.getElementById("hamburger");
  if (!links) return;
  links.classList.toggle("open");
  if (ham) ham.classList.toggle("open");
}

/* Close nav when a link is clicked (mobile) */
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-links a");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      const nav = document.getElementById("navLinks");
      if (nav) nav.classList.remove("open");
    });
  });
});


/* ════════════════════════════════════════════════════════════
   2. LIVE CLOCK (index.html)
════════════════════════════════════════════════════════════ */
function updateClock() {
  const dateEl = document.getElementById("liveDate");
  const timeEl = document.getElementById("liveTime");
  const dayEl  = document.getElementById("liveDay");
  if (!dateEl || !timeEl || !dayEl) return;

  const now  = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dd  = String(now.getDate()).padStart(2, "0");
  const mon = months[now.getMonth()];
  const yr  = now.getFullYear();

  const hh  = String(now.getHours()).padStart(2, "0");
  const mm  = String(now.getMinutes()).padStart(2, "0");
  const ss  = String(now.getSeconds()).padStart(2, "0");

  dateEl.textContent = `${dd} ${mon} ${yr}`;
  timeEl.textContent = `${hh}:${mm}:${ss}`;
  dayEl.textContent  = days[now.getDay()];
}

setInterval(updateClock, 1000);
updateClock(); // call immediately


/* ════════════════════════════════════════════════════════════
   3. UTILITIES
════════════════════════════════════════════════════════════ */

/** Show an error message below a field */
function showError(fieldId, message) {
  const el = document.getElementById("err-" + fieldId);
  const input = document.getElementById(fieldId);
  if (el) el.textContent = message;
  if (input) {
    input.classList.remove("field-success");
    input.classList.add("field-error");
  }
}

/** Clear an error message */
function clearError(fieldId) {
  const el = document.getElementById("err-" + fieldId);
  const input = document.getElementById(fieldId);
  if (el) el.textContent = "";
  if (input) {
    input.classList.remove("field-error");
    input.classList.add("field-success");
  }
}

/** Clear all errors for a list of field IDs */
function clearAllErrors(ids) {
  ids.forEach(function (id) {
    const el    = document.getElementById("err-" + id);
    const input = document.getElementById(id);
    if (el) el.textContent = "";
    if (input) {
      input.classList.remove("field-error", "field-success");
    }
  });
}

/** Render an alert box */
function renderAlert(containerId, type, icon, title, body) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.className = "alert alert-" + type;
  el.innerHTML =
    "<span class='alert-icon'>" + icon + "</span>" +
    "<div class='alert-body'><strong>" + title + "</strong><p>" + body + "</p></div>";
}


// In-memory storage: array of {regNumber, projectTitle, ...}
var registrations = [];

var REG_FIELDS = [
  "studentName", "regNumber", "email", "mobile",
  "department", "yearOfStudy", "projectTitle",
  "projectCategory", "teamName", "teamSize"
];

/** Validate register number format: letters then digits (e.g. 22CS1001) */
function isValidRegNum(val) {
  return /^[0-9]{2}[A-Z]{2,4}[0-9]{3,6}$/i.test(val.trim());
}

/** Validate email format */
function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
}

/** Validate 10-digit mobile */
function isValidMobile(val) {
  return /^[6-9][0-9]{9}$/.test(val.trim());
}

/** Run full validation; returns true if all pass */
function validateRegistration() {
  var valid = true;

  // Student Name
  var sName = document.getElementById("studentName").value.trim();
  if (!sName) {
    showError("studentName", "Student name is required.");
    valid = false;
  } else if (sName.length < 3) {
    showError("studentName", "Name must be at least 3 characters.");
    valid = false;
  } else if (!/^[a-zA-Z\s.'-]+$/.test(sName)) {
    showError("studentName", "Name can only contain letters and spaces.");
    valid = false;
  } else {
    clearError("studentName");
  }

  // Register Number
  var regNum = document.getElementById("regNumber").value.trim();
  if (!regNum) {
    showError("regNumber", "Register number is required.");
    valid = false;
  } else if (!isValidRegNum(regNum)) {
    showError("regNumber", "Format: 2 digits + dept code + serial (e.g. 22CS1001).");
    valid = false;
  } else {
    clearError("regNumber");
  }

  // Email
  var email = document.getElementById("email").value.trim();
  if (!email) {
    showError("email", "Email ID is required.");
    valid = false;
  } else if (!isValidEmail(email)) {
    showError("email", "Enter a valid email address.");
    valid = false;
  } else {
    clearError("email");
  }

  // Mobile
  var mobile = document.getElementById("mobile").value.trim();
  if (!mobile) {
    showError("mobile", "Mobile number is required.");
    valid = false;
  } else if (!isValidMobile(mobile)) {
    showError("mobile", "Enter a valid 10-digit Indian mobile number.");
    valid = false;
  } else {
    clearError("mobile");
  }

  // Department
  var dept = document.getElementById("department").value;
  if (!dept) {
    showError("department", "Please select your department.");
    valid = false;
  } else {
    clearError("department");
  }

  // Year of Study
  var yr = document.getElementById("yearOfStudy").value;
  if (!yr) {
    showError("yearOfStudy", "Please select your year of study.");
    valid = false;
  } else {
    clearError("yearOfStudy");
  }

  // Project Title
  var title = document.getElementById("projectTitle").value.trim();
  if (!title) {
    showError("projectTitle", "Project title is required.");
    valid = false;
  } else if (title.length < 6) {
    showError("projectTitle", "Title must be at least 6 characters.");
    valid = false;
  } else {
    clearError("projectTitle");
  }

  // Project Category
  var catRaw = document.getElementById("projectCategory").value;
  if (!catRaw) {
    showError("projectCategory", "Please select a project category.");
    valid = false;
  } else {
    var catParts  = catRaw.split("|");
    var catStatus = catParts[1] || "";
    if (catStatus === "closed") {
      showError("projectCategory", "This category is CLOSED. Please choose an open category.");
      valid = false;
    } else {
      clearError("projectCategory");
    }
  }

  // Team Name
  var teamName = document.getElementById("teamName").value.trim();
  if (!teamName) {
    showError("teamName", "Team name is required.");
    valid = false;
  } else if (teamName.length < 2) {
    showError("teamName", "Team name must be at least 2 characters.");
    valid = false;
  } else {
    clearError("teamName");
  }

  // Team Size
  var teamSize = parseInt(document.getElementById("teamSize").value, 10);
  if (isNaN(teamSize) || document.getElementById("teamSize").value.trim() === "") {
    showError("teamSize", "Team size is required.");
    valid = false;
  } else if (teamSize < 2 || teamSize > 4) {
    showError("teamSize", "Team size must be between 2 and 4 members.");
    valid = false;
  } else {
    clearError("teamSize");
  }

  // If basic validation passed, check for duplicates
  if (valid) {
    var normTitle  = title.toLowerCase().trim();
    var normReg    = regNum.toUpperCase().trim();

    for (var i = 0; i < registrations.length; i++) {
      var r = registrations[i];
      // Same register number trying to register same project title
      if (r.regNumber.toUpperCase() === normReg &&
          r.projectTitle.toLowerCase() === normTitle) {
        showError("regNumber", "Duplicate: this register number already registered this project title.");
        showError("projectTitle", "Duplicate registration detected.");
        valid = false;
        break;
      }
      // Same register number registering again in same category
      if (r.regNumber.toUpperCase() === normReg &&
          r.categoryId === (catRaw.split("|")[0])) {
        showError("regNumber", "This register number is already registered in this category.");
        valid = false;
        break;
      }
    }
  }

  return valid;
}

/** Build registration object from form */
function buildRegData() {
  var catRaw  = document.getElementById("projectCategory").value;
  var catParts = catRaw.split("|");
  var catId   = catParts[0];
  var catLabel = document.getElementById("projectCategory").options[
    document.getElementById("projectCategory").selectedIndex
  ].text;

  return {
    id:             "IX" + Date.now(),
    studentName:    document.getElementById("studentName").value.trim(),
    regNumber:      document.getElementById("regNumber").value.trim().toUpperCase(),
    email:          document.getElementById("email").value.trim(),
    mobile:         document.getElementById("mobile").value.trim(),
    department:     document.getElementById("department").value,
    yearOfStudy:    document.getElementById("yearOfStudy").options[
                      document.getElementById("yearOfStudy").selectedIndex].text,
    projectTitle:   document.getElementById("projectTitle").value.trim(),
    categoryId:     catId,
    categoryLabel:  catLabel,
    teamName:       document.getElementById("teamName").value.trim(),
    teamSize:       document.getElementById("teamSize").value,
    timestamp:      new Date().toLocaleString()
  };
}

/** Render success message and registered project details */
function renderSuccessPanel(data) {
  // Show alert
  renderAlert(
    "successAlert", "success", "✅",
    "Registration Successful! 🎉",
    "Project <strong>" + escHtml(data.projectTitle) +
    "</strong> has been registered. Your registration ID is <strong>" +
    data.id + "</strong>."
  );
  document.getElementById("successAlert").classList.remove("hidden");

  // Build detail grid
  var panel = document.getElementById("regDetailsPanel");
  panel.classList.remove("hidden");
  panel.innerHTML =
    "<div class='reg-details-panel'>" +
      "<h3>&#128196; Registered Project Details</h3>" +
      "<div class='detail-grid'>" +
        detailItem("Registration ID",  data.id) +
        detailItem("Student Name",     data.studentName) +
        detailItem("Register Number",  data.regNumber) +
        detailItem("Email",            data.email) +
        detailItem("Mobile",           data.mobile) +
        detailItem("Department",       data.department) +
        detailItem("Year of Study",    data.yearOfStudy) +
        detailItem("Project Title",    data.projectTitle) +
        detailItem("Category",         data.categoryId) +
        detailItem("Team Name",        data.teamName) +
        detailItem("Team Size",        data.teamSize + " member(s)") +
        detailItem("Registered On",    data.timestamp) +
      "</div>" +
    "</div>";

  // Scroll to success
  document.getElementById("successAlert").scrollIntoView({ behavior: "smooth", block: "start" });
}

function detailItem(label, value) {
  return "<div class='detail-item'>" +
    "<span class='d-label'>" + label + "</span>" +
    "<span class='d-value'>" + escHtml(String(value)) + "</span>" +
  "</div>";
}

/** Update registration counter */
function updateCounter() {
  var el = document.getElementById("totalCount");
  if (el) el.textContent = registrations.length;
}

/** Reset registration form */
function resetForm() {
  var form = document.getElementById("regForm");
  if (form) form.reset();
  clearAllErrors(REG_FIELDS);

  var successAlert = document.getElementById("successAlert");
  var regPanel     = document.getElementById("regDetailsPanel");
  if (successAlert) { successAlert.className = "hidden"; successAlert.innerHTML = ""; }
  if (regPanel)     { regPanel.className = "hidden"; regPanel.innerHTML = ""; }
}

/** Escape HTML to prevent XSS */
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Wire up registration form submit */
(function initRegistrationForm() {
  var form = document.getElementById("regForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous global success/error
    var sa = document.getElementById("successAlert");
    var rp = document.getElementById("regDetailsPanel");
    if (sa) { sa.className = "hidden"; sa.innerHTML = ""; }
    if (rp) { rp.className = "hidden"; rp.innerHTML = ""; }

    if (!validateRegistration()) return;

    var data = buildRegData();
    registrations.push(data);

    renderSuccessPanel(data);
    updateCounter();

    // Clear the form after a short delay so user can see details
    setTimeout(function () {
      form.reset();
      clearAllErrors(REG_FIELDS);
    }, 500);
  });

  // Live validation on blur
  REG_FIELDS.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("blur", function () {
      // trigger validation just for this field by running full validation
      // but suppress the "required" errors of other untouched fields
      var val = el.value.trim();
      if (val === "" && el.tagName === "SELECT" && val !== "0") return;
      if (val !== "") validateRegistration();
    });
  });
})();


/* ════════════════════════════════════════════════════════════
   5. FEEDBACK
════════════════════════════════════════════════════════════ */

var feedbackEntries = [];

var FB_FIELDS = ["fbStudentName", "fbRegNumber", "fbCategory", "fbComments"];

/** Get selected star rating value */
function getSelectedRating() {
  var radios = document.querySelectorAll('input[name="rating"]');
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) return parseInt(radios[i].value, 10);
  }
  return 0;
}

/** Validate feedback form */
function validateFeedback() {
  var valid = true;

  // Name
  var name = document.getElementById("fbStudentName").value.trim();
  if (!name || name.length < 3) {
    showError("fbStudentName", !name ? "Name is required." : "Name must be at least 3 characters.");
    valid = false;
  } else { clearError("fbStudentName"); }

  // Register Number
  var regNum = document.getElementById("fbRegNumber").value.trim();
  if (!regNum) {
    showError("fbRegNumber", "Register number is required.");
    valid = false;
  } else if (!isValidRegNum(regNum)) {
    showError("fbRegNumber", "Format: 2 digits + dept code + serial (e.g. 22CS1001).");
    valid = false;
  } else { clearError("fbRegNumber"); }

  // Category
  var cat = document.getElementById("fbCategory").value;
  if (!cat) {
    showError("fbCategory", "Please select the project / category you visited.");
    valid = false;
  } else { clearError("fbCategory"); }

  // Rating
  var rating = getSelectedRating();
  if (rating === 0) {
    var errEl = document.getElementById("err-fbRating");
    if (errEl) errEl.textContent = "Please select a rating from 1 to 5.";
    valid = false;
  } else {
    var errEl2 = document.getElementById("err-fbRating");
    if (errEl2) errEl2.textContent = "";
  }

  // Comments — min 20 chars
  var comments = document.getElementById("fbComments").value.trim();
  if (!comments) {
    showError("fbComments", "Comments are required.");
    valid = false;
  } else if (comments.length < 20) {
    showError("fbComments", "Comments must be at least 20 characters (currently " + comments.length + ").");
    valid = false;
  } else { clearError("fbComments"); }

  return valid;
}

/** Render stars string */
function starsStr(n) {
  var filled = "";
  var empty  = "";
  for (var i = 0; i < n; i++)       filled += "★";
  for (var j = n; j < 5; j++)       empty  += "☆";
  return filled + empty;
}

/** Update summary section */
function renderFeedbackSummary() {
  var totalEl   = document.getElementById("totalFeedbacks");
  var avgDispEl = document.getElementById("avgRatingDisplay");
  var avgNumEl  = document.getElementById("avgNum");
  var avgStarsEl= document.getElementById("avgStars");
  var avgLblEl  = document.getElementById("avgLabelText");
  var container = document.getElementById("feedbackEntriesContainer");

  if (!totalEl) return;

  totalEl.textContent = feedbackEntries.length;

  if (feedbackEntries.length === 0) {
    avgDispEl.textContent = "–";
    avgNumEl.textContent  = "–";
    avgStarsEl.innerHTML  = "☆☆☆☆☆";
    avgLblEl.textContent  = "No feedback submitted yet";
    container.innerHTML   = "<p style='color:var(--text-muted);font-size:0.88rem;font-style:italic;text-align:center;padding:2rem 0;'>No feedback submitted yet. Be the first to share your experience!</p>";
    return;
  }

  var total = feedbackEntries.reduce(function (sum, f) { return sum + f.rating; }, 0);
  var avg   = (total / feedbackEntries.length).toFixed(1);

  avgDispEl.textContent = avg;
  avgNumEl.textContent  = avg;
  avgStarsEl.innerHTML  = starsStr(Math.round(parseFloat(avg)));
  avgLblEl.textContent  = "Based on " + feedbackEntries.length + " response(s)";

  // Render entry cards (newest first)
  var html = "<div class='feedback-entries'>";
  var sorted = feedbackEntries.slice().reverse();
  sorted.forEach(function (f) {
    html +=
      "<div class='feedback-entry'>" +
        "<div class='fe-header'>" +
          "<span class='fe-name'>" + escHtml(f.name) + " <span style='color:var(--text-muted);font-size:0.8rem;font-weight:400;'>(" + escHtml(f.regNumber) + ")</span></span>" +
          "<span class='fe-stars'>" + starsStr(f.rating) + "</span>" +
        "</div>" +
        "<div class='fe-category'>" + escHtml(f.category) + "</div>" +
        "<div class='fe-comment'>&#8220;" + escHtml(f.comments) + "&#8221;</div>" +
      "</div>";
  });
  html += "</div>";
  container.innerHTML = html;
}

/** Reset feedback form */
function resetFeedbackForm() {
  var form = document.getElementById("feedbackForm");
  if (form) form.reset();
  clearAllErrors(FB_FIELDS);
  var errRating = document.getElementById("err-fbRating");
  if (errRating) errRating.textContent = "";
  var cc = document.getElementById("charCount");
  if (cc) cc.textContent = "0 / min 20 characters";

  var sa = document.getElementById("fbSuccessAlert");
  if (sa) { sa.className = "hidden"; sa.innerHTML = ""; }
}

/** Wire up feedback form */
(function initFeedbackForm() {
  var form = document.getElementById("feedbackForm");
  if (!form) return;

  // Character counter
  var commentsEl = document.getElementById("fbComments");
  var charCount  = document.getElementById("charCount");
  if (commentsEl && charCount) {
    commentsEl.addEventListener("input", function () {
      var len = commentsEl.value.trim().length;
      charCount.textContent = len + " / min 20 characters";
      charCount.style.color = len >= 20 ? "var(--neon-green)" : "var(--text-muted)";
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var sa = document.getElementById("fbSuccessAlert");
    if (sa) { sa.className = "hidden"; sa.innerHTML = ""; }

    if (!validateFeedback()) return;

    var entry = {
      name:      document.getElementById("fbStudentName").value.trim(),
      regNumber: document.getElementById("fbRegNumber").value.trim().toUpperCase(),
      category:  document.getElementById("fbCategory").value,
      rating:    getSelectedRating(),
      comments:  document.getElementById("fbComments").value.trim(),
      time:      new Date().toLocaleTimeString()
    };

    feedbackEntries.push(entry);

    // Show success
    renderAlert(
      "fbSuccessAlert", "success", "✅",
      "Feedback Submitted! Thank you.",
      "Your feedback for <strong>" + escHtml(entry.category) + "</strong> has been recorded. Rating: " + starsStr(entry.rating)
    );
    if (sa) sa.classList.remove("hidden");

    renderFeedbackSummary();

    // Reset
    form.reset();
    clearAllErrors(FB_FIELDS);
    var errRating = document.getElementById("err-fbRating");
    if (errRating) errRating.textContent = "";
    if (charCount) { charCount.textContent = "0 / min 20 characters"; charCount.style.color = ""; }

    // Scroll to summary
    var sumSection = document.getElementById("fbSummarySection");
    if (sumSection) sumSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Initial render (empty state)
  renderFeedbackSummary();
})();