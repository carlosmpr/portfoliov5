// src/animations/contact.js
export function initContactAnimations(gsap) {
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

        // Observe different sections with appropriate delays
        document.querySelectorAll('.contact-hero, .contact-sidebar, .contact-form, .contact-method').forEach((el) => {
            observer.observe(el);
        });
        
        // FAQ items with staggered delays
        document.querySelectorAll('.faq-item').forEach((el, index) => {
            el.style.transitionDelay = `${100 + (index * 100)}ms`;
            observer.observe(el);
        });
        
        // Alt contact items with staggered delays
        document.querySelectorAll('.alt-contact-item').forEach((el, index) => {
            el.style.transitionDelay = `${200 + (index * 200)}ms`;
            observer.observe(el);
        });
        return;
    }

    // Create contact page entrance animations
    function createContactAnimation() {
        const hero = document.querySelector('.contact-hero');
        const sidebar = document.querySelector('.contact-sidebar');
        const form = document.querySelector('.contact-form');
        const contactMethods = document.querySelectorAll('.contact-method');

        if (!hero && !sidebar && !form) return;

        // Create master timeline
        const masterTL = gsap.timeline({ paused: true });

        // 1. Hero section with communication theme
        if (hero) {
            const heroBadge = hero.querySelector('.hero-badge');
            const heroTitle = hero.querySelector('h2');
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
                    y: 30
                });
            }

            // Animate hero container
            masterTL.to(hero, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            }, 0.1);

            // Animate badge with communication pulse
            if (heroBadge) {
                masterTL.to(heroBadge, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "back.out(1.3)",
                    onComplete: () => {
                        // Add communication-themed pulsing
                        gsap.to(heroBadge, {
                            boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                            duration: 2.5,
                            yoyo: true,
                            repeat: -1,
                            ease: "power2.inOut"
                        });
                    }
                }, 0.3);
            }

            // Animate title
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
                    duration: 0.7,
                    ease: "power2.out"
                }, 0.7);
            }
        }

        // 2. Sidebar with contact methods sliding from left
        if (sidebar) {
            gsap.set(sidebar, { 
                opacity: 0, 
                visibility: 'visible',
                x: -80,
                scale: 0.95
            });

            masterTL.to(sidebar, {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            }, 0.9);
        }

        // 3. Contact form sliding from right
        if (form) {
            const formInputs = form.querySelectorAll('input, select, textarea');
            const submitButton = form.querySelector('button[type="submit"]');

            gsap.set(form, { 
                opacity: 0, 
                visibility: 'visible',
                x: 80,
                scale: 0.95
            });

            if (formInputs.length) {
                gsap.set(formInputs, { 
                    opacity: 0, 
                    y: 20
                });
            }

            if (submitButton) {
                gsap.set(submitButton, { 
                    opacity: 0, 
                    scale: 0.9
                });
            }

            // Animate form container
            masterTL.to(form, {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            }, 0.9);

            // Animate form inputs with stagger
            if (formInputs.length) {
                masterTL.to(formInputs, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out"
                }, 1.2);
            }

            // Animate submit button
            if (submitButton) {
                masterTL.to(submitButton, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "back.out(1.3)"
                }, 1.8);
            }
        }

        // 4. Contact methods with communication-themed animations
        if (contactMethods.length) {
            contactMethods.forEach((method, index) => {
                const methodIcon = method.querySelector('.method-icon');
                const methodContent = method.querySelector('.method-content');

                gsap.set(method, { 
                    opacity: 0, 
                    visibility: 'visible',
                    x: -40,
                    scale: 0.9
                });

                if (methodIcon) {
                    gsap.set(methodIcon, { 
                        scale: 0,
                        rotation: 180
                    });
                }

                masterTL.to(method, {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    onComplete: () => {
                        // Add subtle floating animation
                        gsap.to(method, {
                            y: gsap.utils.random(-2, 2),
                            duration: gsap.utils.random(4, 8),
                            yoyo: true,
                            repeat: -1,
                            ease: "power1.inOut"
                        });
                    }
                }, 1.1 + (index * 0.15));

                if (methodIcon) {
                    masterTL.to(methodIcon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.6,
                        ease: "back.out(1.4)"
                    }, 1.2 + (index * 0.15));
                }
            });
        }


        return masterTL;
    }

    // Separate FAQ Animation Function
    function createFAQAnimation() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (!faqItems.length) return;

        faqItems.forEach((item, index) => {
            const faqTitle = item.querySelector('h3');
            const faqContent = item.querySelector('p');

            gsap.set(item, { 
                opacity: 0, 
                visibility: 'visible',
                y: 30,
                scale: 0.95
            });

            if (faqTitle) {
                gsap.set(faqTitle, { 
                    opacity: 0, 
                    x: -20
                });
            }

            if (faqContent) {
                gsap.set(faqContent, { 
                    opacity: 0, 
                    y: 15
                });
            }

            // Create timeline for this FAQ item
            const faqTL = gsap.timeline();

            faqTL.to(item, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
                delay: index * 0.1,
                onComplete: () => {
                    // Add subtle glow effect
                    gsap.to(item, {
                        boxShadow: "0 0 25px rgba(255, 255, 255, 0.1)",
                        duration: 3,
                        yoyo: true,
                        repeat: 2,
                        ease: "power2.inOut"
                    });
                }
            });

            if (faqTitle) {
                faqTL.to(faqTitle, {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0.1 + (index * 0.1));
            }

            if (faqContent) {
                faqTL.to(faqContent, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                }, 0.2 + (index * 0.1));
            }
        });
    }

    // Separate Alternative Contact Animation Function
    function createAltContactAnimation() {
        const altContactItems = document.querySelectorAll('.alt-contact-item');
        
        if (!altContactItems.length) return;

        altContactItems.forEach((item, index) => {
            const itemIcon = item.querySelector('.alt-icon');
            const itemTitle = item.querySelector('h3');
            const itemDesc = item.querySelector('p');
            const itemLink = item.querySelector('a');

            const directions = [
                { x: -60, y: 40, rotation: -5 },
                { x: 0, y: 60, rotation: 0 },
                { x: 60, y: 40, rotation: 5 }
            ];
            
            const direction = directions[index % directions.length];
            
            gsap.set(item, { 
                opacity: 0, 
                visibility: 'visible',
                x: direction.x,
                y: direction.y,
                scale: 0.85,
                rotation: direction.rotation
            });

            if (itemIcon) {
                gsap.set(itemIcon, { 
                    scale: 0,
                    rotation: 270
                });
            }

            // Create timeline for this alt contact item
            const altTL = gsap.timeline();

            altTL.to(item, {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 0.7,
                ease: "power2.out",
                delay: index * 0.2,
                onComplete: () => {
                    // Add network-themed floating
                    gsap.to(item, {
                        y: gsap.utils.random(-5, 5),
                        duration: gsap.utils.random(3, 6),
                        yoyo: true,
                        repeat: -1,
                        ease: "power1.inOut"
                    });
                }
            });

            if (itemIcon) {
                altTL.to(itemIcon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    ease: "back.out(1.4)"
                }, 0.1 + (index * 0.2));
            }
        });
    }

    // Setup multiple Intersection Observers for different sections
    
    // Observer for contact hero section (main contact form)
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const contactTimeline = createContactAnimation();
                if (contactTimeline) {
                    contactTimeline.play();
                }
                heroObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observer for FAQ section
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                createFAQAnimation();
                faqObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observer for Alternative Contact section
    const altContactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                createAltContactAnimation();
                altContactObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe the sections
    const heroSection = document.querySelector('.contact-hero');
    const faqSection = document.querySelector('.faq-section');
    const altContactSection = document.querySelector('.alt-contact-section');

    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    if (faqSection) {
        faqObserver.observe(faqSection);
    }
    
    if (altContactSection) {
        altContactObserver.observe(altContactSection);
    }

    // Enhanced hover effects for contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method) => {
        const methodIcon = method.querySelector('.method-icon');
        
        method.addEventListener('mouseenter', () => {
            gsap.to(method, {
                scale: 1.03,
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });

            if (methodIcon) {
                gsap.to(methodIcon, {
                    scale: 1.1,
                    rotation: "+=10",
                    duration: 0.3,
                    ease: "back.out(1.4)"
                });

                // Add method-specific glow
                const iconContainer = methodIcon.parentElement;
                if (iconContainer.classList.contains('bg-blue-500/20')) {
                    gsap.to(iconContainer, {
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                } else if (iconContainer.classList.contains('bg-emerald-500/20')) {
                    gsap.to(iconContainer, {
                        boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                } else if (iconContainer.classList.contains('bg-gray-500/20')) {
                    gsap.to(iconContainer, {
                        boxShadow: "0 0 20px rgba(107, 114, 128, 0.4)",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            }
        });

        method.addEventListener('mouseleave', () => {
            gsap.to(method, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });

            if (methodIcon) {
                gsap.to(methodIcon, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                const iconContainer = methodIcon.parentElement;
                gsap.to(iconContainer, {
                    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });

    // Enhanced hover effects for form inputs
    const formInputs = document.querySelectorAll('.contact-input');
    formInputs.forEach((input) => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });

    // Enhanced hover effects for submit button
    const submitButton = document.querySelector('.contact-button');
    if (submitButton) {
        submitButton.addEventListener('mouseenter', () => {
            gsap.to(submitButton, {
                scale: 1.05,
                y: -2,
                duration: 0.2,
                ease: "power2.out"
            });

            // Add sending animation effect
            gsap.to(submitButton, {
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                duration: 0.3,
                ease: "power2.out"
            });
        });

        submitButton.addEventListener('mouseleave', () => {
            gsap.to(submitButton, {
                scale: 1,
                y: 0,
                duration: 0.2,
                ease: "power2.out"
            });

            gsap.to(submitButton, {
                boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }

    // Enhanced hover effects for FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.02,
                y: -3,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(item, {
                boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
                duration: 0.3,
                ease: "power2.out"
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(item, {
                boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Enhanced hover effects for alternative contact items
    const altContactItems = document.querySelectorAll('.alt-contact-item');
    altContactItems.forEach((item) => {
        const itemIcon = item.querySelector('.alt-icon');
        
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.05,
                y: -8,
                duration: 0.3,
                ease: "power2.out"
            });

            if (itemIcon) {
                gsap.to(itemIcon, {
                    scale: 1.15,
                    rotation: "+=15",
                    duration: 0.3,
                    ease: "back.out(1.4)"
                });
            }
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });

            if (itemIcon) {
                gsap.to(itemIcon, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
}