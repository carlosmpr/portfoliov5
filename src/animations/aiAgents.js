// src/animations/aiAgents.js
export function initAIAgentsAnimations(gsap) {
    const useGSAP = !!gsap;

    if (!useGSAP) {
        // Fallback to CSS animations
        document.body.classList.add('css-animations');
        
        // Trigger CSS animations with IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.ai-pill, .ai-header, .ai-card').forEach((el) => {
            observer.observe(el);
        });
        return;
    }


    // Create AI-themed entrance animations
    function createAIAnimation() {
        const pill = document.querySelector('.ai-pill');
        const header = document.querySelector('.ai-header');
        const cards = document.querySelectorAll('.ai-card');

        if (!header && !cards.length) return;

        // Create master timeline
        const masterTL = gsap.timeline({ paused: true });

        // 1. Pill badge slides in with tech glow
        if (pill) {
            gsap.set(pill, { 
                opacity: 0, 
                visibility: 'visible',
                y: -20,
                scale: 0.8
            });

            masterTL.to(pill, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.3)"
            }, 0.1);
        }

        // 2. Header content materializes with AI-like effect
        if (header) {
            const headerTitle = header.querySelector('h2');
            const headerText = header.querySelector('p');
            
            gsap.set(header, { 
                opacity: 0, 
                visibility: 'visible'
            });
            
            if (headerTitle) {
                gsap.set(headerTitle, { 
                    opacity: 0, 
                    y: 30,
                    scale: 0.95,
                    filter: 'blur(10px)'
                });
            }
            
            if (headerText) {
                gsap.set(headerText, { 
                    opacity: 0, 
                    y: 20,
                    scale: 0.98
                });
            }

            masterTL.to(header, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            }, 0.3);

            if (headerTitle) {
                masterTL.to(headerTitle, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    ease: "power2.out"
                }, 0.4);
            }

            if (headerText) {
                masterTL.to(headerText, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                }, 0.6);
            }
        }

        // 3. AI Cards animate in with circuit-like patterns
        if (cards.length) {
            cards.forEach((card, index) => {
                // Set different entry directions for variety
                const directions = [
                    { x: -100, y: 50, rotation: -5 },   // From left
                    { x: 100, y: -50, rotation: 5 },   // From right
                    { x: -80, y: 80, rotation: -3 },   // From bottom-left
                    { x: 80, y: -80, rotation: 3 },    // From top-right
                    { x: -120, y: 0, rotation: -4 },   // From left
                    { x: 120, y: 0, rotation: 4 }      // From right
                ];
                
                const direction = directions[index % directions.length];
                
                gsap.set(card, { 
                    opacity: 0, 
                    visibility: 'visible',
                    x: direction.x,
                    y: direction.y,
                    scale: 0.7,
                    rotation: direction.rotation,
                    filter: 'blur(8px)'
                });

                // Animate card entrance with AI-like materialization
                masterTL.to(card, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    ease: "power2.out",
                    onComplete: () => {
                        // Add subtle data-flow animation
                        gsap.to(card, {
                            y: gsap.utils.random(-2, 2),
                            duration: gsap.utils.random(3, 5),
                            yoyo: true,
                            repeat: -1,
                            ease: "power1.inOut"
                        });
                        
                        // Animate card visuals
                        const cardVisual = card.querySelector('.card-visual');
                        const cardIcon = card.querySelector('.card-icon');
                        const cardGrid = card.querySelector('.card-grid');
                        const cardBars = card.querySelector('.card-bars');
                        
                        // Add special animations for different card types
                        if (cardIcon) {
                            gsap.to(cardIcon, {
                                rotation: 360,
                                duration: 20,
                                repeat: -1,
                                ease: "none"
                            });
                        }
                        
                        if (cardGrid) {
                            const gridItems = cardGrid.querySelectorAll('> div');
                            gridItems.forEach((item, i) => {
                                gsap.to(item, {
                                    scale: 1.05,
                                    duration: 1.5,
                                    delay: i * 0.2,
                                    yoyo: true,
                                    repeat: -1,
                                    ease: "power2.inOut"
                                });
                            });
                        }
                        
                        if (cardBars) {
                            const bars = cardBars.querySelectorAll('> div');
                            bars.forEach((bar, i) => {
                                gsap.to(bar, {
                                    scaleX: gsap.utils.random(0.8, 1.2),
                                    duration: gsap.utils.random(2, 4),
                                    delay: i * 0.3,
                                    yoyo: true,
                                    repeat: -1,
                                    ease: "power1.inOut"
                                });
                            });
                        }
                    }
                }, 0.7 + (index * 0.15));

                // Animate card content
                const cardTitle = card.querySelector('.text-gray-900');
                const cardTags = card.querySelectorAll('.tag');
                
                if (cardTitle) {
                    gsap.set(cardTitle, { 
                        opacity: 0, 
                        y: 15
                    });
                    
                    masterTL.to(cardTitle, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    }, 0.9 + (index * 0.15));
                }
                
                if (cardTags.length) {
                    gsap.set(cardTags, { 
                        opacity: 0, 
                        scale: 0.8,
                        y: 10
                    });
                    
                    masterTL.to(cardTags, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.4,
                        stagger: 0.05,
                        ease: "back.out(1.2)"
                    }, 1.0 + (index * 0.15));
                }
            });
        }

        return masterTL;
    }

    // Setup Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const aiTimeline = createAIAnimation();
                if (aiTimeline) {
                    aiTimeline.play();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe the AI section to trigger the animation
    const aiSection = document.querySelector('#ai-section');
    if (aiSection) {
        observer.observe(aiSection);
    }

    // Add enhanced hover effects for AI cards
    const aiCards = document.querySelectorAll('.ai-card');
    aiCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -12,
                scale: 1.03,
                rotationY: 5,
                duration: 0.4,
                ease: "power2.out"
            });
            
            // Enhanced visual effects
            const cardVisual = card.querySelector('.card-visual');
            const cardIcon = card.querySelector('.card-icon');
            
            if (cardVisual) {
                gsap.to(cardVisual, {
                    scale: 1.08,
                    rotation: 2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            if (cardIcon) {
                gsap.to(cardIcon, {
                    scale: 1.2,
                    rotation: "+=10",
                    duration: 0.3,
                    ease: "back.out(1.4)"
                });
            }
            
            // Glow effect
            gsap.to(card, {
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 25px rgba(59, 130, 246, 0.2)",
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                rotationY: 0,
                duration: 0.4,
                ease: "power2.out"
            });
            
            const cardVisual = card.querySelector('.card-visual');
            const cardIcon = card.querySelector('.card-icon');
            
            if (cardVisual) {
                gsap.to(cardVisual, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            if (cardIcon) {
                gsap.to(cardIcon, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            // Reset glow
            gsap.to(card, {
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}