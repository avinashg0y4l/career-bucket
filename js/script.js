const scriptURL = "https://script.google.com/macros/s/AKfycbxryV098DOvZgYds5iQewhSPJM6Jze4sg2nf1KHqbINzWRS6c9w4Eq4FV78jHhWhN9F0w/exec";

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

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    jobName: form.jobName.value.trim(),
    jobLink: form.jobLink.value.trim(),
    avinash: form.avinash.checked,
    vartika: form.vartika.checked,
    description: form.description ? form.description.value.trim() : ""
  };

  if (!data.jobName || !data.jobLink) {
    showAlert("Please fill in all required fields.", "error");
    return;
  }

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.status === "success") {
      showAlert(result.message, "success");
      form.reset();
    } else {
      showAlert(result.message || "Failed to add job.", "error");
    }
  } catch (err) {
    console.error(err);
    showAlert("Something went wrong. Try again.", "error");
  }
});
