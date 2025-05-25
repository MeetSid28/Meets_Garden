// Create floating hearts animation
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const hearts = ['💖', '💝', '💗', '💓', '💕'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(heart);
    }
}

// Create floating petals animation
function createFloatingPetals() {
    const container = document.querySelector('.floating-petals');
    const petals = ['🌸', '🌺', '🌹', '🌷', '🌼'];
    
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.className = 'floating-petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 4 + 3) + 's';
        petal.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(petal);
    }
}

// Create welcome animation with flowers
function createWelcomeAnimation() {
    const container = document.querySelector('.flower-garden');
    const flowers = ['🌸', '🌺', '🌹', '🌷', '🌼', '💐'];
    
    // Create a grid of flowers
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const flower = document.createElement('div');
            flower.className = 'garden-flower';
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = (j * 20 + 10) + '%';
            flower.style.top = (i * 20 + 10) + '%';
            flower.style.animationDelay = (i * 0.2 + j * 0.1) + 's';
            container.appendChild(flower);
        }
    }
}

// Play welcome sound
function playWelcomeSound() {
    const audio = new Audio('/static/sounds/welcome.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {
        // Ignore autoplay restrictions
        console.log('Audio autoplay prevented');
    });
}

// Add styles for floating elements
const style = document.createElement('style');
style.textContent = `
    .floating-heart, .floating-petal {
        position: absolute;
        font-size: 1.5rem;
        pointer-events: none;
        animation: float linear infinite;
        opacity: 0;
    }

    .floating-heart {
        animation-name: floatHeart;
    }

    .floating-petal {
        animation-name: floatPetal;
    }

    .garden-flower {
        position: absolute;
        font-size: 2rem;
        transform: scale(0);
        animation: bloomFlower 1s ease forwards;
    }

    @keyframes floatHeart {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes floatPetal {
        0% {
            transform: translateY(100vh) rotate(0deg) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        50% {
            transform: translateY(50vh) rotate(180deg) translateX(50px);
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg) translateX(100px);
            opacity: 0;
        }
    }

    @keyframes bloomFlower {
        0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 