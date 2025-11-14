import { Link } from 'react-router-dom'
import Gallery3D from '../components/3d-gallery'

function ProjectsGallery() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Unified Background with radial gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,#233554_0%,#0a192f_50%,#020c1b_100%)] -z-10"></div>
      
      {/* Back to Home Button */}
      <Link 
        to="/"
        className="fixed top-8 right-8 z-50 px-6 py-3 border-2 border-[#64FFDA] text-[#64FFDA] font-medium text-sm tracking-wide uppercase bg-[#0a192f]/80 backdrop-blur-sm hover:bg-[#64FFDA] hover:text-[#0a192f] transition-all duration-300 rounded-lg"
      >
        ← Back to Home
      </Link>
      
      {/* Content */}
      <div className="relative z-0">
        <Gallery3D />
      </div>
    </div>
  )
}

export default ProjectsGallery
