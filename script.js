// Theme Toggle Functionality
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});

// Set profile pic from localStorage on page load
window.onload = function() {
    const savedProfilePic = localStorage.getItem('profilePic');
    if (savedProfilePic) {
        document.getElementById('profile-pic').src = savedProfilePic;
    }
      // Load saved reminders from localStorage
};

// Profile Picture Upload
document.getElementById('profile-pic').addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = function() {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function() {
            const imageSrc = reader.result;
            document.getElementById('profile-pic').src = imageSrc;

            // Save the image in localStorage
            localStorage.setItem('profilePic', imageSrc);
        };

        reader.readAsDataURL(file);
    };
});

// Get all the sections
const coursesSection = document.getElementById('courses-section');
const quizzesSection = document.getElementById('quizzes-section');
const remindersSection = document.getElementById('reminders-section');
const welcomeSection = document.querySelector('.welcome-section'); // Get the welcome section

// Get buttons
const coursesBtn = document.getElementById('courses-btn');
const quizzesBtn = document.getElementById('quizzes-btn');
const remindersBtn = document.getElementById('reminders-btn');




