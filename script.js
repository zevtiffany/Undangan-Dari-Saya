// Initialize Lucide Icons
lucide.createIcons();

// State to store user selections
const state = {
    activity: '',
    date: '',
    time: '',
    location: ''
};

// Navigation functions
function nextStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    // Show target step
    document.getElementById(`step-${stepNumber}`).classList.add('active');
}

function prevStep(stepNumber) {
    nextStep(stepNumber);
}

// Step 2 Action
function selectActivity(activityName) {
    state.activity = activityName;
    document.getElementById('activity-label').textContent = `Kapan kita mau ${activityName.toLowerCase()}?`;
    nextStep(3);
}

// Step 3 Action
function confirmSelection() {
    const dateInput = document.getElementById('date-input').value;
    const timeInput = document.getElementById('time-input').value;
    const locationInput = document.getElementById('location-input').value;

    if (!dateInput || !timeInput || !locationInput) {
        alert('Tolong isi tanggal, waktu, dan lokasi dulu yaa! 🥺');
        return;
    }

    // Format date beautifully (optional)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateObj = new Date(dateInput);
    const formattedDate = dateObj.toLocaleDateString('id-ID', options);

    state.date = formattedDate;
    state.time = timeInput;
    state.location = locationInput;

    // Update summary in Step 4
    document.getElementById('summary-activity').textContent = state.activity;
    document.getElementById('summary-date').textContent = state.date;
    document.getElementById('summary-time').textContent = state.time;
    document.getElementById('summary-location').textContent = state.location;

    nextStep(4);
}

// Step 4 Action (WhatsApp Redirect)
function sendToWhatsApp() {
    const phoneNumber = "6282142720110"; // Nomor WA tujuan yang di-request user

    // Construct the message
    const message = `Halo! aku mau banget nih diajakin ${state.activity}.\n\nTanggal: ${state.date}\nJam: ${state.time}\nLokasi: ${state.location}\n\nCan't wait!`;

    // URL Encode the message
    const encodedMessage = encodeURIComponent(message);

    // Generate WhatsApp link (using api.whatsapp.com for better cross-device & iOS compatibility)
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    // Open in new tab, or same tab on mobile to ensure deep link works
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        window.location.href = whatsappURL;
    } else {
        window.open(whatsappURL, '_blank');
    }
}

// Set Minimum Date to Today for Date Input
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date-input');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
});
