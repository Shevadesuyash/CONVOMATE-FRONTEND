// Handle form validation logic
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('#contact form');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const validationMessage = document.querySelector('.validation');
            const isValid = validateForm(form);

            if (!isValid) {
                validationMessage.style.display = 'block';
                validationMessage.textContent = 'Please fill in all fields correctly.';
            } else {
                validationMessage.style.display = 'none';
                // Process the form submission here (AJAX, etc.)
            }
        });
    }
});

// Validate the form fields
function validateForm(form) {
    let isValid = true;

    // Add your validation logic here
    form.querySelectorAll('input, textarea').forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;
        }
    });

    return isValid;
}
