// src/animations/aiTech.js
export function initAITechAnimations(gsap) {
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

        document.querySelectorAll('.ai-tech-header, .ai-tech-section, .ai-tech-card, .ai-tech-chart, .ai-tech-metric, .ai-tech-globe, .ai-tech-pipeline').forEach((el) => {
            observer.observe(el);
        });
        return;
    }

    // Create AI Tech-themed entrance animations
    function createAITechAnimation() {
        const header = document.querySelector('.ai-tech-header');
        const sections = document.querySelectorAll('.ai-tech-section');
        const cards = document.querySelectorAll('.ai-tech-card');
        const charts = document.querySelectorAll('.ai-tech-chart');
        const metrics = document.querySelectorAll('.ai-tech-metric');
        const globe = document.querySelector('.ai-tech-globe');
        const pipeline = document.querySelector('.ai-tech-pipeline');

        if (!header && !sections.length && !cards.length) return;

        // Create master timeline
        const masterTL = gsap.timeline({ paused: true });

        // 1. Header section slides in with tech overlay effect
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
                    y: 40,
                    scale: 0.9,
                    filter: 'blur(5px)'
                });
            }
            
            if (headerText) {
                gsap.set(headerText, { 
                    opacity: 0, 
                    y: 30,
                    scale: 0.95
                });
            }

            masterTL.to(header, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            }, 0.2);

            if (headerTitle) {
                masterTL.to(headerTitle, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 0.9,
                    ease: "power2.out"
                }, 0.3);
            }

            if (headerText) {
                masterTL.to(headerText, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: "power2.out"
                }, 0.5);
            }
        }

        // 2. Section containers materialize with data-flow effect
        if (sections.length) {
            sections.forEach((section, index) => {
                gsap.set(section, { 
                    opacity: 0, 
                    visibility: 'visible',
                    scale: 0.95,
                    y: 30,
                    filter: 'blur(3px)'
                });

                masterTL.to(section, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    ease: "power2.out"
                }, 0.7 + (index * 0.1));
            });
        }

        // 3. Cards animate in with tech scanning effect
        if (cards.length) {
            cards.forEach((card, index) => {
                const directions = [
                    { x: -50, y: 30, rotation: -2 },
                    { x: 50, y: 30, rotation: 2 },
                    { x: -30, y: 50, rotation: -1 },
                    { x: 30, y: 50, rotation: 1 },
                    { x: -40, y: 20, rotation: -1.5 },
                    { x: 40, y: 20, rotation: 1.5 }
                ];
                
                const direction = directions[index % directions.length];
                
                gsap.set(card, { 
                    opacity: 0, 
                    visibility: 'visible',
                    x: direction.x,
                    y: direction.y,
                    scale: 0.85,
                    rotation: direction.rotation,
                    filter: 'blur(4px)'
                });

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
                        // Add subtle tech scanning effect
                        gsap.set(card, { overflow: 'hidden' });
                        const scanLine = document.createElement('div');
                        scanLine.style.cssText = `
                            position: absolute;
                            top: 0;
                            left: -100%;
                            width: 100%;
                            height: 2px;
                            background: linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.6), transparent);
                            z-index: 10;
                        `;
                        card.style.position = 'relative';
                        card.appendChild(scanLine);
                        
                        gsap.to(scanLine, {
                            x: '200%',
                            duration: 1.5,
                            ease: 'power2.inOut',
                            onComplete: () => scanLine.remove()
                        });
                    }
                }, 0.9 + (index * 0.15));
            });
        }

        // 4. Charts animate with data visualization effect
        if (charts.length) {
            charts.forEach((chart, index) => {
                const chartBars = chart.querySelectorAll('.chart-bar');
                
                gsap.set(chart, { 
                    opacity: 0, 
                    visibility: 'visible',
                    scale: 0.9
                });

                if (chartBars.length) {
                    gsap.set(chartBars, { 
                        scaleY: 0,
                        transformOrigin: 'bottom'
                    });
                }

                masterTL.to(chart, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                }, 1.2 + (index * 0.2));

                if (chartBars.length) {
                    masterTL.to(chartBars, {
                        scaleY: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "back.out(1.2)"
                    }, 1.4 + (index * 0.2));
                }
            });
        }

        // 5. Metrics animate with counting effect
        if (metrics.length) {
            metrics.forEach((metric, index) => {
                const number = metric.querySelector('[class*="text-"]');
                
                gsap.set(metric, { 
                    opacity: 0, 
                    visibility: 'visible',
                    y: 20,
                    scale: 0.9
                });

                masterTL.to(metric, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.1)",
                    onComplete: () => {
                        // Add subtle glow effect
                        gsap.to(metric, {
                            boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
                            duration: 2,
                            yoyo: true,
                            repeat: 2,
                            ease: "power2.inOut"
                        });
                    }
                }, 1.0 + (index * 0.1));
            });
        }

        // 6. Globe visualization with orbital animation
        if (globe) {
            const globeRings = globe.querySelectorAll('.globe-ring');
            
            gsap.set(globe, { 
                opacity: 0, 
                visibility: 'visible',
                scale: 0.7,
                rotationY: -20
            });

            if (globeRings.length) {
                gsap.set(globeRings, { 
                    scale: 0,
                    opacity: 0
                });
            }

            masterTL.to(globe, {
                opacity: 1,
                scale: 1,
                rotationY: 0,
                duration: 1,
                ease: "power2.out"
            }, 1.3);

            if (globeRings.length) {
                masterTL.to(globeRings, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    onComplete: () => {
                        // Add continuous orbital rotation
                        globeRings.forEach((ring, i) => {
                            gsap.to(ring, {
                                rotation: 360,
                                duration: 20 + (i * 5),
                                repeat: -1,
                                ease: "none"
                            });
                        });
                    }
                }, 1.5);
            }
        }

        // 7. Pipeline with data flow animation
        if (pipeline) {
            const pipelineNodes = pipeline.querySelectorAll('.pipeline-node');
            const pipelineConnectors = pipeline.querySelectorAll('.pipeline-connector');
            
            gsap.set(pipeline, { 
                opacity: 0, 
                visibility: 'visible'
            });

            if (pipelineNodes.length) {
                gsap.set(pipelineNodes, { 
                    scale: 0,
                    rotation: 180
                });
            }

            if (pipelineConnectors.length) {
                gsap.set(pipelineConnectors, { 
                    scaleX: 0,
                    transformOrigin: 'left'
                });
            }

            masterTL.to(pipeline, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            }, 1.4);

            if (pipelineNodes.length) {
                masterTL.to(pipelineNodes, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "back.out(1.4)"
                }, 1.5);
            }

            if (pipelineConnectors.length) {
                masterTL.to(pipelineConnectors, {
                    scaleX: 1,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => {
                        // Add data flow animation
                        pipelineConnectors.forEach(connector => {
                            const flowDot = document.createElement('div');
                            flowDot.style.cssText = `
                                position: absolute;
                                width: 4px;
                                height: 4px;
                                background: rgba(74, 222, 128, 0.8);
                                border-radius: 50%;
                                top: 50%;
                                left: 0;
                                transform: translateY(-50%);
                            `;
                            connector.style.position = 'relative';
                            connector.appendChild(flowDot);
                            
                            gsap.to(flowDot, {
                                x: '100%',
                                duration: 2,
                                repeat: -1,
                                ease: 'power1.inOut',
                                delay: Math.random() * 2
                            });
                        });
                    }
                }, 1.8);
            }
        }

        return masterTL;
    }

    // Setup Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const aiTechTimeline = createAITechAnimation();
                if (aiTechTimeline) {
                    aiTechTimeline.play();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe the AI Tech section to trigger the animation
    const aiTechSection = document.querySelector('section[aria-labelledby="ai-tech-heading"]');
    if (aiTechSection) {
        observer.observe(aiTechSection);
    }

    // Add enhanced hover effects for AI Tech cards
    const aiTechCards = document.querySelectorAll('.ai-tech-card');
    aiTechCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8,
                scale: 1.02,
                duration: 0.4,
                ease: "power2.out"
            });
            
            // Enhanced chart animations on hover
            const chartBars = card.querySelectorAll('.chart-bar');
            if (chartBars.length) {
                gsap.to(chartBars, {
                    scaleY: 1.1,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: "power2.out"
                });
            }
            
            // Enhanced progress bar animations
            const progressBars = card.querySelectorAll('.progress-bar');
            if (progressBars.length) {
                gsap.to(progressBars, {
                    scaleX: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            // Enhanced globe ring animations
            const globeRings = card.querySelectorAll('.globe-ring');
            if (globeRings.length) {
                gsap.to(globeRings, {
                    scale: (i) => 1 + (i * 0.02),
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            // Enhanced pipeline node animations
            const pipelineNodes = card.querySelectorAll('.pipeline-node');
            if (pipelineNodes.length) {
                gsap.to(pipelineNodes, {
                    scale: 1.1,
                    rotation: "+=5",
                    duration: 0.3,
                    stagger: 0.05,
                    ease: "back.out(1.2)"
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            });
            
            // Reset all enhanced animations
            const chartBars = card.querySelectorAll('.chart-bar');
            const progressBars = card.querySelectorAll('.progress-bar');
            const globeRings = card.querySelectorAll('.globe-ring');
            const pipelineNodes = card.querySelectorAll('.pipeline-node');
            
            if (chartBars.length) {
                gsap.to(chartBars, {
                    scaleY: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            if (progressBars.length) {
                gsap.to(progressBars, {
                    scaleX: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            if (globeRings.length) {
                gsap.to(globeRings, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            if (pipelineNodes.length) {
                gsap.to(pipelineNodes, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
}