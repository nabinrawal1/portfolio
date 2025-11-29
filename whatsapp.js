// WhatsApp Integration JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp Form Button Functionality
    const whatsappFormBtn = document.getElementById('whatsappFormBtn');
    
    if (whatsappFormBtn) {
        whatsappFormBtn.addEventListener('click', function() {
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields before sending via WhatsApp.');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `Hi Nabin!%0A%0A*Contact Form Submission*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Subject:* ${encodeURIComponent(subject)}%0A*Message:*%0A${encodeURIComponent(message)}`;
            
            // Open WhatsApp
            window.open(`https://wa.me/9779840295924?text=${whatsappMessage}`, '_blank');
        });
    }
    
    // Add WhatsApp share functionality to projects
    addWhatsAppShareToProjects();
    
    // WhatsApp click tracking (optional)
    trackWhatsAppClicks();
});

// Function to add WhatsApp share to projects
function addWhatsAppShareToProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const projectLinks = card.querySelector('.project-links');
        const projectTitle = card.querySelector('.project-title').textContent;
        const projectDescription = card.querySelector('.project-description').textContent;
        
        
        
        // Add to project links
        if (projectLinks) {
            projectLinks.appendChild(whatsappShare);
        }
    });
}

// Function to track WhatsApp clicks (optional analytics)
function trackWhatsAppClicks() {
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('WhatsApp link clicked:', this.href);
            
            // Example: Send to Google Analytics
            // gtag('event', 'whatsapp_click', {
            //     'event_category': 'Contact',
            //     'event_label': this.href
            // });
        });
    });
}

// Function to open WhatsApp with custom message
function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/9779840295924?text=${encodedMessage}`, '_blank');
}

// Export functions for global use (if needed)
window.whatsAppUtils = {
    openWhatsApp: openWhatsApp,
    shareProject: function(title, description) {
        const message = `Check out this project by Nabin Rawal:%0A%0A*${title}*%0A%0A${description}%0A%0AView more at his portfolio.`;
        openWhatsApp(message);
    }
};