// src/animations/loader.js
import { initSlideshowAnimations } from './slideshow.js';
import { initFeaturedWorkAnimations } from './featuredWork.js';

// Load GSAP dynamically
export function loadGSAP() {
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

// Initialize all animations
export function initAllAnimations() {
    loadGSAP().then((gsap) => {
        // Initialize slideshow animations (work page)
        initSlideshowAnimations(gsap);
        
        // Initialize featured work animations (home page)  
        initFeaturedWorkAnimations(gsap);
    });
}