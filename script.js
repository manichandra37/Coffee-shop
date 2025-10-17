// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal functionality
const modal = document.getElementById('bookingModal');
const bookTableBtn = document.getElementById('bookTableBtn');
const closeBtn = document.querySelector('.close');
const bookingForm = document.getElementById('bookingForm');

// Open modal
bookTableBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form validation and submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const message = document.getElementById('message').value.trim();
    
    // Validation
    let isValid = true;
    let errorMessage = '';
    
    // Name validation
    if (name === '') {
        isValid = false;
        errorMessage += 'Please enter your name.\n';
    } else if (name.length < 2) {
        isValid = false;
        errorMessage += 'Name must be at least 2 characters long.\n';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        isValid = false;
        errorMessage += 'Please enter your email address.\n';
    } else if (!emailRegex.test(email)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.\n';
    }
    
    // Date validation
    if (date === '') {
        isValid = false;
        errorMessage += 'Please select a date.\n';
    } else {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            errorMessage += 'Please select a future date.\n';
        }
    }
    
    // Time validation
    if (time === '') {
        isValid = false;
        errorMessage += 'Please select a time.\n';
    } else {
        const [hours, minutes] = time.split(':').map(Number);
        const selectedTime = hours * 60 + minutes;
        const openingTime = 7 * 60; // 7:00 AM
        const closingTime = 21 * 60; // 9:00 PM
        
        if (selectedTime < openingTime || selectedTime > closingTime) {
            isValid = false;
            errorMessage += 'Please select a time between 7:00 AM and 9:00 PM.\n';
        }
    }
    
    // Display validation results
    if (isValid) {
        // Success message
        alert(`Thank you, ${name}! Your table has been booked for ${formatDate(date)} at ${formatTime(time)}. We've sent a confirmation to ${email}.`);
        
        // Reset form and close modal
        bookingForm.reset();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        // Error message
        alert('Please correct the following errors:\n\n' + errorMessage);
    }
});

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Helper function to format time
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Add active state to navigation on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(62, 39, 35, 0.95)';
    } else {
        navbar.style.backgroundColor = 'var(--dark-brown)';
    }
});

// Set minimum date for booking form to today
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
});

