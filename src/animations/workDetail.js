// src/animations/workDetail.js
export function initWorkDetailAnimations(gsap) {
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

        document.querySelectorAll('.work-header, .work-media-showcase, .work-content-section, .work-feature-card, .work-metric, .work-challenge, .work-actions').forEach((el) => {
            observer.observe(el);
        });
        return;
    }

    // Create work detail entrance animations
    function createWorkDetailAnimation() {
        const mediaShowcase = document.querySelector('.work-media-showcase');
        const projectHeader = document.querySelector('.work-header');
        const contentSections = document.querySelectorAll('.work-content-section');
        const featureCards = document.querySelectorAll('.work-feature-card');
        const challenges = document.querySelectorAll('.work-challenge');
        const metrics = document.querySelectorAll('.work-metric');
        const actionButtons = document.querySelector('.work-actions');
        const nextProject = document.querySelector('.work-next-project');

        if (!mediaShowcase && !projectHeader && !contentSections.length) return;

        // Create master timeline
        const masterTL = gsap.timeline({ paused: true });

        // 1. Media showcase slides in from left
        if (mediaShowcase) {
            gsap.set(mediaShowcase, { 
                opacity: 0, 
                visibility: 'visible',
                x: -60,
                scale: 0.95
            });

            masterTL.to(mediaShowcase, {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            }, 0.2);
        }

        // 2. Project header materializes with tech effect
        if (projectHeader) {
            const statusBadges = projectHeader.querySelectorAll('.status-badge');
            const projectTitle = projectHeader.querySelector('h1');
            const projectDesc = projectHeader.querySelector('p');
            const techTags = projectHeader.querySelectorAll('.tech-tag');
            
            gsap.set(projectHeader, { 
                opacity: 0, 
                visibility: 'visible'
            });

            if (statusBadges.length) {
                gsap.set(statusBadges, { 
                    opacity: 0, 
                    scale: 0.8,
                    y: 20
                });
            }

            if (projectTitle) {
                gsap.set(projectTitle, { 
                    opacity: 0, 
                    y: 40,
                    scale: 0.95,
                    filter: 'blur(3px)'
                });
            }

            if (projectDesc) {
                gsap.set(projectDesc, { 
                    opacity: 0, 
                    y: 30
                });
            }

            if (techTags.length) {
                gsap.set(techTags, { 
                    opacity: 0, 
                    scale: 0.7,
                    y: 15
                });
            }

            // Animate header container
            masterTL.to(projectHeader, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            }, 0.1);

            // Animate status badges
            if (statusBadges.length) {
                masterTL.to(statusBadges, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "back.out(1.3)"
                }, 0.3);
            }

            // Animate title
            if (projectTitle) {
                masterTL.to(projectTitle, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    ease: "power2.out"
                }, 0.5);
            }

            // Animate description
            if (projectDesc) {
                masterTL.to(projectDesc, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out"
                }, 0.7);
            }

            // Animate tech tags
            if (techTags.length) {
                masterTL.to(techTags, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: "back.out(1.2)"
                }, 0.9);
            }
        }

        // 3. Content sections animate in with staggered timing
        if (contentSections.length) {
            contentSections.forEach((section, index) => {
                const sectionTitle = section.querySelector('h2');
                
                gsap.set(section, { 
                    opacity: 0, 
                    visibility: 'visible',
                    y: 40,
                    scale: 0.98
                });

                if (sectionTitle) {
                    gsap.set(sectionTitle, { 
                        opacity: 0, 
                        x: -20
                    });
                }

                masterTL.to(section, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                }, 1.0 + (index * 0.15));

                if (sectionTitle) {
                    masterTL.to(sectionTitle, {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    }, 1.1 + (index * 0.15));
                }
            });
        }

        // 4. Feature cards with tech scanning effect
        if (featureCards.length) {
            featureCards.forEach((card, index) => {
                const cardIcon = card.querySelector('.feature-icon');
                const cardTitle = card.querySelector('h3');
                const cardDesc = card.querySelector('p');

                const directions = [
                    { x: -40, y: 30, rotation: -2 },
                    { x: 40, y: 30, rotation: 2 },
                    { x: -30, y: 40, rotation: -1 },
                    { x: 30, y: 40, rotation: 1 }
                ];
                
                const direction = directions[index % directions.length];
                
                gsap.set(card, { 
                    opacity: 0, 
                    visibility: 'visible',
                    x: direction.x,
                    y: direction.y,
                    scale: 0.85,
                    rotation: direction.rotation,
                    filter: 'blur(3px)'
                });

                if (cardIcon) {
                    gsap.set(cardIcon, { 
                        scale: 0,
                        rotation: 180
                    });
                }

                masterTL.to(card, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    filter: 'blur(0px)',
                    duration: 0.7,
                    ease: "power2.out",
                    onComplete: () => {
                        // Add subtle floating animation
                        gsap.to(card, {
                            y: gsap.utils.random(-3, 3),
                            duration: gsap.utils.random(3, 6),
                            yoyo: true,
                            repeat: -1,
                            ease: "power1.inOut"
                        });
                    }
                }, 1.3 + (index * 0.1));

                if (cardIcon) {
                    masterTL.to(cardIcon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.6,
                        ease: "back.out(1.4)"
                    }, 1.4 + (index * 0.1));
                }
            });
        }

        // 5. Challenge items with border animation effect
        if (challenges.length) {
            challenges.forEach((challenge, index) => {
                gsap.set(challenge, { 
                    opacity: 0, 
                    visibility: 'visible',
                    x: -30,
                    scale: 0.95
                });

                masterTL.to(challenge, {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    onComplete: () => {
                        // Animate the border line
                        const borderLine = challenge.querySelector('.border-l-4');
                        if (borderLine) {
                            gsap.fromTo(borderLine, 
                                { scaleY: 0, transformOrigin: "top" },
                                { scaleY: 1, duration: 0.8, ease: "power2.out" }
                            );
                        }
                    }
                }, 1.5 + (index * 0.15));
            });
        }

        // 6. Metrics with counting animation
        if (metrics.length) {
            metrics.forEach((metric, index) => {
                const metricValue = metric.querySelector('.metric-value');
                
                gsap.set(metric, { 
                    opacity: 0, 
                    visibility: 'visible',
                    y: 30,
                    scale: 0.9
                });

                masterTL.to(metric, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.2)",
                    onComplete: () => {
                        // Add pulsing glow effect
                        gsap.to(metric, {
                            boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                            duration: 2,
                            yoyo: true,
                            repeat: 3,
                            ease: "power2.inOut"
                        });
                    }
                }, 1.6 + (index * 0.1));
            });
        }

        // 7. Action buttons with gradient animation
        if (actionButtons) {
            const buttons = actionButtons.querySelectorAll('a');
            
            gsap.set(actionButtons, { 
                opacity: 0, 
                visibility: 'visible',
                y: 20
            });

            gsap.set(buttons, { 
                scale: 0.9
            });

            masterTL.to(actionButtons, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            }, 1.8);

            masterTL.to(buttons, {
                scale: 1,
                duration: 0.4,
                stagger: 0.1,
                ease: "back.out(1.3)"
            }, 1.9);
        }

        // 8. Next project section
        if (nextProject) {
            gsap.set(nextProject, { 
                opacity: 0, 
                visibility: 'visible',
                y: 40
            });

            masterTL.to(nextProject, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }, 2.0);
        }

        return masterTL;
    }

    // Setup Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const workDetailTimeline = createWorkDetailAnimation();
                if (workDetailTimeline) {
                    workDetailTimeline.play();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe the main content area
    const mainContent = document.querySelector('main');
    if (mainContent) {
        observer.observe(mainContent);
    }

    // Enhanced hover effects for feature cards
    const featureCards = document.querySelectorAll('.work-feature-card');
    featureCards.forEach((card) => {
        const cardIcon = card.querySelector('.feature-icon');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });

            if (cardIcon) {
                gsap.to(cardIcon, {
                    scale: 1.1,
                    rotation: "+=10",
                    duration: 0.3,
                    ease: "back.out(1.4)"
                });
            }

            // Add glow effect
            gsap.to(card, {
                boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.3)",
                duration: 0.3,
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

            if (cardIcon) {
                gsap.to(cardIcon, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }

            // Reset glow
            gsap.to(card, {
                boxShadow: "0 0 0 rgba(59, 130, 246, 0)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Enhanced hover effects for action buttons
    const actionButtons = document.querySelectorAll('.work-actions a');
    actionButtons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                y: -2,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                y: 0,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });

    // Media gallery hover effects
    const galleryButtons = document.querySelectorAll('.media-gallery button');
    galleryButtons.forEach((button, index) => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                y: -2,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                y: 0,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });
}