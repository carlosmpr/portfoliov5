// src/animations/index.js - Main animation controller
import { initSlideshowAnimations } from './slideshow.js';
import { initFeaturedWorkAnimations } from './featuredWork.js';
import { initAboutMeAnimations } from './aboutMe.js';
import { initTechnologiesAnimations } from './technologies.js';
import { initAIAgentsAnimations } from './aiAgents.js';
import { initAITechAnimations } from './aiTech.js';
import { initWorkDetailAnimations } from './workDetail.js';
import { initAboutPageAnimations } from './aboutPage.js';
import { initContactAnimations } from './contact.js';

// GSAP loading utility
function loadGSAP() {
    return new Promise((resolve) => {
        if (window.gsap) {
            resolve(window.gsap);
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = () => resolve(window.gsap);
        script.onerror = () => resolve(null);
        document.head.appendChild(script);
    });
}

// Main animation initializer
export async function initializeAllAnimations() {
    const gsap = await loadGSAP();
    
    // Initialize all animations
    initSlideshowAnimations(gsap);
    initFeaturedWorkAnimations(gsap);
    initAboutMeAnimations(gsap);
    initTechnologiesAnimations(gsap);
    initAIAgentsAnimations(gsap);
    initAITechAnimations(gsap);
    initWorkDetailAnimations(gsap);
    initAboutPageAnimations(gsap);
    initContactAnimations(gsap);
}

// Basic scroll animations for fallback
export function initBasicScrollAnimations() {
    const elements = document.querySelectorAll('.animate-slide-up');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach((element) => {
        observer.observe(element);
    });
}

// Page transition system
export function navigateToProject(url) {
    // Use Astro's navigate API if available, otherwise fallback to standard navigation
    if (typeof window !== 'undefined') {
        // Try to use Astro's navigate API
        if (window.astro && window.astro.navigate) {
            window.astro.navigate(url);
        } else {
            // Fallback to standard navigation
            window.location.href = url;
        }
    }
}

// Video stack functionality for About Me
export function initVideoStack() {
    const videoStack = document.getElementById('videoStack');
    if (!videoStack) return;

    let currentVideo = 0;
    const videos = document.querySelectorAll('.video-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const totalVideos = videos.length;

    if (totalVideos === 0) return;

    function updateVideoDisplay() {
        videos.forEach((video, index) => {
            video.classList.remove('active', 'prev');
            if (indicators[index]) indicators[index].classList.remove('active');
            
            if (index === currentVideo) {
                video.classList.add('active');
                if (indicators[index]) indicators[index].classList.add('active');
            } else if (index === currentVideo - 1 || (currentVideo === 0 && index === totalVideos - 1)) {
                video.classList.add('prev');
            }
        });
    }

    function nextVideo() {
        currentVideo = (currentVideo + 1) % totalVideos;
        updateVideoDisplay();
    }

    function prevVideo() {
        currentVideo = (currentVideo - 1 + totalVideos) % totalVideos;
        updateVideoDisplay();
    }

    function goToVideo(index) {
        currentVideo = index;
        updateVideoDisplay();
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextVideo);
    if (prevBtn) prevBtn.addEventListener('click', prevVideo);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToVideo(index));
    });

    // Initialize display
    updateVideoDisplay();
}