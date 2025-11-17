import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import TechArsenal from '../components/TechArsenal'
import ProjectsShowcase from '../components/projects.showcase'
import AboutMe from '../about-me'

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Unified Background with radial gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,#233554_0%,#0a192f_50%,#020c1b_100%)] -z-10"></div>
      
      {/* Animated neon gradient orbs - only cyan/teal colors with reduced opacity */}
      <div className="fixed top-1/4 left-1/3 w-80 h-80 bg-[#64FFDA] opacity-[0.015] rounded-full blur-[100px] animate-pulse -z-10"></div>
      <div className="fixed bottom-1/4 right-1/3 w-80 h-80 bg-[#64FFDA] opacity-[0.015] rounded-full blur-[100px] animate-pulse -z-10" style={{ animationDelay: '1.5s' }}></div>
      <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-[#64FFDA] opacity-[0.015] rounded-full blur-[100px] animate-pulse -z-10" style={{ animationDelay: '3s' }}></div>
      <div className="fixed bottom-1/3 left-1/4 w-80 h-80 bg-[#64FFDA] opacity-[0.015] rounded-full blur-[100px] animate-pulse -z-10" style={{ animationDelay: '2s' }}></div>
      
      {/* Content */}
      <div className="relative z-0">
        <Navbar />
        <HeroSection />
        <TechArsenal />
        <ProjectsShowcase />
        <AboutMe />
      </div>
    </div>
  )
}

export default Home
