// script.js

const scriptURL = "https://script.google.com/macros/s/AKfycbwc6Q8yjPVleOEHrdhcH5oHMrebCDeSv_Xfr5LykcLQ_x1omrHNAEGuW0yYcQ77QtT54g/exec";

const form = document.getElementById('jobForm');
const alertBox = document.getElementById('alertBox');

function showAlert(message, type = 'success') {
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  alertBox.style.display = 'block';
  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 3500);
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const data = {
    jobName: form.jobName.value.trim(),
    jobLink: form.jobLink.value.trim(),
    avinash: form.avinash.checked,
    vartika: form.vartika.checked
  };

  if (!data.jobName || !data.jobLink) {
    showAlert("Please fill in all required fields.", "error");
    return;
  }

  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors',  // Google Apps Script CORS limitation
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(() => {
    showAlert("Job entry added successfully!");
    form.reset();
  })
  .catch(err => {
    console.error(err);
    showAlert("Failed to add job. Try again.", "error");
  });
});
