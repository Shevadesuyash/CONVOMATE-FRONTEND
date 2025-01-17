// Handle mobile navigation toggling and interactions

document.addEventListener("DOMContentLoaded", function() {
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const bodyOverly = document.getElementById('mobile-body-overly');

    // Mobile navigation toggle
    mobileNavToggle.addEventListener('click', function() {
        bodyOverly.style.display = "block";
        mobileNav.style.left = "0";
    });

    // Body overlay click
    bodyOverly.addEventListener('click', function() {
        mobileNav.style.left = "-260px";
        bodyOverly.style.display = "none";
    });
});
