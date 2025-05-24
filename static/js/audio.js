// Audio system for Mist garden app

// Audio configuration
const AudioConfig = {
    enabled: true,
    volume: 0.3,
    sounds: {
        taskComplete: {
            frequency: 800,
            duration: 200,
            type: 'sine'
        },
        welcome: {
            frequency: 600,
            duration: 300,
            type: 'triangle'
        },
        love: {
            frequency: 1000,
            duration: 150,
            type: 'sine'
        },
        achievement: {
            frequency: 1200,
            duration: 400,
            type: 'square'
        },
        hug: {
            frequency: 700,
            duration: 500,
            type: 'sine'
        },
        flower: {
            frequency: 900,
            duration: 250,
            type: 'triangle'
        },
        success: {
            frequency: 1100,
            duration: 300,
            type: 'sine'
        }
    }
};

// Audio context and state
let audioContext = null;
let isAudioEnabled = true;
let masterVolume = 0.3;

// Initialize audio system
function initializeAudioSystem() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Resume audio context on user interaction (required by browsers)
        document.addEventListener('click', resumeAudioContext, { once: true });
        document.addEventListener('keydown', resumeAudioContext, { once: true });
        
        return true;
    } catch (error) {
        console.warn('Audio not supported:', error);
        isAudioEnabled = false;
        return false;
    }
}

// Resume audio context (required by modern browsers)
function resumeAudioContext() {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            console.log('Audio context resumed');
        });
    }
}

// Create oscillator-based sound
function createOscillatorSound(frequency, duration, type = 'sine', volume = masterVolume) {
    if (!isAudioEnabled || !audioContext) {
        return Promise.resolve();
    }
    
    return new Promise((resolve) => {
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = type;
            
            // Create envelope for natural sound
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
            
            oscillator.onended = resolve;
        } catch (error) {
            console.warn('Error playing sound:', error);
            resolve();
        }
    });
}

// Create melody (sequence of notes)
function createMelody(notes, noteDuration = 200) {
    if (!isAudioEnabled || !audioContext) {
        return Promise.resolve();
    }
    
    let currentTime = audioContext.currentTime;
    const promises = [];
    
    notes.forEach((note, index) => {
        const delay = index * noteDuration / 1000;
        setTimeout(() => {
            promises.push(createOscillatorSound(note.frequency, note.duration || noteDuration, note.type || 'sine'));
        }, delay);
    });
    
    return Promise.all(promises);
}

// Specific sound functions

// Task completion sound (gentle ding)
function playTaskCompleteSound() {
    const config = AudioConfig.sounds.taskComplete;
    return createOscillatorSound(config.frequency, config.duration, config.type);
}

// Welcome sound (cheerful melody)
function playWelcomeSound() {
    const welcomeMelody = [
        { frequency: 523, duration: 200 }, // C5
        { frequency: 659, duration: 200 }, // E5
        { frequency: 784, duration: 200 }, // G5
        { frequency: 1047, duration: 400 } // C6
    ];
    
    return createMelody(welcomeMelody, 250);
}

// Love easter egg sound (heart melody)
function playLoveSound() {
    const loveMelody = [
        { frequency: 659, duration: 150 }, // E5
        { frequency: 698, duration: 150 }, // F5
        { frequency: 784, duration: 300 }  // G5
    ];
    
    return createMelody(loveMelody, 200);
}

// Achievement unlock sound (fanfare)
function playAchievementSound() {
    const achievementMelody = [
        { frequency: 523, duration: 100 }, // C5
        { frequency: 659, duration: 100 }, // E5
        { frequency: 784, duration: 100 }, // G5
        { frequency: 1047, duration: 200 }, // C6
        { frequency: 1319, duration: 400 }  // E6
    ];
    
    return createMelody(achievementMelody, 150);
}

// Hug sound (warm, comforting)
function playHugSound() {
    const hugMelody = [
        { frequency: 440, duration: 300, type: 'sine' },   // A4
        { frequency: 554, duration: 300, type: 'sine' },   // C#5
        { frequency: 659, duration: 500, type: 'sine' }    // E5
    ];
    
    return createMelody(hugMelody, 350);
}

