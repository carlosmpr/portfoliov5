// src/animations/technologies.js
export function initTechnologiesAnimations(gsap) {
    const useGSAP = !!gsap;

    if (!useGSAP) {
        // Fallback to CSS animations
        document.body.classList.add('css-animations');
        console.log('GSAP not available, using CSS fallback animations for Technologies');
        
        // Trigger CSS animations with IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.tech-animate').forEach((el) => {
            observer.observe(el);
        });
        return;
    }

    console.log('GSAP loaded, creating dynamic grid animations for Technologies');

    // Create dynamic grid entrance animations for Technologies section
    function createTechnologiesAnimation() {
        const techIcon = document.querySelector('.tech-icon');
        const header = document.querySelector('.tech-header');
        const techCards = document.querySelectorAll('.tech-card');

        if (!techCards.length) return;

        // Create master timeline
        const masterTL = gsap.timeline({ paused: true });

        // 1. Tech icon floats in with glow effect
        if (techIcon) {
            gsap.set(techIcon, { 
                opacity: 0, 
                visibility: 'visible',
                scale: 0.3,
                y: -20,
                rotation: -45
            });

            masterTL.to(techIcon, {
                opacity: 1,
                scale: 1,
                y: 0,
                rotation: 0,
                duration: 0.7,
                ease: "back.out(1.4)",
                onComplete: () => {
                    // Add pulsing glow effect
                    gsap.to(techIcon, {
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
                        duration: 1.5,
                        yoyo: true,
                        repeat: -1,
                        ease: "power2.inOut"
                    });
                }
            }, 0.2);
        }

        // 2. Header content fades in elegantly
        if (header) {
            const headerElements = header.querySelectorAll('.inline-flex, h2, p');
            
            gsap.set(header, { 
                opacity: 0, 
                visibility: 'visible'
            });
            
            gsap.set(headerElements, { 
                opacity: 0, 
                y: 30,
                scale: 0.95
            });

            masterTL.to(header, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            }, 0.4);

            masterTL.to(headerElements, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            }, 0.5);
        }

        // 3. Technology cards animate in with wave effect
        if (techCards.length) {
            gsap.set(techCards, { 
                opacity: 0, 
                visibility: 'visible',
                y: 60,
                x: (i) => gsap.utils.random(-30, 30), // Random horizontal offset
                scale: 0.8,
                rotation: (i) => gsap.utils.random(-5, 5) // Subtle random rotation
            });

            // Create a wave effect across the grid
            masterTL.to(techCards, {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                stagger: {
                    amount: 0.6,
                    grid: "auto",
                    from: "start"
                },
                ease: "back.out(1.1)",
                onComplete: () => {
                    // Add subtle floating animation to each card
                    techCards.forEach((card, index) => {
                        gsap.to(card, {
                            y: gsap.utils.random(-3, 3),
                            duration: gsap.utils.random(2, 3),
                            yoyo: true,
                            repeat: -1,
                            ease: "power1.inOut",
                            delay: index * 0.2
                        });
                    });
                }
            }, 0.8);

            // Animate individual elements within each card
            techCards.forEach((card, cardIndex) => {
                const cardTitle = card.querySelector('h3');
                const cardText = card.querySelector('p');
                
                if (cardTitle && cardText) {
                    gsap.set([cardTitle, cardText], { 
                        opacity: 0, 
                        y: 15
                    });
                    
                    masterTL.to([cardTitle, cardText], {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power2.out"
                    }, 1.0 + (cardIndex * 0.1));
                }
            });
        }

        return masterTL;
    }

    // Setup Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const techTimeline = createTechnologiesAnimation();
                if (techTimeline) {
                    techTimeline.play();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe the Technologies section to trigger the animation
    const techSection = document.querySelector('section[aria-labelledby="technologies-heading"]');
    if (techSection) {
        observer.observe(techSection);
    }

    // Add enhanced hover effects for tech cards
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Animate title
            const title = card.querySelector('h3');
            if (title) {
                gsap.to(title, {
                    color: "#60a5fa", // blue-400
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Reset title color
            const title = card.querySelector('h3');
            if (title) {
                gsap.to(title, {
                    color: "#ffffff",
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        });
    });

    // Add typing effect for technology names (optional enhancement)
    function addTypingEffect() {
        const techTexts = document.querySelectorAll('.tech-card p');
        
        techTexts.forEach((text, index) => {
            const originalText = text.textContent;
            text.textContent = '';
            
            setTimeout(() => {
                let currentIndex = 0;
                const typingInterval = setInterval(() => {
                    if (currentIndex < originalText.length) {
                        text.textContent += originalText[currentIndex];
                        currentIndex++;
                    } else {
                        clearInterval(typingInterval);
                    }
                }, 15); // Speed of typing
            }, index * 200); // Stagger the typing start
        });
    }

    // Uncomment to enable typing effect
    // setTimeout(addTypingEffect, 2000);
}