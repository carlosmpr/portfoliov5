// src/animations/featuredWork.js
export function initFeaturedWorkAnimations(gsap) {
    const useGSAP = !!gsap;

    if (!useGSAP) {
        // Fallback to CSS animations
        document.body.classList.add('css-animations');
        console.log('GSAP not available, using CSS fallback animations for FeaturedWork');
        
        // Trigger CSS animations with IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.tetris-header, .tetris-card, .tetris-button').forEach((el) => {
            observer.observe(el);
        });
        return;
    }

    console.log('GSAP loaded, creating Tetris-style animations for FeaturedWork');

    // Create Tetris-style entrance animations
    function createTetrisAnimation() {
        const header = document.querySelector('.tetris-header');
        const cards = document.querySelectorAll('.tetris-card');
        const button = document.querySelector('.tetris-button');

        if (!header || !cards.length) return;

        // Create master timeline
        const masterTL = gsap.timeline({ paused: true });

        // 1. Header slides in from top like a Tetris piece dropping
        if (header) {
            gsap.set(header, { 
                opacity: 0, 
                visibility: 'visible',
                y: -100,
                scale: 0.9,
                rotationX: -15
            });

            masterTL.to(header, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                duration: 0.8,
                ease: "back.out(1.2)",
                onStart: () => {
                    // Add a subtle bounce effect
                    gsap.to(header, {
                        y: -10,
                        duration: 0.15,
                        yoyo: true,
                        repeat: 1,
                        ease: "power2.out",
                        delay: 0.6
                    });
                }
            }, 0.2);
        }

        // 2. Cards animate in like Tetris blocks from different sides
        cards.forEach((card, index) => {
            const isLargeCard = index === 0; // First card is the large one
            
            // Set initial positions based on card layout
            let fromX, fromY, fromRotation;
            
            if (isLargeCard) {
                // Large card slides in from left like an L-piece
                fromX = -300;
                fromY = 50;
                fromRotation = -5;
            } else {
                // Smaller cards come from different directions like Tetris pieces
                const directions = [
                    { x: 200, y: -80, rotation: 3 },   // From top-right
                    { x: -150, y: 100, rotation: -2 }, // From bottom-left  
                    { x: 180, y: 120, rotation: 4 },   // From bottom-right
                    { x: -200, y: -50, rotation: -3 }  // From top-left
                ];
                const direction = directions[(index - 1) % directions.length];
                fromX = direction.x;
                fromY = direction.y;
                fromRotation = direction.rotation;
            }

            gsap.set(card, { 
                opacity: 0, 
                visibility: 'visible',
                x: fromX,
                y: fromY,
                scale: 0.8,
                rotation: fromRotation
            });

            // Animate to final position with Tetris-like movement
            masterTL.to(card, {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 0.7,
                ease: "power3.out",
                onComplete: () => {
                    // Add landing effect like Tetris piece placement
                    gsap.to(card, {
                        scale: 1.02,
                        duration: 0.1,
                        yoyo: true,
                        repeat: 1,
                        ease: "power2.out"
                    });
                    
                    // Add slight shake effect
                    gsap.to(card, {
                        x: gsap.utils.random(-2, 2),
                        duration: 0.05,
                        yoyo: true,
                        repeat: 3,
                        ease: "power2.out"
                    });
                }
            }, 0.4 + (index * 0.15));

            // Animate internal elements (tags, text) with stagger
            const cardElements = card.querySelectorAll('h3, p, .project-tag, .project-number');
            if (cardElements.length) {
                gsap.set(cardElements, { 
                    opacity: 0, 
                    y: 20,
                    scale: 0.95
                });

                masterTL.to(cardElements, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "back.out(1.1)"
                }, 0.6 + (index * 0.15));
            }
        });

        // 3. Button drops in from above like final Tetris piece
        if (button) {
            gsap.set(button, { 
                opacity: 0, 
                visibility: 'visible',
                y: -60,
                scale: 0.8,
                rotation: 2
            });

            masterTL.to(button, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: "bounce.out",
                onComplete: () => {
                    // Add glow effect
                    gsap.to(button, {
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                        duration: 0.3,
                        yoyo: true,
                        repeat: 1
                    });
                }
            }, 1.8);
        }

        return masterTL;
    }

    // Setup Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const tetrisTimeline = createTetrisAnimation();
                if (tetrisTimeline) {
                    tetrisTimeline.play();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe the header to trigger the animation
    const header = document.querySelector('.tetris-header');
    if (header) {
        observer.observe(header);
    }

    // Add enhanced hover effects for cards
    const cards = document.querySelectorAll('.tetris-card');
    cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Animate internal elements
            const elements = card.querySelectorAll('.project-tag');
            gsap.to(elements, {
                scale: 1.05,
                duration: 0.2,
                stagger: 0.05,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            const elements = card.querySelectorAll('.project-tag');
            gsap.to(elements, {
                scale: 1,
                duration: 0.2,
                stagger: 0.05,
                ease: "power2.out"
            });
        });
    });
}