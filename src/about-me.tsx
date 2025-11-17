import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Heart, Code } from "lucide-react"

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const imageContainerRef = useRef(null);
  const profileImageRef = useRef(null);
  const nameRef = useRef(null);
  const socialLinksRef = useRef([]);
  const descriptionRef = useRef(null);
  const footerLineRef = useRef(null);
  const footerContentRef = useRef(null);
  const footerSocialLinksRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background fade and scale
      gsap.fromTo(
        bgRef.current,
        {
          scale: 1.2,
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

      // Subtitle slide from left with glow
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
            trigger: subtitleRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Title character reveal with 3D rotation
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
          scale: 0,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Profile image smooth entrance from left
      gsap.fromTo(
        profileImageRef.current,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Continuous floating for profile image
      gsap.to(profileImageRef.current, {
        y: -15,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Name typewriter effect
      gsap.fromTo(
        nameRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: nameRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Social links cascade with bounce
      socialLinksRef.current.forEach((link, index) => {
        if (!link) return;
        
        gsap.fromTo(
          link,
          {
            y: 60,
            opacity: 0,
            rotateY: -90,
            scale: 0,
          },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: link,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Continuous pulse animation
        gsap.to(link, {
          scale: 1.1,
          duration: 1.5 + index * 0.3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });

      // Description paragraphs reveal with lines
      const paragraphs = descriptionRef.current?.querySelectorAll('p');
      if (paragraphs) {
        paragraphs.forEach((p, index) => {
          gsap.fromTo(
            p,
            {
              x: 100,
              opacity: 0,
              filter: 'blur(10px)',
            },
            {
              x: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1,
              delay: index * 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: p,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // Parallax effect
      gsap.to(imageContainerRef.current, {
        y: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Footer line animation
      gsap.fromTo(
        footerLineRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerLineRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Footer content fade in
      gsap.fromTo(
        footerContentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerContentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Footer social links animation
      footerSocialLinksRef.current.forEach((link, index) => {
        if (!link) return;

        gsap.fromTo(
          link,
          { y: 30, opacity: 0, scale: 0 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.2 + index * 0.1,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: footerContentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToSocialRefs = (el) => {
    if (el && !socialLinksRef.current.includes(el)) {
      socialLinksRef.current.push(el);
    }
  };

  const addToFooterSocialRefs = (el) => {
    if (el && !footerSocialLinksRef.current.includes(el)) {
      footerSocialLinksRef.current.push(el);
    }
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-24 pb-32 px-16 overflow-hidden">
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-transparent"
      ></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#64FFDA] opacity-[0.015] rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#64FFDA] opacity-[0.015] rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <p
            ref={subtitleRef}
            className="text-[#64FFDA] text-xs font-medium tracking-[0.2em] uppercase mb-4"
          >
            About Me{' '}
          </p>
          <h2
            ref={titleRef}
            className="text-white text-5xl font-bold mb-4"
            style={{ perspective: '1000px' }}
          >
            Get to know a little about me
          </h2>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Profile Image and Social Links */}
          <div ref={imageContainerRef} className="flex flex-col items-center" style={{ perspective: '1200px' }}>
            <div className="mb-8">
              <div
                ref={profileImageRef}
                className="relative w-64 h-64 rounded-full border-4 border-[#64FFDA] overflow-hidden shadow-[0_0_40px_rgba(100,255,218,0.2)]"
              >
                <img src="/professional-profile.png" alt="Profile" className="w-full h-full object-cover" />
                {/* Glow effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#64FFDA]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Name */}
            <h3 ref={nameRef} className="text-white text-2xl font-bold mb-6">
              Muhammad Ahmad Ali
            </h3>

            {/* Social Links */}
            <div className="flex gap-6" style={{ perspective: '800px' }}>
              <a
                ref={addToSocialRefs}
                href="mailto:ahmedbinnavid@gmail.com"
                className="text-[#64FFDA] hover:text-white transition-colors duration-200 p-3 border border-[#64FFDA] rounded hover:bg-[#64FFDA]/10"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
              <a
                ref={addToSocialRefs}
                href="https://github.com/mvahmadali"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#64FFDA] hover:text-white transition-colors duration-200 p-3 border border-[#64FFDA] rounded hover:bg-[#64FFDA]/10"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                ref={addToSocialRefs}
                href="https://www.linkedin.com/in/muhammad-ahmad-ali-563b22266/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#64FFDA] hover:text-white transition-colors duration-200 p-3 border border-[#64FFDA] rounded hover:bg-[#64FFDA]/10"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Description */}
          <div ref={descriptionRef} className="space-y-6">
            <p className="text-[#8892B0] text-lg leading-[1.8]">
              I am a results-driven Software Engineer specializing in full-stack and mobile application development, with hands-on experience in React Native, Flask, and the MERN stack. Currently working at Just Dev It (JDI), I have contributed to the design and implementation of production-grade healthcare solutions, developing modular, scalable interfaces and integrating RESTful APIs for real-time synchronization. My academic foundation from Forman Christian College and practical exposure through diverse projects — including CrashAnalytix, an AI-powered accident detection and analysis system — have strengthened my skills in AI integration, model development, and end-to-end system design. I am passionate about building impactful, data-driven solutions that combine artificial intelligence with modern web technologies to address real-world challenges.
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-32">
          {/* Decorative line */}
          <div className="mb-12">
            <div
              ref={footerLineRef}
              className="h-[2px] bg-gradient-to-r from-transparent via-[#64FFDA] to-transparent transform origin-left"
            ></div>
          </div>

          {/* Footer content */}
          <div ref={footerContentRef}>
            <div className="flex flex-col items-center space-y-8">
              {/* Logo and tagline */}
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#64FFDA] text-2xl font-bold">&lt;/</span>
                  <span className="text-white text-2xl font-medium tracking-wide">
                    mvahmadali
                  </span>
                  <span className="text-[#64FFDA] text-2xl font-bold">&gt;</span>
                </div>
                <p className="text-[#8892B0] text-sm flex items-center gap-2 justify-center">
                  <span>Crafted with</span>
                  <Heart className="w-4 h-4 text-[#64FFDA] fill-[#64FFDA]" />
                  <span>and</span>
                  <Code className="w-4 h-4 text-[#64FFDA]" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
