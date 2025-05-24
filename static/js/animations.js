// Animation system for Mist garden app

// Animation configuration
const AnimationConfig = {
    durations: {
        fast: 500,
        normal: 1000,
        slow: 2000,
        welcome: 4000
    },
    delays: {
        stagger: 100,
        welcome: 2000
    }
};

// Task completion animation
function triggerTaskCompletionAnimation(taskCard) {
    // Add completion class
    taskCard.classList.add('completing');
    
    // Create petal explosion from task
    createPetalExplosion(taskCard);
    
    // Add completion effects
    const completionEffect = document.createElement('div');
    completionEffect.className = 'completion-effect';
    completionEffect.innerHTML = '🌟 Task Bloomed! 🌟';
    completionEffect.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ffb6c1;
        font-weight: bold;
        font-size: 1.2rem;
        z-index: 1000;
        pointer-events: none;
        animation: completion-popup 1.5s ease-out forwards;
    `;
    
    taskCard.style.position = 'relative';
    taskCard.appendChild(completionEffect);
    
    // Animate task card
    taskCard.style.transition = 'all 1s ease-out';
    taskCard.style.transform = 'scale(1.05)';
    taskCard.style.background = 'linear-gradient(45deg, #f0fff0, #98fb98)';
    
    setTimeout(() => {
        taskCard.style.transform = 'scale(1)';
        completionEffect.remove();
    }, 1500);
}

// Create petal explosion animation
function createPetalExplosion(sourceElement) {
    const rect = sourceElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const petals = ['🌸', '🌺', '🌻', '🌷', '🌹', '💮'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createExplodingPetal(centerX, centerY, petals[i % petals.length]);
        }, i * 50);
    }
}

// Create single exploding petal
function createExplodingPetal(startX, startY, petalEmoji) {
    const petal = document.createElement('div');
    petal.textContent = petalEmoji;
    petal.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: ${startY}px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 9999;
        transform-origin: center;
    `;
    
    document.body.appendChild(petal);
    
    // Random explosion direction
    const angle = Math.random() * 2 * Math.PI;
    const distance = 100 + Math.random() * 150;
    const endX = startX + Math.cos(angle) * distance;
    const endY = startY + Math.sin(angle) * distance;
    
    // Animate petal
    petal.animate([
        {
            transform: 'translate(0, 0) scale(1) rotate(0deg)',
            opacity: 1
        },
        {
            transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0.5) rotate(720deg)`,
            opacity: 0
        }
    ], {
        duration: 2000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => {
        petal.remove();
    };
}

// Love animation (gentle and sweet)
function triggerLoveAnimation() {
    const hearts = ['💖', '💕', '💗', '💓', '💝', '💘'];
    
    // Create gentle floating hearts
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createGentleFloatingHeart(hearts[i % hearts.length]);
        }, i * 300);
    }
    
    // Show sweet love message
    showSweetLoveMessage();
}

// Create floating heart
function createFloatingHeart(heartEmoji) {
    const heart = document.createElement('div');
    heart.textContent = heartEmoji;
    heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        bottom: -50px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(heart);
    
    heart.animate([
        {
            transform: 'translateY(0) scale(0) rotate(0deg)',
            opacity: 0
        },
        {
            transform: 'translateY(-50px) scale(1) rotate(360deg)',
            opacity: 1,
            offset: 0.2
        },
        {
            transform: `translateY(-${window.innerHeight + 100}px) scale(0.5) rotate(720deg)`,
            opacity: 0
        }
    ], {
        duration: 4000,
        easing: 'ease-out'
    }).onfinish = () => {
        heart.remove();
    };
}

// Enhanced heart burst from center
function createHeartBurst() {
    const hearts = ['💖', '💕', '💗', '💓', '💝', '💘'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[i % hearts.length];
            heart.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 2.5rem;
                pointer-events: none;
                z-index: 9999;
            `;
            
            document.body.appendChild(heart);
            
            const angle = (i / 12) * 2 * Math.PI;
            const distance = 200;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            heart.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: 'translate(-50%, -50%) scale(1.5) rotate(180deg)',
                    opacity: 1,
                    offset: 0.3
                },
                {
                    transform: `translate(${endX - centerX - 25}px, ${endY - centerY - 25}px) scale(0.8) rotate(720deg)`,
                    opacity: 0
                }
            ], {
                duration: 2000,
                easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            }).onfinish = () => heart.remove();
        }, i * 80);
    }
}

