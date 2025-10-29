
const display = document.getElementById("project")
console.log(display)
async function repos(){
    const response = await fetch( "https://api.github.com/users/Aderemi90/repos")
    if (!response.ok){
        throw new Error("Network is really bad today o!!!")
    }
    const data = await response.json()
    render(data)
}
repos()

function render(data){
    let html = ''
    data.forEach(value => {

    html +=`
          <div class="card">
            <a href="${value.html_url}" target="_blank">${value.name}</a>
            <p>${value.description ? value.description : "No description available."}</p>
            <p class="language">Language: ${value.language}</p>
            <div class="visit"><a href="${value.homepage}" target="_blank">Visit Project</a></div>
          </div>
    `
    });
    display.innerHTML = html
}
//  const form = document.getElementById("contact-form");

//   form.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const formData = new FormData(form);
//     const response = await fetch(form.action, {
//       method: form.method,
//       body: formData,
//       headers: { Accept: "application/json" },
//     });

//     if (response.ok) {
//       window.location.href = "thankyou.html";
//     } else {
//       alert("There was an issue sending your message. Please try again.");
//     }
//   });

// Select the form (replace '#contact-form' with your actual form ID or class)
const form = document.querySelector('#contact-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Optional: Disable submit button to prevent double submission
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  try {
    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Success: Redirect to thank you page
      window.location.href = 'thankyou.html';
    } else {
      // Handle server errors (e.g., 400, 500)
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to send message. Please try again.');
    }
  } catch (error) {
    // Network or unexpected errors
    console.error('Submission error:', error);
    alert(error.message || 'Oops! Something went wrong. Please check your connection and try again.');
  } finally {
    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});



