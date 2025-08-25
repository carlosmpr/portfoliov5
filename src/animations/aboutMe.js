// src/animations/aboutMe.js
export function initAboutMeAnimations(gsap) {
    const useGSAP = !!gsap;

    if (!useGSAP) {
        // Fallback to CSS animations
        document.body.classList.add('css-animations');
        console.log('GSAP not available, using CSS fallback animations for AboutMe');
        
        // Trigger CSS animations with IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.about-header, .about-text-content, .about-button, #videoStack').forEach((el) => {
            observer.observe(el);
        });
        return;
    }

    console.log('GSAP loaded, creating fluid animations for AboutMe');

    // Create fluid entrance animations for About Me section
    function createAboutMeAnimation() {
        const header = document.querySelector('.about-header');
        const textContent = document.querySelector('.about-text-content');
        const videoStack = document.querySelector('#videoStack');
        const buttons = document.querySelectorAll('.about-button');

        if (!header && !textContent && !videoStack) return;

        // Create master timeline
        const masterTL = gsap.timeline({ paused: true });

        // 1. Header section slides in from top with elegant fade
        if (header) {
            gsap.set(header, { 
                opacity: 0, 
                visibility: 'visible',
                y: -30,
                scale: 0.98
            });

            masterTL.to(header, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            }, 0.1);
        }

        // 2. Text content flows in with staggered paragraphs
        if (textContent) {
            const paragraphs = textContent.querySelectorAll('p');
            
            gsap.set(textContent, { 
                opacity: 0, 
                visibility: 'visible'
            });
            
            gsap.set(paragraphs, { 
                opacity: 0, 
                x: -40,
                y: 20
            });

            masterTL.to(textContent, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            }, 0.3);

            masterTL.to(paragraphs, {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out"
            }, 0.5);
        }

        // 3. Buttons animate in with bounce effect
        if (buttons.length) {
            gsap.set(buttons, { 
                opacity: 0, 
                visibility: 'visible',
                y: 30,
                scale: 0.9
            });

            masterTL.to(buttons, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.3)"
            }, 1.2);
        }

        // 4. Video stack entrance with elegant scale animation
        if (videoStack) {
            gsap.set(videoStack, { 
                opacity: 0, 
                visibility: 'visible',
                scale: 0.8,
                x: 50,
                rotationY: -10
            });

            masterTL.to(videoStack, {
                opacity: 1,
                scale: 1,
                x: 0,
                rotationY: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    // Add subtle floating animation
                    gsap.to(videoStack, {
                        y: -5,
                        duration: 2,
                        yoyo: true,
                        repeat: -1,
                        ease: "power1.inOut"
                    });
                }
            }, 0.6);
        }

        return masterTL;
    }

    // Setup Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const aboutTimeline = createAboutMeAnimation();
                if (aboutTimeline) {
                    aboutTimeline.play();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    // Observe the About Me section to trigger the animation
    const aboutSection = document.querySelector('section[aria-labelledby="about-heading"]');
    if (aboutSection) {
        observer.observe(aboutSection);
    }

    // Add enhanced hover effects for buttons
    const aboutButtons = document.querySelectorAll('.about-button');
    aboutButtons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                y: -3,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Enhanced video stack interactions
    const videoItems = document.querySelectorAll('.video-item');
    const videoNavButtons = document.querySelectorAll('.video-nav');
    
    videoNavButtons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.15,
                duration: 0.2,
                ease: "back.out(1.4)"
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });

    // Add video transition animations
    function animateVideoTransition(fromIndex, toIndex) {
        const fromVideo = videoItems[fromIndex];
        const toVideo = videoItems[toIndex];
        
        if (!fromVideo || !toVideo) return;

        const tl = gsap.timeline();
        
        // Fade out current video with scale
        tl.to(fromVideo, {
            opacity: 0,
            scale: 0.9,
            rotationY: -15,
            duration: 0.3,
            ease: "power2.in"
        });
        
        // Fade in new video with scale
        tl.to(toVideo, {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.4,
            ease: "power2.out"
        }, 0.2);
    }

    // Expose the animation function globally for video stack controls
    window.animateAboutVideoTransition = animateVideoTransition;
}