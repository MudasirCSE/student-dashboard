// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});
let notificationCount = 0;
const badge = document.getElementById('badge');
const notificationIcon = document.getElementById('notificationIcon');


// Profile Picture Upload
document.getElementById('profile-pic').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = () => {
        const reader = new FileReader();
        reader.onload = () => {
            const imageSrc = reader.result;
            document.getElementById('profile-pic').src = imageSrc;
            localStorage.setItem('profilePic', imageSrc);
        };
        reader.readAsDataURL(input.files[0]);
    };
});

// Time Formatting
function formatTimeToAMPM(hours, minutes) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

// Add Reminder
function addReminder(name, time) {
    const reminderItem = document.createElement('div');
    reminderItem.classList.add('reminder-item');
    reminderItem.innerHTML = `
        <span class="reminder-name">${name}</span>
        <span class="reminder-time">${time}</span>
        <button class="btn-delete-reminder">Delete</button>
    `;
    reminderItem.querySelector('.btn-delete-reminder').onclick = () => {
        reminderItem.remove();
        saveReminders();
        // Decrease and Save Notification Count
        if (notificationCount > 0) {
            notificationCount--;
            localStorage.setItem('notificationCount', notificationCount);

            if (notificationCount === 0) {
                badge.style.display = 'none';
            } else {
                badge.textContent = notificationCount;
            }
        }
    };
    document.getElementById('reminders-list').appendChild(reminderItem);
    saveReminders();
    // Increase and Save Notification Count
    notificationCount++;
    localStorage.setItem('notificationCount', notificationCount);
    badge.style.display = 'inline-block';
    badge.textContent = notificationCount;
}

// Save Reminders to LocalStorage
function saveReminders() {
    const reminders = Array.from(document.querySelectorAll('.reminder-item')).map(item => ({
        name: item.querySelector('.reminder-name').textContent,
        time: item.querySelector('.reminder-time').textContent
    }));
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

// Load Reminders from LocalStorage
function loadReminders() {
    const savedReminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    savedReminders.forEach(reminder => addReminder(reminder.name, reminder.time));
}

// Form Submission
document.getElementById('reminder-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('reminder-name').value;
    const timeParts = document.getElementById('reminder-time').value.split(':');
    const time = formatTimeToAMPM(parseInt(timeParts[0]), parseInt(timeParts[1]));
    addReminder(name, time);
    document.getElementById('reminder-name').value = '';
    document.getElementById('reminder-time').value = '';
});

// Initialize on page load
window.onload = () => {
    document.getElementById('profile-pic').src = localStorage.getItem('profilePic') || '../pic.jpg';
    loadReminders();
};
