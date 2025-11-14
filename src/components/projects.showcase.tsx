import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectsShowcase = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const description2Ref = useRef(null);
  const buttonRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background scale and rotation effect
      gsap.fromTo(
        bgRef.current,
        {
          scale: 0.8,
          rotate: -5,
          opacity: 0,
        },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subtitle slide in from left with glow
      gsap.fromTo(
        subtitleRef.current,
        {
          x: -100,
          opacity: 0,
          filter: 'blur(10px)',
        },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Title characters reveal with wave effect
      const titleText = titleRef.current?.textContent || '';
      titleRef.current.innerHTML = titleText
        .split('')
        .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      const titleChars = titleRef.current.querySelectorAll('span');
      gsap.fromTo(
        titleChars,
        {
          y: 100,
          opacity: 0,
          rotateX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // First description with typewriter effect
      gsap.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Second description slide in from right
      gsap.fromTo(
        description2Ref.current,
        {
          x: 100,
          opacity: 0,
          filter: 'blur(8px)',
        },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: description2Ref.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Button with magnetic bounce effect
      gsap.fromTo(
        buttonRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.5,
          rotateZ: -10,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateZ: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Continuous floating animation for button
      gsap.to(buttonRef.current, {
        y: -10,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Parallax effect on scroll
      gsap.to(headerRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-16 overflow-hidden">
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-transparent"
      ></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#64FFDA] opacity-[0.03] rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#64FFDA] opacity-[0.03] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-20 text-center">
          <p
            ref={subtitleRef}
            className="text-[#64FFDA] text-xs font-medium tracking-[0.2em] uppercase mb-4"
          >
            Portfolio
          </p>
          <h2
            ref={titleRef}
            className="text-white text-5xl font-bold mb-4"
            style={{ perspective: '1000px' }}
          >
            Featured Projects
          </h2>
          <p
            ref={descriptionRef}
            className="text-[#8892B0] text-lg max-w-2xl mx-auto"
          >
            Explore my collection of innovative projects
          </p>
          <p ref={description2Ref} className="text-[#8892B0] mb-6">
            Want to see? Double-click and enter my collection of projects
            showcased in an interactive 3D canvas.
          </p>
          <button
            ref={buttonRef}
            className="px-8 py-3 border border-[#64FFDA] text-[#64FFDA] rounded-lg font-medium tracking-wide hover:bg-[#64FFDA]/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(100,255,218,0.2)] relative overflow-hidden group"
          >
            <span className="relative z-10">View All Projects</span>
            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
