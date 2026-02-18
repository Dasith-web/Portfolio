import { useState, useEffect, useRef } from 'react'
import { saveAs } from 'file-saver'
import { 
  Github, Twitter, Linkedin, Instagram, Mail, 
  Sun, Moon, ExternalLink, Code, Palette,
  Server, Database, Cpu, Zap, ChevronDown,
  Download, Award, Calendar, FileText, BookOpen,
  GraduationCap, MapPin, Briefcase
} from 'lucide-react'
import './App.css'
import profileImg from './assets/dasith.jpg'
import se from "../src/assets/images/software-engineering.png";
import da from "../src/assets/images/data-analytics-foundations.png";
import qa from "../src/assets/images/software-qa.png";
import cs from "../src/assets/images/cloud-computing.png";
import as from "../src/assets/images/applied-statistics.png";





function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef(null)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(prefersDark)
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      sections.forEach(section => {
        const sectionTop = section.offsetTop
        if (window.scrollY >= sectionTop - 100) {
          setActiveSection(section.getAttribute('id'))
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    
    // Initialize 3D background
    init3DBackground()
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const init3DBackground = () => {
    // This would be replaced with actual Three.js code in a real implementation
    // For now, we'll use a CSS-based 3D effect
    console.log("3D background initialized")
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

const downloadCV = async () => {
  const url = './Dasith_Kavishalya_CV_(1).pdf'; // public/Dasith_Kavishalya_CV.pdf

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch CV: ${res.status} ${res.statusText}`);

    const blob = await res.blob();
    saveAs(blob, 'Dasith_Kavishalya_CV.pdf'); // file-saver
  } catch (err) {
    console.error('Error downloading CV:', err);

    // Fallback: create an anchor to trigger native download / open in new tab
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Dasith_Kavishalya_CV.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Last-resort: open the PDF in a new tab so the user can manually save it
    setTimeout(() => window.open(url, '_blank', 'noopener,noreferrer'), 150);
  }
}


  // Loading screen component
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 animate-bounce"></div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Loading Portfolio...
          </h2>
        </div>
      </div>
    )
  }

  // 3D Animated Background Component
  const ThreeDBackground = () => (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Animated 3D shapes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 dark:bg-blue-600 rounded-full opacity-10 animate-float-3d" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500 dark:bg-purple-600 rounded-full opacity-10 animate-float-3d-reverse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-500 dark:bg-green-600 rounded-lg opacity-10 animate-float-3d" style={{ animationDelay: '2s', transform: 'rotate(45deg)' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-yellow-500 dark:bg-yellow-600 opacity-10 animate-float-3d-reverse" style={{ animationDelay: '1.5s', transform: 'rotate(30deg)' }}></div>
        
        {/* Animated grid for 3D effect */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 animate-pan"></div>
      </div>
    </div>
  )

  // Navigation component
  const Navigation = () => (
    <nav className="fixed w-full z-30 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href={profileImg} className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dasith Kavishalya
        </a>
        
        <div className="hidden md:flex space-x-8">
          {['home', 'about', 'education', 'skills', 'projects', 'certifications', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`capitalize transition-all duration-300 ${activeSection === item 
                ? 'text-blue-600 dark:text-blue-400 font-medium scale-105' 
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105'}`}
            >
              {item}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={downloadCV}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Download size={16} />
            Download CV
          </button>
          
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  )

  // Hero section component
  const HeroSection = () => (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      <ThreeDBackground />
      
<div className="container mx-auto px-6 py-20 text-center relative z-10">
  <div className="max-w-3xl mx-auto transform transition-all duration-700 hover:scale-105">
    <div className="mb-8 animate-float">
      <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 shadow-2xl transform-style-3d">
        <img 
          src={profileImg}
          alt="Dasith Kavishalya" 
          className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-900"
        />
      </div>
    </div>
    
    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
      Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dasith Kavishalya</span>
    </h1>
    <p className="text-xl md:text-2xl mb-8 opacity-80 animate-fade-in-up delay-100">
      An aspiring <span className="font-semibold">Full Stack Developer</span> passionate about 
      <span className="font-semibold"> Backend</span>, 
      <span className="font-semibold"> Frontend</span>, 
      <span className="font-semibold"> DevOps</span>, 
      <span className="font-semibold"> Data Analysis</span>, and 
      <span className="font-semibold"> Cloud Computing</span>.
    </p>
    <div className="flex justify-center space-x-4 animate-fade-in-up delay-200">
      <button 
        onClick={() => scrollToSection('projects')}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        <Code size={18} />
        View My Work
      </button>
      <button 
        onClick={downloadCV}
        className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-xl"
      >
        <FileText size={18} />
        Download CV
      </button>
    </div>
  </div>


        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => scrollToSection('about')}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all transform-style-3d"
            aria-label="Scroll down"
          >
            <ChevronDown size={24} />
          </button>
        </div>
      </div>
    </section>
  )

  // About section component
 const AboutSection = () => (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">About Me</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 animate-fade-in-left transform-style-3d">
            <div className="rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-3d">
              <img 
                src={profileImg} 
                alt="Dasith Kavishalya" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3 animate-fade-in-right">
            <p className="text-lg mb-6 leading-relaxed">
              I'm a passionate <span className="font-semibold text-blue-600 dark:text-blue-400">3rd year IT undergraduate</span> with strong foundation in full-stack development and emerging technologies. 
              Currently expanding my expertise in MERN stack, mobile development, and data analytics through academic projects and self-learning.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              My technical journey combines <span className="font-semibold text-purple-600 dark:text-purple-400">academic knowledge</span> with practical application, focusing on creating efficient and scalable solutions. 
              I'm enthusiastic about exploring new technologies and building innovative projects that solve real-world problems.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {['MERN Stack', 'Spring Boot', 'React Native', 'Flutter', 'Data Analytics', 'JavaScript', 'TypeScript', 'MongoDB', 'Express.js', 'Node.js', 'Python', 'Java'].map((skill) => (
                <div key={skill} className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center gap-2 transition-all hover:scale-105 transform-style-3d">
                  <Zap size={14} className="text-blue-600 dark:text-blue-400" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={downloadCV}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Download size={18} />
              Download My CV
            </button>
          </div>
        </div>
      </div>
    </section>
);
  

  // Education section component
  const EducationSection = () => (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Education</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900/50"></div>
            
            {/* Timeline items */}
            {[
              {
                id: 1,
                degree: "BSc (Hons) in Information Technology",
                institution: "SLIIT",
                period: "2022 - 2026",
                location: "Sri Lanka",
                description: "Specialized in web development, software architecture, and user experience design. Undergraduate",
                icon: <GraduationCap className="text-blue-600 dark:text-blue-400" />
              },
              {
                id: 2,
                degree: "Technology stream",
                institution: "C.W.W.Kannangara Central College",
                period: "2019 - 2021",
                location: "Mathugama, Sri Lanka",
                description: "The Technology stream builds core skills in programming, software development, and modern IT practices.",
                icon: <BookOpen className="text-purple-600 dark:text-purple-400" />
              }
            ].map((edu, index) => (
              <div 
                key={edu.id} 
                className={`mb-8 flex ${index % 2 === 0 ? 'flex-row-reverse' : ''} justify-between items-center w-full transform-style-3d`}
              >
                <div className="order-1 w-5/12"></div>
                <div className="z-10 flex items-center order-1 bg-blue-600 dark:bg-blue-800 shadow-xl w-8 h-8 rounded-full">
                  <div className="mx-auto text-white">
                    {edu.icon}
                  </div>
                </div>
                <div 
                  className={`order-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-5/12 p-6 transform transition-all duration-500 hover:scale-105 hover:rotate-3d ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
                >
                  <h3 className="font-bold text-lg mb-1">{edu.degree}</h3>
                  <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-2">{edu.institution}</h4>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <Calendar size={14} className="mr-1" />
                    {edu.period}
                    <MapPin size={14} className="ml-3 mr-1" />
                    {edu.location}
                  </div>
                  <p className="text-sm leading-tight">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )

  // Skills section component
  const SkillsSection = () => (
    <section id="skills" className="py-20 relative bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Skills</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: 'React', level: 90, icon: <Cpu size={24} className="text-blue-600 dark:text-blue-400" /> },
            { name: 'JavaScript', level: 85, icon: <Code size={24} className="text-yellow-500" /> },
            { name: 'TypeScript', level: 80, icon: <Code size={24} className="text-blue-500" /> },
            { name: 'HTML/CSS', level: 95, icon: <Palette size={24} className="text-pink-500" /> },
            { name: 'Node.js', level: 75, icon: <Server size={24} className="text-green-600" /> },
            { name: 'UI/UX Design', level: 70, icon: <Palette size={24} className="text-purple-500" /> },
            { name: 'Git', level: 85, icon: <Github size={24} className="text-gray-800 dark:text-gray-200" /> },
            { name: 'Three.js', level: 65, icon: <Cpu size={24} className="text-blue-700" /> }
          ].map((skill, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 transform-style-3d animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                {skill.icon}
              </div>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeDasharray={`${skill.level}, 100`}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{skill.level}%</span>
                </div>
              </div>
              <h3 className="text-lg font-medium">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  // Projects section component
  const ProjectsSection = () => (
  <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 relative">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Projects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { 
            id: 1, 
            title: "Gym Management System", 
            description: "A comprehensive gym management solution built with MERN stack for managing memberships, workouts, payments, and trainer schedules",
            tags: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Stripe"],
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            liveDemo: "https://github.com/Dasith-web/Gym-Management-System", // Add your live demo link
            github: "https://github.com/Dasith-web/Gym-Management-System" // Add your GitHub link
          },
          { 
            id: 2, 
            title: "Japan Panthiya", 
            description: "E-learning platform similar to Coursera where teachers can upload videos, create quizzes, and manage courses with Spring Boot backend",
            tags: ["Spring Boot", "Java", "MySQL", "React", "JWT", "AWS S3"],
            image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            liveDemo: "https://github.com/Dasith-web/Japan_Panthiya", // Add your live demo link
            github: "https://github.com/Dasith-web/Japan_Panthiya"
          },
          { 
            id: 3, 
            title: "Cook Hub", 
            description: "Food recipe application with user-generated content, recipe sharing, and meal planning features built with Spring Boot",
            tags: ["Spring Boot", "Java", "PostgreSQL", "Thymeleaf", "Bootstrap"],
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
            liveDemo: "https://github.com/Dasith-web/Cook_Hub-FoodApp", // Add your live demo link
            github: "https://github.com/Dasith-web/Cook_Hub-FoodApp"
          },
          { 
            id: 4, 
            title: "Travel Planning System", 
            description: "Complete travel planning platform with itinerary management, booking system, and destination recommendations using MERN stack",
            tags: ["MongoDB", "Express.js", "React", "Node.js", "REST API", "Map Integration"],
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1035&q=80",
            liveDemo: "https://github.com/Dasith-web/Travel-Planning-System-", // Add your live demo link
            github: "https://github.com/Dasith-web/Travel-Planning-System-"
          },
          { 
            id: 5, 
            title: "Book Store", 
            description: "E-commerce platform for books with user authentication, shopping cart, order management, and payment integration",
            tags: ["MongoDB", "Express.js", "React", "Node.js", "Redux", "PayPal API"],
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            liveDemo: "https://github.com/Dasith-web/Book-Store", // Add your live demo link
            github: "https://github.com/Dasith-web/Book-Store"
          },
          { 
            id: 6, 
            title: "Presentation Scheduling App", 
            description: "Mobile application for scheduling and managing presentations with calendar integration and notification system",
            tags: ["React Native", "Firebase", "Redux", "Node.js", "Push Notifications"],
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            liveDemo: "https://github.com/Dasith-web/Presentation-Scheduling-MobileApp", // Add your live demo link (or app store link)
            github: "https://github.com/Dasith-web/Presentation-Scheduling-MobileApp"
          }
        ].map((project, index) => (
          <div 
            key={project.id} 
            className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-500 hover:scale-105 hover:shadow-2xl transform-style-3d animate-fade-in-up group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-xl font-bold">{project.title}</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
              <p className="mb-4 opacity-80 text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a 
                  href={project.liveDemo} 
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 transition-transform hover:scale-105"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  {project.title.includes("Mobile App") ? "View App" : "Live Demo"}
                </a>
                <a 
                  href={project.github} 
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1 transition-transform hover:scale-105"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
  // Certifications section component
  const CertificationsSection = () => (
    <section id="certifications" className="py-20 bg-white dark:bg-gray-800 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Certifications</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            
            { 
    id: 1, 
    title: "Introduction to Software Engineering", 
    issuer: "IBM", 
    date: "Aug 20, 2025", 
    description: "Foundational knowledge of the software development lifecycle (SDLC), Agile methodologies, and software engineering tools.",
    image: se, // Replace with your file path
  },
            { 
    id: 2, 
    title: "Introduction to Cloud Computing", 
    issuer: "IBM", 
    date: "Sep 9, 2025", 
    description: "Understanding of cloud service models (IaaS, PaaS, SaaS), deployment strategies, and core cloud infrastructure concepts.",
    image: cs,// Replace with your file path
  },
           { 
    id: 3, 
    title: "Introduction to Software Quality Assurance", 
    issuer: "Board Infinity", 
    date: "Jan 20, 2026", 
    description: "Comprehensive training in software testing, defect management, and ensuring high-quality software delivery.",
    image: qa, // Replace with your file path
  },
{ 
    id: 4, 
    title: "Data Analytics Foundations", 
    issuer: "DeepLearning.AI", 
    date: "Oct 9, 2025", 
    description: "Core principles of data analysis, including data collection, cleaning, and basic analytical techniques.",
    image: da, // Replace with your file path
  },
  { 
    id: 5, 
    title: "Applied Statistics for Data Analytics", 
    issuer: "DeepLearning.AI", 
    date: "Nov 1, 2025", 
    description: "Application of statistical methods to analyze data sets and derive meaningful insights for business decisions.",
    image: as, // Replace with your file path
  }
          
          ].map((cert, index) => (
            <div 
              key={cert.id} 
              className="rounded-2xl overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-900 transition-all duration-500 hover:scale-105 hover:shadow-2xl transform-style-3d animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Award size={16} className="inline mr-1" />
                  Certified
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <Calendar size={14} className="mr-1" />
                  {cert.date}
                </div>
                <p className="mb-4 opacity-80 text-sm">{cert.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{cert.issuer}</span>
                  <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1 text-sm transition-transform hover:scale-105">
                    View Credential
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  // Contact section component
  const ContactSection = () => (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Get In Touch</span>
        </h2>
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transform-style-3d animate-fade-in-up">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform-style-3d"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform-style-3d"
                placeholder="Your email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium">Message</label>
              <textarea 
                id="message" 
                rows="5"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform-style-3d"
                placeholder="Your message"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform-style-3d"
            >
              <Mail size={18} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )

  // Footer component
  const Footer = () => (
    <footer className="py-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          {[
            { icon: <Github size={20} />, name: 'github', url: '#' },
            { icon: <Twitter size={20} />, name: 'twitter', url: '#' },
            { icon: <Linkedin size={20} />, name: 'linkedin', url: '#' },
            { icon: <Instagram size={20} />, name: 'instagram', url: '#' }
          ].map((social) => (
            <a 
              key={social.name}
              href={social.url} 
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 shadow-sm transform-style-3d"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
        <button 
          onClick={downloadCV}
          className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto transform-style-3d"
        >
          <Download size={18} />
          Download My CV
        </button>
        <p className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Dasith Kavishalya. All rights reserved.
        </p>
      </div>
    </footer>
  )

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App