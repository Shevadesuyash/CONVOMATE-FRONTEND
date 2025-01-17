// Main JavaScript file

// Ensure document is fully loaded before execution
document.addEventListener("DOMContentLoaded", function() {
    init();
});

function init() {
    // Call other initialization functions here
    setupMobileNavToggle();
    setupBackToTopButton();
    setupFormValidation();
}

// Function to initialize the mobile nav toggle
function setupMobileNavToggle() {
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const bodyOverly = document.getElementById('mobile-body-overly');

    mobileNavToggle.addEventListener('click', function() {
        bodyOverly.style.display = "block";
        mobileNav.style.left = "0";
    });

    bodyOverly.addEventListener('click', function() {
        mobileNav.style.left = "-260px";
        bodyOverly.style.display = "none";
    });
}
