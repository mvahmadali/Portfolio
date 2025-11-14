import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const elementsRef = useRef({});
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Enhanced background animation with rotation
      tl.fromTo(
        elementsRef.current.bg,
        { scale: 1.3, opacity: 0, rotate: 2 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.5 }
      );

      // Subtitle with blur and skew effect
      tl.fromTo(
        elementsRef.current.subtitle,
        { x: -80, opacity: 0, skewX: -10, filter: 'blur(10px)' },
        { x: 0, opacity: 1, skewX: 0, filter: 'blur(0px)', duration: 1 },
        '-=1'
      );

      // Title animation with 3D rotation
      const titleChars = elementsRef.current.title?.querySelectorAll('.char');
      if (titleChars) {
        tl.fromTo(
          titleChars,
          { y: 120, opacity: 0, rotateX: -90, scale: 0.5 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.03,
            ease: 'back.out(2)'
          },
          '-=0.7'
        );
      }

      // Description with slide and scale
      tl.fromTo(
        elementsRef.current.description,
        { x: -60, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, duration: 0.9 },
        '-=0.5'
      );

      // Button with elastic bounce and rotation
      tl.fromTo(
        elementsRef.current.button,
        { y: 60, opacity: 0, scale: 0.5, rotateZ: -15 },
        { y: 0, opacity: 1, scale: 1, rotateZ: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
        '-=0.4'
      );

      // Image with rotation and scale
      tl.fromTo(
        elementsRef.current.image,
        { x: 150, opacity: 0, scale: 0.7, rotateZ: 20 },
        { x: 0, opacity: 1, scale: 1, rotateZ: 0, duration: 1.2, ease: 'back.out(1.5)' },
        '-=1'
      );

      // Enhanced continuous floating animation
      gsap.to(elementsRef.current.image, {
        y: -25,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

      // Add subtle rotation to image
      gsap.to(elementsRef.current.image, {
        rotateZ: 3,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

      // Button continuous pulse
      gsap.to(elementsRef.current.button, {
        scale: 1.05,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

      // Glowing effect for subtitle
      gsap.to(elementsRef.current.subtitle, {
        textShadow: '0 0 20px rgba(100, 255, 218, 0.8)',
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split text into characters for animation
  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  // Set ref for each element
  const setRef = (name) => (el) => {
    elementsRef.current[name] = el;
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Background */}
      <div 
        ref={setRef('bg')}
        className="absolute inset-0 bg-transparent"
      />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#64FFDA] opacity-[0.03] rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#64FFDA] opacity-[0.03] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Main content */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center pt-20" style={{ perspective: '1200px' }}>
        
        {/* Left content */}
        <div className="space-y-6 lg:space-y-7">
          <p 
            ref={setRef('subtitle')}
            className="text-[#64FFDA] text-xs font-medium tracking-[0.2em] uppercase"
          >
            Software Engineer
          </p>

          <h1 
            ref={setRef('title')}
            className="text-white text-4xl sm:text-5xl lg:text-[62px] font-bold leading-[1.1] tracking-tight whitespace-nowrap"
          >
            {splitText('Muhammad Ahmad Ali')}
          </h1>

          <p 
            ref={setRef('description')}
            className="text-[#8892B0] text-base lg:text-[17px] leading-[1.7] max-w-[480px]"
          >
            Result driven software engineer experienced in developing scalable
            web applications using modern technologies.
          </p>

          <div>
            <button 
              ref={setRef('button')}
              className="relative px-6 py-3 lg:px-8 lg:py-3.5 border-2 border-[#64FFDA] text-[#64FFDA] font-medium text-xs lg:text-[13px] tracking-[0.15em] uppercase bg-transparent overflow-hidden group transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-[#0a192f] transition-colors duration-500">BAIXAR CURRÍCULO</span>
              
              {/* Animated border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#64FFDA] transition-all duration-300" 
                   style={{
                     background: 'linear-gradient(90deg, transparent, #64FFDA, transparent)',
                     backgroundSize: '200% 100%',
                     animation: 'borderGlow 2s linear infinite',
                     opacity: 0
                   }}
              />
              
              {/* Fill effect from bottom */}
              <div className="absolute inset-0 bg-[#64FFDA] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
              
              {/* Ripple effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-[#64FFDA] opacity-30 blur-xl transform scale-150 group-hover:scale-100 transition-transform duration-500" />
              </div>
            </button>
          </div>
        </div>

        {/* Right content */}
        <div className="flex justify-center">
          <div 
            ref={setRef('image')}
            className="relative w-[280px] h-[380px] sm:w-[340px] sm:h-[430px] lg:w-[380px] lg:h-[480px]"
          >
            <img
              src="/developer.png"
              alt="Developer Illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;