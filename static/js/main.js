// Main JavaScript functionality for Mist garden app

// Global variables
let mainAudioContext;
let isAudioInitialized = false;

// Initialize the garden when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAudio();
    initializeMainFeatures();
});

// Initialize main features
function initializeMainFeatures() {
    // Set up task completion handlers
    setupTaskCompletion();
    
    // Set up love input easter egg
    setupLoveEasterEgg();
    
    // Initialize form interactions
    setupFormInteractions();
    
    // Add hover effects to cards
    setupCardHoverEffects();
    
    // Initialize achievement notifications
    checkForNewAchievements();
}

// Set up task completion with animations
function setupTaskCompletion() {
    const completeButtons = document.querySelectorAll('.complete-btn');
    
    completeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const taskCard = this.closest('.task-card');
            const taskId = taskCard.dataset.taskId;
            
            // Trigger completion animation
            triggerTaskCompletionAnimation(taskCard);
            
            // Play completion sound
            playTaskCompleteSound();
            
            // Redirect after animation
            setTimeout(() => {
                window.location.href = this.href;
            }, 1500);
        });
    });
}

// Set up love input easter egg
function setupLoveEasterEgg() {
    const loveInput = document.getElementById('loveInput');
    
    if (loveInput) {
        loveInput.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            
            if (value.includes('love')) {
                triggerLoveAnimation();
                showSweetLoveMessage(); // Show message in center
                this.value = '';
                playLoveSound();
            }
        });
        
        // Add some other easter eggs
        loveInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const value = this.value.toLowerCase();
                
                if (value.includes('heart') || value.includes('💖')) {
                    createHeartExplosion();
                    this.value = '';
                    playSuccessSound();
                } else if (value.includes('flower') || value.includes('🌹')) {
                    createPetalRain();
                    this.value = '';
                    playFlowerSound();
                }
            }
        });
    }
}

// Set up form interactions
function setupFormInteractions() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            }
        });
    });
    
    // Add focus effects to inputs
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Set up card hover effects
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.task-card, .garden-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Check for new achievements
function checkForNewAchievements() {
    // This would typically check with server for new achievements
    // For now, we'll add visual feedback for unlocked achievements
    const unlockedAchievements = document.querySelectorAll('.achievement-item.unlocked');
    
    unlockedAchievements.forEach((achievement, index) => {
        setTimeout(() => {
            achievement.style.animation = 'pulse 1s ease-in-out';
        }, index * 200);
    });
}

// Initialize garden-specific features
function initializeGarden() {
    // Add sparkle effects to completed tasks
    addSparkleEffects();
    
    // Initialize progress animations
    animateProgressElements();
    
    // Set up notification system
    setupNotifications();
}

// Add sparkle effects to completed tasks
function addSparkleEffects() {
    const completedTasks = document.querySelectorAll('.task-card.completed');
    
    completedTasks.forEach(task => {
        if (!task.querySelector('.sparkle-effect')) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-effect';
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.top = '10px';
            sparkle.style.right = '10px';
            sparkle.style.animation = 'pulse 2s infinite';
            task.style.position = 'relative';
            task.appendChild(sparkle);
        }
    });
}

// Animate progress elements
function animateProgressElements() {
    const streakNumber = document.querySelector('.streak-number');
    const flowerBucks = document.querySelector('.stats-display');
    
    if (streakNumber) {
        animateNumber(streakNumber);
    }
    
    if (flowerBucks) {
        const bucksText = flowerBucks.textContent;
        const bucksMatch = bucksText.match(/(\d+)/);
        if (bucksMatch) {
            animateNumber(flowerBucks, parseInt(bucksMatch[1]));
        }
    }
}

// Animate number counting
function animateNumber(element, targetNumber = null) {
    if (targetNumber === null) {
        targetNumber = parseInt(element.textContent) || 0;
    }
    
    let currentNumber = 0;
    const increment = Math.ceil(targetNumber / 30);
    const originalText = element.textContent;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
        }
        
        if (element.classList.contains('streak-number')) {
            element.textContent = currentNumber;
        } else {
            element.textContent = originalText.replace(/\d+/, currentNumber);
        }
    }, 50);
}

// Set up notification system
function setupNotifications() {
    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    
    alerts.forEach(alert => {
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.opacity = '0';
                alert.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    alert.remove();
                }, 300);
            }
        }, 5000);
    });
}

// Utility function to create floating elements
function createFloatingElement(emoji, duration = 3000) {
    const element = document.createElement('div');
    element.textContent = emoji;
    element.style.position = 'fixed';
    element.style.fontSize = '2rem';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '9999';
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = window.innerHeight + 'px';
    element.style.animation = `heart-float ${duration}ms ease-out forwards`;
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        element.remove();
    }, duration);
    
    return element;
}

// Create multiple floating hearts
function createFloatingHearts(count = 20) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createFloatingElement('💖', 4000);
        }, i * 100);
    }
}

// Show temporary message
function showTemporaryMessage(message, duration = 3000) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.background = 'rgba(255, 182, 193, 0.9)';
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '1rem 2rem';
    messageDiv.style.borderRadius = '25px';
    messageDiv.style.fontSize = '1.2rem';
    messageDiv.style.fontWeight = 'bold';
    messageDiv.style.zIndex = '10000';
    messageDiv.style.animation = 'fade-in 0.5s ease-out';
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            messageDiv.remove();
        }, 500);
    }, duration);
}

// Handle errors gracefully
function handleError(error, userMessage = 'Something went wrong. Please try again.') {
    console.error('Mist App Error:', error);
    showTemporaryMessage(userMessage, 4000);
}

// Initialize audio context on user interaction
function initializeAudio() {
    document.addEventListener('click', function initAudio() {
        if (!isAudioInitialized) {
            try {
                mainAudioContext = new (window.AudioContext || window.webkitAudioContext)();
                isAudioInitialized = true;
                document.removeEventListener('click', initAudio);
            } catch (error) {
                console.warn('Audio not supported:', error);
            }
        }
    }, { once: true });
}

// Export functions for use in other files
window.MistApp = {
    initializeGarden,
    createFloatingHearts,
    showTemporaryMessage,
    handleError,
    animateNumber
};
