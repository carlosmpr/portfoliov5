// src/animations/slideshow.js
export function initSlideshowAnimations(gsap) {
    const track = document.getElementById('slideshow-track');
    const prevBtn = document.getElementById('slideshow-prevBtn');
    const nextBtn = document.getElementById('slideshow-nextBtn');
    const tabs = document.getElementById('slideshow-tabs');
    const underline = document.getElementById('slideshow-underline');
    
    if (!track) return; // Not on work page

    const useGSAP = !!gsap;
    const slides = Array.from(track.querySelectorAll('.slide'));
    const count = slides.length;
    let index = 0;
    let autoAdvanceInterval;
    let isAnimating = false;

    if (!useGSAP) {
        document.body.classList.add('css-animations');
        console.log('GSAP not available, using CSS fallback animations for Slideshow');
    } else {
        console.log('GSAP loaded successfully, using enhanced animations for Slideshow');
    }

    function setTrackWidth() {
        track.style.width = `${count * 100}%`;
        slides.forEach(s => s.style.width = `${100 / count}%`);
    }

    function setIndex(i, direction = 1) {
        if (isAnimating) return;
        
        const prevIndex = index;
        index = (i + count) % count;
        
        if (prevIndex === index) return;
        
        isAnimating = true;

        if (useGSAP) {
            // Enhanced GSAP Animations
            const masterTL = gsap.timeline({
                onComplete: () => {
                    isAnimating = false;
                    updateTabs();
                }
            });

            // Track movement - faster and snappier
            masterTL.to(track, {
                x: `-${index * (100 / count)}%`,
                duration: 0.7,
                ease: "power3.out"
            }, 0);

            // Previous slide content out - quicker fade
            const prevSlideContent = slides[prevIndex]?.querySelector('.slide-content');
            if (prevSlideContent) {
                masterTL.to(prevSlideContent, {
                    opacity: 0,
                    y: direction > 0 ? -25 : 25,
                    scale: 0.96,
                    duration: 0.3,
                    ease: "power2.in"
                }, 0);
            }

            // New slide content in with faster stagger
            const newSlideContent = slides[index]?.querySelector('.slide-content');
            if (newSlideContent) {
                const contentElements = newSlideContent.children;
                
                gsap.set(newSlideContent, { opacity: 0 });
                gsap.set(contentElements, { 
                    opacity: 0, 
                    y: direction > 0 ? 40 : -40,
                    scale: 0.95
                });

                masterTL.to(newSlideContent, {
                    opacity: 1,
                    duration: 0.2,
                    ease: "power2.out"
                }, 0.2);

                masterTL.to(contentElements, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "back.out(1.2)"
                }, 0.3);
            }

            // Background effects - more subtle and faster
            const prevSlide = slides[prevIndex];
            const newSlide = slides[index];
            
            if (prevSlide && newSlide) {
                const prevBg = prevSlide.querySelector('.absolute.inset-0');
                const newBg = newSlide.querySelector('.absolute.inset-0');
                
                if (prevBg) {
                    masterTL.to(prevBg, {
                        scale: 1.05,
                        rotation: direction > 0 ? 1.5 : -1.5,
                        duration: 0.7,
                        ease: "power2.out"
                    }, 0);
                }
                
                if (newBg) {
                    gsap.set(newBg, { scale: 0.95, rotation: direction > 0 ? -1.5 : 1.5 });
                    masterTL.to(newBg, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.7,
                        ease: "power2.out"
                    }, 0.1);
                }
            }
        } else {
            // CSS Fallback Animations - faster and smoother
            track.style.transform = `translateX(-${index * (100 / count)}%)`;
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            const prevSlideContent = slides[prevIndex]?.querySelector('.slide-content');
            const newSlideContent = slides[index]?.querySelector('.slide-content');
            
            if (prevSlideContent) {
                prevSlideContent.classList.remove('visible');
            }
            
            setTimeout(() => {
                if (newSlideContent) {
                    newSlideContent.classList.add('visible');
                }
                isAnimating = false;
                updateTabs();
            }, 200);
        }
    }

    function createTabs() {
        tabs.innerHTML = '<div id="slideshow-underline" class="tab-underline absolute bottom-0 h-0.5 bg-blue-400"></div>';
        
        for (let i = 0; i < count; i++) {
            const btn = document.createElement('button');
            btn.id = `slideshow-tab-${i}`;
            btn.className = 'mx-2 px-4 py-2 text-sm rounded-full text-white/60 data-[active=true]:text-blue-400 focus:outline-none border border-white/10 hover:border-white/20 transition-all transform hover:scale-105';
            btn.textContent = String(i + 1);
            btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
            btn.addEventListener('click', () => {
                if (!isAnimating) {
                    stopAutoAdvance();
                    const direction = i > index ? 1 : -1;
                    setIndex(i, direction);
                    setTimeout(startAutoAdvance, 2000);
                }
            });
            tabs.appendChild(btn);
        }
    }

    function updateTabs() {
        const buttons = tabs.querySelectorAll('button');
        buttons.forEach((b, i) => {
            b.dataset.active = String(i === index);
            b.setAttribute('aria-selected', String(i === index));
        });
        
        const activeTab = document.getElementById(`slideshow-tab-${index}`);
        const newUnderline = document.getElementById('slideshow-underline');
        
        if (activeTab && newUnderline) {
            const parentLeft = tabs.getBoundingClientRect().left;
            const { left, width } = activeTab.getBoundingClientRect();
            
            if (useGSAP) {
                gsap.to(newUnderline, {
                    x: left - parentLeft,
                    width: width,
                    duration: 0.3,
                    ease: "power2.out"
                });
            } else {
                newUnderline.style.transform = `translateX(${left - parentLeft}px)`;
                newUnderline.style.width = `${width}px`;
            }
        }
    }

    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(() => {
            if (!isAnimating) {
                setIndex(index + 1, 1);
            }
        }, 4500);
    }
    
    function stopAutoAdvance() {
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
        }
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (!isAnimating) {
                stopAutoAdvance();
                setIndex(index - 1, -1);
                setTimeout(startAutoAdvance, 1000);
            }
        });
        
        if (useGSAP) {
            prevBtn.addEventListener('mouseenter', () => {
                gsap.to(prevBtn, { scale: 1.1, duration: 0.2, ease: "back.out(1.4)" });
            });
            prevBtn.addEventListener('mouseleave', () => {
                gsap.to(prevBtn, { scale: 1, duration: 0.2, ease: "power2.out" });
            });
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (!isAnimating) {
                stopAutoAdvance();
                setIndex(index + 1, 1);
                setTimeout(startAutoAdvance, 1000);
            }
        });
        
        if (useGSAP) {
            nextBtn.addEventListener('mouseenter', () => {
                gsap.to(nextBtn, { scale: 1.1, duration: 0.2, ease: "back.out(1.4)" });
            });
            nextBtn.addEventListener('mouseleave', () => {
                gsap.to(nextBtn, { scale: 1, duration: 0.2, ease: "power2.out" });
            });
        }
    }

    // Container hover effects
    const slideshow = document.querySelector('.slideshow-container');
    if (slideshow) {
        slideshow.addEventListener('mouseenter', () => {
            stopAutoAdvance();
            if (useGSAP) {
                gsap.to(slideshow, { scale: 1.005, duration: 0.3, ease: "power2.out" });
            }
        });
        slideshow.addEventListener('mouseleave', () => {
            startAutoAdvance();
            if (useGSAP) {
                gsap.to(slideshow, { scale: 1, duration: 0.3, ease: "power2.out" });
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isAnimating) return;
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            stopAutoAdvance();
            setIndex(index - 1, -1);
            setTimeout(startAutoAdvance, 1000);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            stopAutoAdvance();
            setIndex(index + 1, 1);
            setTimeout(startAutoAdvance, 1000);
        }
    });

    // Initialize
    if (count > 0) {
        setTrackWidth();
        createTabs();
        
        // Initial setup
        const allSlideContents = document.querySelectorAll('.slide-content');
        
        if (useGSAP) {
            gsap.set(allSlideContents, { opacity: 0 });
            
            setTimeout(() => {
                const firstSlideContent = slides[0]?.querySelector('.slide-content');
                if (firstSlideContent) {
                    const contentElements = firstSlideContent.children;
                    
                    gsap.set(firstSlideContent, { opacity: 1 });
                    gsap.fromTo(contentElements, 
                        { 
                            opacity: 0, 
                            y: 50,
                            scale: 0.9
                        },
                        { 
                            opacity: 1, 
                            y: 0,
                            scale: 1,
                            duration: 0.8,
                            stagger: 0.1,
                            ease: "back.out(1.2)",
                            delay: 0.2
                        }
                    );
                }
                updateTabs();
            }, 400);
        } else {
            allSlideContents.forEach((content, i) => {
                if (i === 0) {
                    content.classList.add('visible');
                }
            });
            updateTabs();
        }
        
        setTimeout(startAutoAdvance, useGSAP ? 1500 : 1000);
    }
}