// Enhanced floating heart
function createEnhancedFloatingHeart(heartEmoji) {
    const heart = document.createElement('div');
    heart.textContent = heartEmoji;
    heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        bottom: -50px;
        font-size: ${2 + Math.random()}rem;
        pointer-events: none;
        z-index: 9999;
        filter: drop-shadow(2px 2px 4px rgba(255, 182, 193, 0.5));
    `;
    
    document.body.appendChild(heart);
    
    const drift = (Math.random() - 0.5) * 200;
    
    heart.animate([
        {
            transform: 'translateY(0) translateX(0) scale(0) rotate(0deg)',
            opacity: 0
        },
        {
            transform: 'translateY(-100px) translateX(10px) scale(1) rotate(30deg)',
            opacity: 1,
            offset: 0.15
        },
        {
            transform: `translateY(-${window.innerHeight / 2}px) translateX(${drift / 2}px) scale(1.2) rotate(180deg)`,
            opacity: 1,
            offset: 0.5
        },
        {
            transform: `translateY(-${window.innerHeight + 100}px) translateX(${drift}px) scale(0.8) rotate(360deg)`,
            opacity: 0
        }
    ], {
        duration: 4000 + Math.random() * 2000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => heart.remove();
}

// Create spiral hearts
function createSpiralHearts() {
    const hearts = ['💖', '💕', '💗'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[i % hearts.length];
            heart.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 1.8rem;
                pointer-events: none;
                z-index: 9998;
            `;
            
            document.body.appendChild(heart);
            
            const spiralRadius = 150;
            const spiralTurns = 3;
            const angle = (i / 15) * spiralTurns * 2 * Math.PI;
            const radius = spiralRadius * (i / 15);
            
            heart.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0)',
                    opacity: 0
                },
                {
                    transform: `translate(${Math.cos(angle) * radius - 25}px, ${Math.sin(angle) * radius - 25}px) scale(1)`,
                    opacity: 1
                }
            ], {
                duration: 1500,
                easing: 'ease-out',
                fill: 'forwards'
            });
            
            setTimeout(() => {
                heart.animate([
                    { opacity: 1 },
                    { opacity: 0 }
                ], {
                    duration: 500,
                    fill: 'forwards'
                }).onfinish = () => heart.remove();
            }, 2000);
        }, i * 100);
    }
}

// Gentle floating heart
function createGentleFloatingHeart(heartEmoji) {
    const heart = document.createElement('div');
    heart.textContent = heartEmoji;
    heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        bottom: -50px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(heart);
    
    heart.animate([
        {
            transform: 'translateY(0) scale(0)',
            opacity: 0
        },
        {
            transform: 'translateY(-100px) scale(1)',
            opacity: 1,
            offset: 0.2
        },
        {
            transform: `translateY(-${window.innerHeight + 100}px) scale(0.8)`,
            opacity: 0
        }
    ], {
        duration: 4000,
        easing: 'ease-out'
    }).onfinish = () => heart.remove();
}

// Sweet love message
function showSweetLoveMessage() {
    const messages = [
        "Love is in the air! 💕",
        "You found the love easter egg! 💖",
        "The creator sends his love! 💝",
        "You make his heart happy! 💗",
        "Sweet hearts for you! 💘",
        "Love you so much! 💓"
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `
        <div style="
            position: fixed;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ffb6c1, #ffc0cb);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-size: 1.3rem;
            font-weight: bold;
            z-index: 10001;
            box-shadow: 0 8px 20px rgba(255, 182, 193, 0.4);
            border: 2px solid white;
            font-family: 'Dancing Script', cursive;
        ">${message}</div>
    `;
    
    document.body.appendChild(messageElement);
    
    messageElement.animate([
        {
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0.8)'
        },
        {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
            offset: 0.2
        },
        {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
            offset: 0.8
        },
        {
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0.9)'
        }
    ], {
        duration: 3000,
        easing: 'ease-in-out'
    }).onfinish = () => messageElement.remove();
}

