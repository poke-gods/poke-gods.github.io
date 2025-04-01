// Simulate user login status
let isLoggedIn = false;

document.addEventListener('DOMContentLoaded', () => {
    const authButton = document.getElementById('auth-button');
    const userIcon = document.getElementById('user-icon');
    const playerIdField = document.getElementById('playerId');

    // Auto-generate Player ID
    playerIdField.value = generatePlayerId();

    // Toggle visibility based on login status
    toggleAuthDisplay();

    // Handle Sign Up Form Submission
    document.getElementById('signUpForm').addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate email
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Validate passwords
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Simulate successful sign up
        isLoggedIn = true;
        toggleAuthDisplay();

        // Close the Sign Up modal
        const signUpModal = bootstrap.Modal.getInstance(document.getElementById('signUpModal'));
        signUpModal.hide();

        // Show the success modal
        const successModal = new bootstrap.Modal(document.getElementById('signUpSuccessModal'));
        successModal.show();
    });

    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach((icon) => {
        icon.addEventListener('click', () => {
            const targetId = icon.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                targetInput.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
});

// Function to toggle visibility of Sign Up button and User Icon
function toggleAuthDisplay() {
    const authButton = document.getElementById('auth-button');
    const userIcon = document.getElementById('user-icon');

    if (isLoggedIn) {
        authButton.classList.add('d-none'); // Hide the Sign Up button
        userIcon.classList.remove('d-none'); // Show the user icon
    } else {
        authButton.classList.remove('d-none'); // Show the Sign Up button
        userIcon.classList.add('d-none'); // Hide the user icon
    }
}

// Function to generate a random Player ID in the format #### #### ####
function generatePlayerId() {
    const randomNumbers = () => Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit number
    return `${randomNumbers()} ${randomNumbers()} ${randomNumbers()}`;
}

// Function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}