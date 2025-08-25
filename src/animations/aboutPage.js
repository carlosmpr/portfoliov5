// src/animations/aboutPage.js
export function initAboutPageAnimations(gsap) {
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

        document.querySelectorAll('.about-hero, .about-sidebar, .about-content, .about-skill-card, .about-cert, .about-timeline-item, .about-cta').forEach((el) => {
            observer.observe(el);
        });
        return;
    }

    // Create about page entrance animations
    function createAboutPageAnimation() {
        const hero = document.querySelector('.about-hero');
        const sidebar = document.querySelector('.about-sidebar');
        const contentSections = document.querySelectorAll('.about-content');
        const skillCards = document.querySelectorAll('.about-skill-card');
        const certifications = document.querySelectorAll('.about-cert');
        const timelineItems = document.querySelectorAll('.about-timeline-item');
        const cta = document.querySelector('.about-cta');

        if (!hero && !sidebar && !contentSections.length) return;

        // Create master timeline
        const masterTL = gsap.timeline({ paused: true });

        // 1. Hero section with personal story badge effect
        if (hero) {
            const heroBadge = hero.querySelector('.hero-badge');
            const heroTitle = hero.querySelector('h1');
            const heroDesc = hero.querySelector('p');

            gsap.set(hero, { 
                opacity: 0, 
                visibility: 'visible'
            });

            if (heroBadge) {
                gsap.set(heroBadge, { 
                    opacity: 0, 
                    scale: 0.8,
                    y: -20
                });
            }

            if (heroTitle) {
                gsap.set(heroTitle, { 
                    opacity: 0, 
                    y: 50,
                    scale: 0.95,
                    filter: 'blur(5px)'
                });
            }

            if (heroDesc) {
                gsap.set(heroDesc, { 
                    opacity: 0, 
                    y: 30,
                    scale: 0.98
                });
            }

            // Animate hero container
            masterTL.to(hero, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            }, 0.1);

            // Animate badge with subtle glow
            if (heroBadge) {
                masterTL.to(heroBadge, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "back.out(1.3)",
                    onComplete: () => {
                        // Add subtle pulsing glow
                        gsap.to(heroBadge, {
                            boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
                            duration: 3,
                            yoyo: true,
                            repeat: -1,
                            ease: "power2.inOut"
                        });
                    }
                }, 0.3);
            }

            // Animate title with blur effect
            if (heroTitle) {
                masterTL.to(heroTitle, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 0.9,
                    ease: "power2.out"
                }, 0.5);
            }

            // Animate description
            if (heroDesc) {
                masterTL.to(heroDesc, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: "power2.out"
                }, 0.7);
            }
        }

        // 2. Sidebar with photo and info cards sliding from left
        if (sidebar) {
            const profileImage = sidebar.querySelector('.profile-image');
            const quickFacts = sidebar.querySelector('.quick-facts');
            const contactCard = sidebar.querySelector('.contact-card');
            const resumeButton = sidebar.querySelector('.resume-button');

            gsap.set(sidebar, { 
                opacity: 0, 
                visibility: 'visible',
                x: -80,
                scale: 0.95
            });

            if (profileImage) {
                gsap.set(profileImage, { 
                    scale: 0.8,
                    rotation: -5
                });
            }

            // Animate sidebar container
            masterTL.to(sidebar, {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            }, 0.9);

            // Animate profile image with rotation effect
            if (profileImage) {
                masterTL.to(profileImage, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.7,
                    ease: "back.out(1.2)"
                }, 1.1);
            }

            // Animate info cards with stagger
            [quickFacts, contactCard, resumeButton].forEach((card, index) => {
                if (card) {
                    gsap.set(card, { 
                        opacity: 0, 
                        y: 30,
                        scale: 0.9
                    });

                    masterTL.to(card, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.5,
                        ease: "back.out(1.2)"
                    }, 1.2 + (index * 0.15));
                }
            });
        }

        // 3. Content sections with typewriter-like effects
        if (contentSections.length) {
            contentSections.forEach((section, index) => {
                const sectionTitle = section.querySelector('h2');
                const sectionContent = section.querySelector('.section-content, .prose, .grid');

                gsap.set(section, { 
                    opacity: 0, 
                    visibility: 'visible'
                });

                if (sectionTitle) {
                    gsap.set(sectionTitle, { 
                        opacity: 0, 
                        x: -40,
                        scale: 0.95
                    });
                }

                if (sectionContent) {
                    gsap.set(sectionContent, { 
                        opacity: 0, 
                        y: 40
                    });
                }

                // Animate section container
                masterTL.to(section, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                }, 1.4 + (index * 0.2));

                // Animate section title
                if (sectionTitle) {
                    masterTL.to(sectionTitle, {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 0.6,
                        ease: "power2.out"
                    }, 1.5 + (index * 0.2));
                }

                // Animate section content
                if (sectionContent) {
                    masterTL.to(sectionContent, {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power2.out"
                    }, 1.6 + (index * 0.2));
                }
            });
        }

        // 4. Skill cards with tech-themed animations
        if (skillCards.length) {
            skillCards.forEach((card, index) => {
                const cardIcon = card.querySelector('.skill-icon');
                const cardTitle = card.querySelector('h3');
                const cardDesc = card.querySelector('p');

                const directions = [
                    { x: -50, y: 40, rotation: -3 },
                    { x: 50, y: 40, rotation: 3 },
                    { x: -40, y: 50, rotation: -2 },
                    { x: 40, y: 50, rotation: 2 }
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
                    duration: 0.8,
                    ease: "power2.out",
                    onComplete: () => {
                        // Add continuous floating animation
                        gsap.to(card, {
                            y: gsap.utils.random(-4, 4),
                            duration: gsap.utils.random(4, 7),
                            yoyo: true,
                            repeat: -1,
                            ease: "power1.inOut"
                        });
                    }
                }, 1.8 + (index * 0.15));

                if (cardIcon) {
                    masterTL.to(cardIcon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.6,
                        ease: "back.out(1.4)"
                    }, 1.9 + (index * 0.15));
                }
            });
        }

        // 5. Certifications with achievement badge effects
        if (certifications.length) {
            certifications.forEach((cert, index) => {
                const certBorder = cert.querySelector('.cert-border');
                const certTitle = cert.querySelector('h3');
                const certDate = cert.querySelector('.cert-date');

                gsap.set(cert, { 
                    opacity: 0, 
                    visibility: 'visible',
                    x: -40,
                    scale: 0.95
                });

                if (certBorder) {
                    gsap.set(certBorder, { 
                        scaleY: 0,
                        transformOrigin: "top"
                    });
                }

                masterTL.to(cert, {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    onComplete: () => {
                        // Add subtle glow effect based on certification color
                        const colors = {
                            blue: "rgba(59, 130, 246, 0.2)",
                            green: "rgba(34, 197, 94, 0.2)",
                            purple: "rgba(147, 51, 234, 0.2)",
                            orange: "rgba(249, 115, 22, 0.2)"
                        };
                        const colorClass = Object.keys(colors).find(color => 
                            cert.classList.contains(`border-${color}-400`)
                        );
                        const glowColor = colors[colorClass] || colors.blue;
                        
                        gsap.to(cert, {
                            boxShadow: `0 0 25px ${glowColor}`,
                            duration: 3,
                            yoyo: true,
                            repeat: 2,
                            ease: "power2.inOut"
                        });
                    }
                }, 2.0 + (index * 0.2));

                if (certBorder) {
                    masterTL.to(certBorder, {
                        scaleY: 1,
                        duration: 0.8,
                        ease: "power2.out"
                    }, 2.1 + (index * 0.2));
                }
            });
        }

        // 6. Timeline items with experience journey effect
        if (timelineItems.length) {
            timelineItems.forEach((item, index) => {
                const timelineDot = item.querySelector('.timeline-dot');
                const timelineCard = item.querySelector('.timeline-card');
                const achievementList = item.querySelectorAll('.achievement-item');

                gsap.set(item, { 
                    opacity: 0, 
                    visibility: 'visible'
                });

                if (timelineDot) {
                    gsap.set(timelineDot, { 
                        scale: 0,
                        rotation: 180
                    });
                }

                if (timelineCard) {
                    gsap.set(timelineCard, { 
                        opacity: 0,
                        x: 40,
                        scale: 0.95
                    });
                }

                if (achievementList.length) {
                    gsap.set(achievementList, { 
                        opacity: 0,
                        x: 20
                    });
                }

                // Animate timeline container
                masterTL.to(item, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                }, 2.2 + (index * 0.3));

                // Animate timeline dot with spinning effect
                if (timelineDot) {
                    masterTL.to(timelineDot, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.6,
                        ease: "back.out(1.4)"
                    }, 2.3 + (index * 0.3));
                }

                // Animate timeline card
                if (timelineCard) {
                    masterTL.to(timelineCard, {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 0.7,
                        ease: "power2.out"
                    }, 2.4 + (index * 0.3));
                }

                // Animate achievement items with stagger
                if (achievementList.length) {
                    masterTL.to(achievementList, {
                        opacity: 1,
                        x: 0,
                        duration: 0.4,
                        stagger: 0.1,
                        ease: "power2.out"
                    }, 2.6 + (index * 0.3));
                }
            });
        }

        // 7. Call to Action with connection theme
        if (cta) {
            const ctaBadge = cta.querySelector('.cta-badge');
            const ctaTitle = cta.querySelector('h2');
            const ctaDesc = cta.querySelector('p');
            const ctaButtons = cta.querySelectorAll('.cta-button');

            gsap.set(cta, { 
                opacity: 0, 
                visibility: 'visible',
                y: 60,
                scale: 0.95
            });

            if (ctaBadge) {
                gsap.set(ctaBadge, { 
                    opacity: 0, 
                    scale: 0.8
                });
            }

            if (ctaTitle) {
                gsap.set(ctaTitle, { 
                    opacity: 0, 
                    y: 30
                });
            }

            if (ctaDesc) {
                gsap.set(ctaDesc, { 
                    opacity: 0, 
                    y: 20
                });
            }

            if (ctaButtons.length) {
                gsap.set(ctaButtons, { 
                    opacity: 0, 
                    y: 20,
                    scale: 0.9
                });
            }

            // Animate CTA container
            masterTL.to(cta, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            }, 2.8);

            // Animate CTA elements sequentially
            if (ctaBadge) {
                masterTL.to(ctaBadge, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "back.out(1.3)"
                }, 2.9);
            }

            if (ctaTitle) {
                masterTL.to(ctaTitle, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out"
                }, 3.0);
            }

            if (ctaDesc) {
                masterTL.to(ctaDesc, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, 3.1);
            }

            if (ctaButtons.length) {
                masterTL.to(ctaButtons, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "back.out(1.2)"
                }, 3.2);
            }
        }

        return masterTL;
    }

    // Setup Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const aboutPageTimeline = createAboutPageAnimation();
                if (aboutPageTimeline) {
                    aboutPageTimeline.play();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe the hero section to trigger the animation
    const heroSection = document.querySelector('.about-hero');
    if (heroSection) {
        observer.observe(heroSection);
    }

    // Enhanced hover effects for skill cards
    const skillCards = document.querySelectorAll('.about-skill-card');
    skillCards.forEach((card) => {
        const cardIcon = card.querySelector('.skill-icon');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -12,
                scale: 1.03,
                duration: 0.3,
                ease: "power2.out"
            });

            if (cardIcon) {
                gsap.to(cardIcon, {
                    scale: 1.15,
                    rotation: "+=15",
                    duration: 0.3,
                    ease: "back.out(1.4)"
                });
            }

            // Add color-specific glow
            const colorClass = Array.from(card.classList).find(cls => 
                cls.includes('bg-') && cls.includes('-500/10')
            );
            const color = colorClass ? colorClass.match(/(blue|green|purple|orange)/)?.[1] : 'blue';
            const glowColors = {
                blue: "rgba(59, 130, 246, 0.4)",
                green: "rgba(34, 197, 94, 0.4)",
                purple: "rgba(147, 51, 234, 0.4)",
                orange: "rgba(249, 115, 22, 0.4)"
            };

            gsap.to(card, {
                boxShadow: `0 25px 50px -12px ${glowColors[color] || glowColors.blue}`,
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

            gsap.to(card, {
                boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Enhanced hover effects for timeline items
    const timelineItems = document.querySelectorAll('.about-timeline-item');
    timelineItems.forEach((item) => {
        const timelineCard = item.querySelector('.timeline-card');
        const timelineDot = item.querySelector('.timeline-dot');
        
        if (timelineCard) {
            timelineCard.addEventListener('mouseenter', () => {
                gsap.to(timelineCard, {
                    scale: 1.02,
                    y: -4,
                    duration: 0.3,
                    ease: "power2.out"
                });

                if (timelineDot) {
                    gsap.to(timelineDot, {
                        scale: 1.1,
                        duration: 0.3,
                        ease: "back.out(1.3)"
                    });
                }
            });

            timelineCard.addEventListener('mouseleave', () => {
                gsap.to(timelineCard, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });

                if (timelineDot) {
                    gsap.to(timelineDot, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        }
    });

    // Enhanced hover effects for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                y: -3,
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

    // Enhanced hover effects for resume button
    const resumeButton = document.querySelector('.resume-button');
    if (resumeButton) {
        resumeButton.addEventListener('mouseenter', () => {
            gsap.to(resumeButton, {
                scale: 1.03,
                y: -2,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        resumeButton.addEventListener('mouseleave', () => {
            gsap.to(resumeButton, {
                scale: 1,
                y: 0,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    }
}