// Screen sparkles
function createScreenSparkles() {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                font-size: ${1 + Math.random() * 0.5}rem;
                pointer-events: none;
                z-index: 9997;
            `;
            
            document.body.appendChild(sparkle);
            
            sparkle.animate([
                {
                    opacity: 0,
                    transform: 'scale(0) rotate(0deg)'
                },
                {
                    opacity: 1,
                    transform: 'scale(1.5) rotate(180deg)',
                    offset: 0.5
                },
                {
                    opacity: 0,
                    transform: 'scale(0) rotate(360deg)'
                }
            ], {
                duration: 2000,
                easing: 'ease-in-out'
            }).onfinish = () => sparkle.remove();
        }, i * 150);
    }
}

// Heart explosion (for hug page)
function createHeartExplosion() {
    const hearts = ['💖', '💕', '💗', '💓', '💝', '💘', '❤️', '🧡', '💛', '💚', '💙', '💜'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createExplodingHeart(hearts[i % hearts.length]);
        }, i * 100);
    }
}

// Create exploding heart
function createExplodingHeart(heartEmoji) {
    const heart = document.createElement('div');
    heart.textContent = heartEmoji;
    
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    
    heart.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: ${startY}px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(heart);
    
    // Random explosion parameters
    const angle = Math.random() * 2 * Math.PI;
    const distance = 150 + Math.random() * 200;
    const endX = startX + Math.cos(angle) * distance;
    const endY = startY + Math.sin(angle) * distance;
    
    heart.animate([
        {
            transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
            opacity: 1
        },
        {
            transform: 'translate(-50%, -50%) scale(1.5) rotate(180deg)',
            opacity: 1,
            offset: 0.3
        },
        {
            transform: `translate(${endX - startX - 25}px, ${endY - startY - 25}px) scale(0.5) rotate(720deg)`,
            opacity: 0
        }
    ], {
        duration: 3000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => {
        heart.remove();
    };
}

// Welcome animation
function createWelcomeAnimation() {
    // Create falling hearts
    createFallingHearts();
    
    // Create falling petals
    createFallingPetals();
    
    // Animate welcome message
    animateWelcomeMessage();
}

// Create falling hearts for welcome page
function createFallingHearts() {
    const hearts = ['💖', '💕', '💗', '💓', '💝'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: -50px;
            font-size: ${1.5 + Math.random()}rem;
            pointer-events: none;
            z-index: 1000;
            animation: fall ${3 + Math.random() * 2}s linear forwards;
        `;
        
        document.querySelector('.falling-hearts').appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
    
    // Create hearts continuously
    const heartInterval = setInterval(createHeart, 300);
    
    // Stop after welcome period
    setTimeout(() => {
        clearInterval(heartInterval);
    }, 4000);
}

// Create falling petals
function createFallingPetals() {
    const petals = ['🌸', '🌺', '🌻', '🌷', '🌹'];
    
    function createPetal() {
        const petal = document.createElement('div');
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: -50px;
            font-size: ${1 + Math.random() * 0.5}rem;
            pointer-events: none;
            z-index: 999;
            animation: fall ${4 + Math.random() * 3}s linear forwards;
        `;
        
        const container = document.querySelector('.falling-petals') || document.body;
        container.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, 7000);
    }
    
    // Create petals continuously
    const petalInterval = setInterval(createPetal, 200);
    
    // Stop after welcome period
    setTimeout(() => {
        clearInterval(petalInterval);
    }, 4000);
}

// Animate welcome message
function animateWelcomeMessage() {
    const welcomeTitle = document.querySelector('.welcome-title');
    const welcomeFlowers = document.querySelector('.welcome-flowers .flower');
    
    if (welcomeTitle) {
        welcomeTitle.style.animation = 'fade-in 2s ease-out';
    }
    
    // Animate flowers with stagger
    const flowers = document.querySelectorAll('.welcome-flowers .flower');
    flowers.forEach((flower, index) => {
        flower.style.animationDelay = `${index * 0.2}s`;
        flower.style.animation = 'bounce 2s infinite';
    });
}

// Create floating petals for auth page
function createFloatingPetals() {
    const petals = ['🌸', '🌺', '🌻', '🌷', '🌹'];
    
    function createFloatingPetal() {
        const petal = document.createElement('div');
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            animation: float-petal ${5 + Math.random() * 5}s infinite ease-in-out;
            font-size: ${1 + Math.random() * 0.5}rem;
            opacity: ${0.3 + Math.random() * 0.4};
            pointer-events: none;
        `;
        
        document.querySelector('.floating-petals').appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, 10000);
    }
    
    // Create initial petals
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingPetal, i * 500);
    }
    
    // Continue creating petals
    setInterval(createFloatingPetal, 2000);
}

// Create petal rain effect
function createPetalRain() {
    const petals = ['🌸', '🌺', '🌻', '🌷', '🌹'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.textContent = petals[Math.floor(Math.random() * petals.length)];
            petal.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: -50px;
                font-size: ${1 + Math.random() * 0.8}rem;
                pointer-events: none;
                z-index: 9999;
                animation: fall ${2 + Math.random() * 2}s linear forwards;
            `;
            
            document.body.appendChild(petal);
            
            setTimeout(() => {
                petal.remove();
            }, 4000);
        }, i * 100);
    }
    
    window.MistApp.showTemporaryMessage("Petal rain for you! 🌸", 2500);
}

// Add required CSS keyframes if not already present
function addAnimationStyles() {
    if (!document.getElementById('mist-animations')) {
        const style = document.createElement('style');
        style.id = 'mist-animations';
        style.textContent = `
            @keyframes completion-popup {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0);
                }
                50% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.2);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
            
            @keyframes float-petal {
                0%, 100% {
                    transform: translateY(0) rotate(0deg);
                }
                33% {
                    transform: translateY(-20px) rotate(120deg);
                }
                66% {
                    transform: translateY(-10px) rotate(240deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addAnimationStyles);

// Export animation functions
window.MistAnimations = {
    triggerTaskCompletionAnimation,
    triggerLoveAnimation,
    createWelcomeAnimation,
    createFloatingPetals,
    createHeartExplosion,
    createPetalRain,
    createPetalExplosion
};
