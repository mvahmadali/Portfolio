import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const mobileLabelRef = useRef(null);
  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
  const getMobileStartX = () => -Math.max(window.innerWidth * 0.9, 320);
  const [activeSection, setActiveSection] = useState('home');

  const sectionLabelMap = {
    home: '</mvahmadali>',
    skills: 'Skills',
    projects: 'Projects',
    about: 'About Me'
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar slides down from top
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );

      // Logo scales in with rotation
      gsap.fromTo(
        logoRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.5 }
      );

      // Links stagger in from right
      gsap.fromTo(
        linksRef.current,
        { x: 50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'power2.out',
          delay: 0.7
        }
      );

      // Set up scroll triggers for active section detection
      const sections = [
        { id: 'home', selector: '#home' },
        { id: 'skills', selector: '#skills' },
        { id: 'projects', selector: '#projects' },
        { id: 'about', selector: '#about' }
      ];

      sections.forEach(section => {
        ScrollTrigger.create({
          trigger: section.selector,
          start: 'top 78%',
          end: 'top 35%',
          onEnter: () => setActiveSection(section.id),
          onEnterBack: () => setActiveSection(section.id),
          onUpdate: (self) => {
            if (!isMobile() || !mobileLabelRef.current || !self.isActive) return;

            const progress = gsap.utils.clamp(0, 1, self.progress);
            gsap.to(mobileLabelRef.current, {
              x: gsap.utils.interpolate(getMobileStartX(), 0, progress),
              opacity: gsap.utils.interpolate(0.35, 1, progress),
              filter: `blur(${(1 - progress) * 5}px)`,
              duration: 0.2,
              ease: 'none',
              overwrite: 'auto'
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!mobileLabelRef.current) return;

    gsap.killTweensOf(mobileLabelRef.current);

    gsap.fromTo(
      mobileLabelRef.current,
      { x: getMobileStartX(), opacity: 0.25, filter: 'blur(6px)' },
      { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1.05, ease: 'power1.out' }
    );
  }, [activeSection]);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-4 py-5 sm:px-8 sm:py-6 lg:px-16 lg:py-8">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div ref={logoRef} className="hidden md:flex items-center gap-2">
          <span className="text-[#64FFDA] text-2xl font-bold">&lt;/</span>
          <span className="text-white text-3xl font-medium tracking-wide">
            mvahmadali
          </span>
          <span className="text-[#64FFDA] text-3xl font-bold">&gt;</span>
        </div>

        <div className="md:hidden w-full overflow-hidden text-center">
          <span
            ref={mobileLabelRef}
            key={activeSection}
            className="block text-[#E6F1FF] text-lg font-semibold tracking-wide"
          >
            {sectionLabelMap[activeSection]}
          </span>
        </div>

        <ul className="hidden md:flex items-center gap-16">
          <li ref={el => linksRef.current[0] = el}>
            <span
              className="text-[#A8B2D1] text-base font-normal hover:text-[#64FFDA] transition-colors relative inline-block pb-2 cursor-default"
            >
              Skills
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#64FFDA] transition-opacity duration-300 ${activeSection === 'skills' ? 'opacity-100' : 'opacity-0'}`}></span>
            </span>
          </li>
          <li ref={el => linksRef.current[1] = el}>
            <span
              className="text-[#A8B2D1] text-base font-normal hover:text-[#64FFDA] transition-colors relative inline-block pb-2 cursor-default"
            >
              Projects
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#64FFDA] transition-opacity duration-300 ${activeSection === 'projects' ? 'opacity-100' : 'opacity-0'}`}></span>
            </span>
          </li>
          <li ref={el => linksRef.current[2] = el}>
            <span
              className="text-[#A8B2D1] text-base font-normal hover:text-[#64FFDA] transition-colors relative inline-block pb-2 cursor-default"
            >
              About Me
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#64FFDA] transition-opacity duration-300 ${activeSection === 'about' ? 'opacity-100' : 'opacity-0'}`}></span>
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;