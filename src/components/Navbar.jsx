import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);

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
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-16 py-8">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div ref={logoRef} className="flex items-center gap-2">
          <span className="text-[#64FFDA] text-2xl font-bold">&lt;/</span>
          <span className="text-white text-3xl font-medium tracking-wide">
            mvahmadali
          </span>
          <span className="text-[#64FFDA] text-3xl font-bold">&gt;</span>
        </div>

        <ul className="flex items-center gap-16">
          <li ref={el => linksRef.current[0] = el}>
            <a
              href="#sobre"
              className="text-white text-base font-normal relative inline-block pb-2"
            >
              Sobre
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#64FFDA]"></span>
            </a>
          </li>
          <li ref={el => linksRef.current[1] = el}>
            <a
              href="#skills"
              className="text-[#A8B2D1] text-base font-normal hover:text-[#64FFDA] transition-colors"
            >
              Skills
            </a>
          </li>
          <li ref={el => linksRef.current[2] = el}>
            <a
              href="#laboratorio"
              className="text-[#A8B2D1] text-base font-normal hover:text-[#64FFDA] transition-colors"
            >
              Laboratório
            </a>
          </li>
          <li ref={el => linksRef.current[3] = el}>
            <a
              href="#contato"
              className="text-[#A8B2D1] text-base font-normal hover:text-[#64FFDA] transition-colors"
            >
              Contato
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;