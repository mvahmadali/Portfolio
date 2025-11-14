import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiPostman,
  SiCloudflare,
  SiGreensock,
  SiThreedotjs
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const TechArsenal = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background zoom effect
      gsap.fromTo(
        bgRef.current,
        {
          scale: 1.3,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subtitle reveal with glitch effect
      gsap.fromTo(
        subtitleRef.current,
        {
          x: -80,
          opacity: 0,
          skewX: -10,
        },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Title split and reveal
      const titleText = titleRef.current?.textContent || '';
      titleRef.current.innerHTML = titleText
        .split('')
        .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      const titleChars = titleRef.current.querySelectorAll('span');
      gsap.fromTo(
        titleChars,
        {
          y: 120,
          opacity: 0,
          rotateY: 90,
          filter: 'blur(10px)',
        },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.04,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Description fade and scale
      gsap.fromTo(
        descriptionRef.current,
        {
          y: 40,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Tech cards cascade animation with rotation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Initial entrance animation
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            rotateX: -90,
            scale: 0.5,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.05,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Continuous floating animation
        gsap.to(card, {
          y: -8,
          duration: 2 + (index % 3) * 0.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: index * 0.1,
        });

        // Subtle rotation on scroll
        gsap.to(card, {
          rotateY: 5,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        });
      });

      // Parallax effect for the entire grid
      gsap.to(gridRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };
  const technologies = [
    { name: 'React', icon: SiReact, color: '#61DAFB', bgGradient: 'from-cyan-400/10 to-cyan-500/5' },
            { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', bgGradient: 'from-yellow-500/10 to-yellow-600/5' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', bgGradient: 'from-cyan-500/10 to-cyan-600/5' },
    { name: 'Three.js', icon: SiThreedotjs, color: '#000000', bgGradient: 'from-gray-700/10 to-gray-800/5' },

            { name: 'GSAP', icon: SiGreensock, color: '#88CE02', bgGradient: 'from-green-400/10 to-green-500/5' },

    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', bgGradient: 'from-blue-500/10 to-blue-600/5' },
    { name: 'React three fiber', icon: SiReact, color: '#61DAFB', bgGradient: 'from-cyan-400/10 to-cyan-500/5' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933', bgGradient: 'from-green-500/10 to-green-600/5' },
    { name: 'Express', icon: SiExpress, color: '#FFFFFF', bgGradient: 'from-slate-400/10 to-slate-500/5' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248', bgGradient: 'from-green-500/10 to-green-600/5' },
    { name: 'HTML', icon: SiHtml5, color: '#E34F26', bgGradient: 'from-orange-500/10 to-orange-600/5' },
    { name: 'CSS', icon: SiCss3, color: '#264DE4', bgGradient: 'from-blue-500/10 to-blue-600/5' },
    { name: 'Git', icon: SiGit, color: '#F05032', bgGradient: 'from-orange-500/10 to-orange-600/5' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37', bgGradient: 'from-orange-500/10 to-orange-600/5' },
    { name: 'Cloudflare', icon: SiCloudflare, color: '#F38020', bgGradient: 'from-orange-500/10 to-orange-600/5' },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 px-16 overflow-hidden">
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-transparent"
      ></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-[#64FFDA] opacity-[0.03] rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-[#64FFDA] opacity-[0.03] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <p
            ref={subtitleRef}
            className="text-[#64FFDA] text-xs font-medium tracking-[0.2em] uppercase mb-4"
          >
            Skills
          </p>
          <h2
            ref={titleRef}
            className="text-white text-5xl font-bold mb-4"
            style={{ perspective: '1000px' }}
          >
            Tech Arsenal
          </h2>
          <p
            ref={descriptionRef}
            className="text-[#8892B0] text-lg max-w-2xl mx-auto"
          >
            A comprehensive toolkit of modern technologies I use to build scalable, performant applications
          </p>
        </div>

        {/* Tech Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          style={{ perspective: '1200px' }}
        >
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <div
                key={index}
                ref={addToRefs}
                className="group relative isolate"
              >
                {/* Card */}
                <div
                  className={`relative z-[1] overflow-hidden bg-gradient-to-br ${tech.bgGradient} backdrop-blur-sm border border-[#233554] rounded-2xl p-6 h-[160px] flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:border-[#64FFDA]/50 hover:shadow-[0_0_30px_rgba(100,255,218,0.1)]`}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#64FFDA]/0 to-[#64FFDA]/0 group-hover:from-[#64FFDA]/5 group-hover:to-transparent rounded-2xl transition-all duration-300 pointer-events-none"></div>

                  {/* Icon */}
                  <div
                    className="relative text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ color: tech.color }}
                  >
                    <IconComponent size={48} />
                  </div>

                  {/* Name */}
                  <p className="relative text-white text-sm font-medium tracking-wide group-hover:text-[#64FFDA] transition-colors duration-300">
                    {tech.name}
                  </p>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700 rounded-2xl pointer-events-none"></div>
                </div>

                {/* Bottom glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#64FFDA]/30 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechArsenal;