// Flower sound (nature-like)
function playFlowerSound() {
    const flowerMelody = [
        { frequency: 880, duration: 150, type: 'triangle' },  // A5
        { frequency: 988, duration: 150, type: 'triangle' },  // B5
        { frequency: 1109, duration: 200, type: 'triangle' }  // C#6
    ];
    
    return createMelody(flowerMelody, 180);
}

// Success sound (celebration)
function playSuccessSound() {
    const successMelody = [
        { frequency: 784, duration: 150 }, // G5
        { frequency: 880, duration: 150 }, // A5
        { frequency: 988, duration: 150 }, // B5
        { frequency: 1175, duration: 300 } // D6
    ];
    
    return createMelody(successMelody, 200);
}

// Error sound (gentle, not jarring)
function playErrorSound() {
    const errorMelody = [
        { frequency: 350, duration: 200, type: 'triangle' },
        { frequency: 330, duration: 300, type: 'triangle' }
    ];
    
    return createMelody(errorMelody, 250);
}

// Volume control functions
function setMasterVolume(volume) {
    masterVolume = Math.max(0, Math.min(1, volume));
    AudioConfig.volume = masterVolume;
}

function getMasterVolume() {
    return masterVolume;
}

function toggleAudio() {
    isAudioEnabled = !isAudioEnabled;
    return isAudioEnabled;
}

function isAudioSupported() {
    return !!(window.AudioContext || window.webkitAudioContext);
}

// Advanced sound effects

// Create notification sound with specific pattern
function playNotificationSound(pattern = 'default') {
    const patterns = {
        default: [
            { frequency: 800, duration: 100 },
            { frequency: 1000, duration: 150 }
        ],
        urgent: [
            { frequency: 1000, duration: 100 },
            { frequency: 800, duration: 100 },
            { frequency: 1000, duration: 100 }
        ],
        gentle: [
            { frequency: 600, duration: 200 },
            { frequency: 800, duration: 200 }
        ]
    };
    
    const melody = patterns[pattern] || patterns.default;
    return createMelody(melody, 120);
}

// Create ambient sound for focus
function playAmbientSound(duration = 5000) {
    if (!isAudioEnabled || !audioContext) {
        return Promise.resolve();
    }
    
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.type = 'triangle';
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.5);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
        
        return new Promise(resolve => {
            oscillator.onended = resolve;
        });
    } catch (error) {
        console.warn('Error playing ambient sound:', error);
        return Promise.resolve();
    }
}

// Background chime system
let backgroundChimeInterval;

// Start gentle background chimes
function startBackgroundChimes() {
    if (backgroundChimeInterval) return;
    
    backgroundChimeInterval = setInterval(() => {
        if (isAudioEnabled && audioContext) {
            playGentleChime();
        }
    }, 45000); // Every 45 seconds
}

// Stop background chimes
function stopBackgroundChimes() {
    if (backgroundChimeInterval) {
        clearInterval(backgroundChimeInterval);
        backgroundChimeInterval = null;
    }
}

// Play gentle chime sound
function playGentleChime() {
    const chimeNotes = [
        { frequency: 523, duration: 300 }, // C5
        { frequency: 659, duration: 300 }, // E5
        { frequency: 784, duration: 400 }  // G5
    ];
    
    return createMelody(chimeNotes, 150);
}

// Initialize audio when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with user interaction
    const initAudio = () => {
        initializeAudioSystem();
        startBackgroundChimes(); // Start chimes after audio is initialized
        document.removeEventListener('click', initAudio);
        document.removeEventListener('keydown', initAudio);
    };
    
    document.addEventListener('click', initAudio);
    document.addEventListener('keydown', initAudio);
});

// Export audio functions for global use
window.MistAudio = {
    playTaskCompleteSound,
    playWelcomeSound,
    playLoveSound,
    playAchievementSound,
    playHugSound,
    playFlowerSound,
    playSuccessSound,
    playErrorSound,
    playNotificationSound,
    playAmbientSound,
    setMasterVolume,
    getMasterVolume,
    toggleAudio,
    isAudioSupported
};

// Make individual functions available globally for easy access
window.playTaskCompleteSound = playTaskCompleteSound;
window.playWelcomeSound = playWelcomeSound;
window.playLoveSound = playLoveSound;
window.playAchievementSound = playAchievementSound;
window.playHugSound = playHugSound;
window.playFlowerSound = playFlowerSound;
window.playSuccessSound = playSuccessSound;
window.playErrorSound = playErrorSound;
