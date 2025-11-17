"use client"

import type React from "react"
import type * as THREE from "three"
import { useEffect, useRef, useState } from "react"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { useCursor, CameraControls, Preload, Html } from "@react-three/drei"
import { easing, geometry } from "maath"

extend(geometry)

interface Project {
  id: string
  title: string
  description: string
  category: string
  gradient: string
  accentColor: string
  bg: string
  position: [number, number, number]
  rotation: [number, number, number]
  url?: string
}

interface FrameProps extends Project {
  width?: number
  height?: number
  children?: React.ReactNode
}

function CardContent({ project }: { project: Project }) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-8">
      {/* Category Badge */}
      <div>
        <span
          className="inline-block px-3 py-1 text-xs font-medium rounded-full border"
          style={{
            borderColor: project.accentColor,
            color: project.accentColor,
            background: `${project.accentColor}15`,
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Title & Description */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-white text-2xl font-bold mb-4" style={{ color: "white" }}>
          {project.title}
        </h3>
        <p className="text-opacity-70 text-sm leading-relaxed" style={{ color: project.accentColor }}>
          {project.description}
        </p>
      </div>

      {/* Footer with Icon */}
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-medium p-2 tracking-widest" style={{ color: project.accentColor }}>
          DOUBLE CLICK TO VIEW PROJECT
        </div>
      </div>
    </div>
  )
}

function Frame({ id, bg, width = 1, height = 1.618, children, position, rotation, url, ...project }: FrameProps & Project) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, hover] = useState(false)

  useCursor(hovered)

  useFrame((state, dt) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      easing.damp(material, "emissiveIntensity", hovered ? 0.5 : 0.1, 0.2, dt)
    }
  })

  const handleDoubleClick = () => {
    if (url) {
      window.open(url, '_blank')
    }
  }

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation()
        hover(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        hover(false)
      }}
      onDoubleClick={handleDoubleClick}
    >
      <mesh ref={meshRef}>
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <meshStandardMaterial
          color={project.accentColor}
          emissive={project.accentColor}
          emissiveIntensity={0.1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Card content in 3D space */}
      <Html scale={0.165} position={[0, 0, 0.01]} transform occlude zIndexRange={[0, 0]} pointerEvents="none">
        <div
          className="w-[280px] h-[452px] rounded-2xl overflow-hidden pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${bg}, ${project.accentColor}20)`,
            border: `2px solid ${project.accentColor}`,
            boxShadow: `0 0 40px ${project.accentColor}40`,
          }}
        >
          <CardContent project={project as Project} />
        </div>
      </Html>
    </group>
  )
}

function Rig() {
  const { controls } = useThree()
  useEffect(() => {
    if (controls) controls.setLookAt(0, 0, 3, 0, 0, 0, true)
  }, [controls])
  return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
}

function GalleryScene({ projects }: { projects: Project[] }) {
  return (
    <>
      <color attach="background" args={["#0a192f"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={1.2} />

      {projects.map((project) => (
        <Frame key={project.id} {...project} width={1} height={1.618} />
      ))}

      <Rig />
      <Preload all />
    </>
  )
}

export default function Gallery3D() {
  const projects: Project[] = [
    {
      id: "project-1",
      title: "3D Furniture Configurator",
      description:
        "An interactive 3D furniture configurator allowing dynamic customization of chairs and tables through real-time controls for color, layout, and design",
      category: "React Three Fiber",
      gradient: "from-cyan-500/10 to-cyan-600/5",
      accentColor: "#64FFDA",
      bg: "#0a192f",
      position: [-1.25, 0, 0],
      rotation: [0, 0.5, 0],
      url: "https://furniture-configurator-eta.vercel.app/"
    },
    {
      id: "project-2",
      title: "Gym Web App",
      description:
        "Built MERN stack fitness web app as a personal project with service showcase and real-time client inquiry system via email integration. ",
      category: "MERN",
      gradient: "from-blue-500/10 to-blue-600/5",
      accentColor: "#61DAFB",
      bg: "#0a192f",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      url: "https://mern-gym-five.vercel.app/"
    },
    {
      id: "project-3",
      title: "Animations and Effects",
      description:
        "A React app that integrates a persistent 3D canvas with layered 2D content to deliver immersive, scroll-driven experiences. It showacases 2D and 3D objects in a synchornized timeline to display smooth animations",
      category: "GSAP & React Three Fiber",
      gradient: "from-purple-500/10 to-purple-600/5",
      accentColor: "#C084FC",
      bg: "#0a192f",
      position: [1.25, 0, 0],
      rotation: [0, -0.5, 0],
      url: "https://gsap-rho-eight.vercel.app/"
    },
    {
      id: "project-4",
      title: " 3D Maze Navigation game",
      description:
        " A logic building a logic-focused 3D maze game with dynamic maze generation, player movement, and collision detection using Three.js",
      category: "WebGL & Three.js",
      gradient: "from-pink-500/10 to-pink-600/5",
      accentColor: "#EC4899",
      bg: "#0a192f",
      position: [-2.75, 0, 0],
      rotation: [0, 0.5, 0],
      url: "https://maze-gamma-nine.vercel.app/"
    },
    {
      id: "project-6",
      title: "Restaurant Web App",
      description:
        "A full-stack restaurant website with reservation system, automatically storing bookings in MongoDB database.",
      category: "Backend",
      gradient: "from-orange-500/10 to-orange-600/5",
      accentColor: "#F97316",
      bg: "#0a192f",
      position: [2.75, 0, 0],
      rotation: [0, -0.5, 0],
      url: "https://mern-food-jkx1.vercel.app/"
    },
  ]

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden">
      {/* Instructional Text */}
      <div className="absolute top-8 left-8 z-30 pointer-events-none">
        <p className="text-[#64FFDA] text-sm font-medium tracking-wide">
          Drag and hop around. You can move it's 3D
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#64FFDA] opacity-[0.015] rounded-full blur-[500px] animate-pulse"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#64FFDA] opacity-[0.015] rounded-full blur-[500px] animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#64FFDA] opacity-[0.015] rounded-full blur-[500px] animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <Canvas flat camera={{ fov: 75, position: [0, 0, 20] }} className="relative z-10">
        <GalleryScene projects={projects} />
      </Canvas>
    </div>
  )
}
