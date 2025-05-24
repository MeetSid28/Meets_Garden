// Sweet messages system for Mist garden app

// Sweet messages from the creator
const sweetMessages = [
    "The creator says you look gorgeous today 💖",
    "The creator says you're the most wonderful woman 🌹",
    "The creator says hi meri poplu 💕",
    "The creator says I love you bubu 💗",
    "The creator says he's blessed to have you in his life 🌸",
    "The creator says you're his lifeline 💝",
    "The creator says your smile lights up his world ✨",
    "The creator says you make every day magical 🦋",
    "The creator says you're his favorite person 💘",
    "The creator says you're absolutely perfect 🌺",
    "The creator says you're his heart and soul 💖",
    "The creator says you're his everything 🌷"
];

let messageInterval;
let isMessageSystemActive = false;

// Initialize sweet messages system
function initializeSweetMessages() {
    if (isMessageSystemActive) return;
    
    isMessageSystemActive = true;
    
    // Start showing messages every 30 seconds
    messageInterval = setInterval(() => {
        showSweetMessage();
    }, 30000);
    
    // Show first message after 30 seconds
    setTimeout(() => {
        showSweetMessage();
    }, 30000);
}

// Show a sweet message
function showSweetMessage() {
    const randomMessage = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
    createFloatingMessage(randomMessage);
}

// Create floating message animation
function createFloatingMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'sweet-message-container';
    messageElement.innerHTML = `
        <div class="sweet-message">
            <div class="message-text">${message}</div>
            <div class="message-decoration">✨💕✨</div>
        </div>
    `;
    
    // Add styles
    messageElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: -100%;
        width: 100%;
        z-index: 10000;
        pointer-events: none;
        transform: translateY(-50%);
    `;
    
    document.body.appendChild(messageElement);
    
    // Animate message across screen
    const animation = messageElement.animate([
        {
            transform: 'translate(-100%, -50%) scale(0.8)',
            opacity: 0
        },
        {
            transform: 'translate(0%, -50%) scale(1)',
            opacity: 1,
            offset: 0.2
        },
        {
            transform: 'translate(0%, -50%) scale(1)',
            opacity: 1,
            offset: 0.8
        },
        {
            transform: 'translate(100%, -50%) scale(0.8)',
            opacity: 0
        }
    ], {
        duration: 4000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    // Remove element after animation
    animation.onfinish = () => {
        messageElement.remove();
    };
    
    // Play gentle notification sound
    if (window.playNotificationSound) {
        window.playNotificationSound('gentle');
    }
}

// Stop sweet messages system
function stopSweetMessages() {
    if (messageInterval) {
        clearInterval(messageInterval);
        messageInterval = null;
    }
    isMessageSystemActive = false;
}

// Initialize when DOM is loaded and user is authenticated
document.addEventListener('DOMContentLoaded', function() {
    // Only start messages in the garden page
    if (window.location.pathname === '/garden' || window.location.pathname.includes('garden')) {
        initializeSweetMessages();
    }
});

// Export functions
window.SweetMessages = {
    initializeSweetMessages,
    stopSweetMessages,
    showSweetMessage
};