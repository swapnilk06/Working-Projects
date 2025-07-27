import { useEffect, useState } from "react";

const projectData = [
  {
    title: "Valourithm Technologies",
    description:
      "Company website for a tech firm developed from Figma to WordPress.",
    tasks: [
      "Fully responsive build with custom CSS & JavaScript.",
      "Integrated SEO, blog, WP job opening career plugin, and project showcase features.",
    ],
    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "WordPress",
      "SEO",
      "Blog",
      "Job Portal",
    ],
    link: "https://valourithm.com/",
  },
  {
    title: "Garje Solar",
    description:
      "A clean, figma-based static website with job portal features.",
    tasks: [
      "Built using Elementor + Yoast SEO + security related plugin.",
      "Integrated career plugin for job listings.",
    ],
    tech: ["Elementor", "SEO", "Yoast", "WordPress", "Job Portal", "Static"],
    link: "https://garjesolar.in/",
  },
  {
    title: "Synvision Chemicals",
    description: "A minimal, professional site for a chemical company.",
    tasks: [
      "Lightweight, no-heavy animations.",
      "SEO-optimized and performance-focused.",
    ],
    tech: ["WordPress", "SEO", "Minimal UI", "Static"],
    link: "https://synvisionchem.com/",
  },
  {
    title: "GoSrushti",
    description: "Product showcase website for a local dairy brand.",
    tasks: [
      "Custom UI and pop-up contact form to drive leads.",
      "Animated visuals and large form for new users.",
    ],
    tech: ["Elementor", "Popup", "WordPress", "Animation", "Contact Form"],
    link: "https://www.gosrushti.in/",
  },
  {
    title: "Genesys Lasers",
    description:
      "An interactive and animated site to promote laser machine products.",
    tasks: ["Animation-heavy WordPress site to boost engagement."],
    tech: ["WordPress", "Animation", "Scratch design"],
    link: "https://genesyslasers.co.in/",
  },
  {
    title: "EasyToConnect",
    description: "A custom concept UI-based website built from scratch.",
    tasks: [
      "Entire UI imagined and developed from client ideas.",
      "Showcases real-world applications of their idea.",
    ],
    tech: ["WordPress", "Custom UI", "Animation", "Contact Form"],
    link: "https://github.com/swapnilk06/Web-Developer-Portfolio/",
  },
  {
    title: "StartEarn India",
    description:
      "A blog platform with user restrictions and verification flow.",
    tasks: [
      "Implemented copy protection, verified login flow.",
      "50+ active users contributing content.",
    ],
    tech: ["Blog", "User Auth", "SEO", "WordPress"],
    link: "https://github.com/swapnilk06/Web-Developer-Portfolio/",
  },
  {
    title: "Satyam Enterprises",
    description: "A lightweight product listing site (2–3 pages).",
    tasks: ["Minimal design with fast load time, no extra animations."],
    tech: ["HTML", "CSS", "Static"],
    link: "https://github.com/swapnilk06/Web-Developer-Portfolio/",
  },
  {
    title: "Firefront Creative",
    description: "A dark-themed, Figma-to-WordPress portfolio site.",
    tasks: [
      "Used free template with heavy animations.",
      "Focused on high interactivity and creative layout.",
    ],
    tech: ["WordPress", "Dark Theme", "Animation", "Static"],
    link: "https://github.com/swapnilk06/Web-Developer-Portfolio/",
  },
  {
    title: "Fort Intellect",
    description: "Simple portfolio website for a startup.",
    tasks: ["Built clean UI to showcase portfolio projects."],
    tech: ["HTML", "CSS", "Portfolio"],
    link: "https://github.com/swapnilk06/Web-Developer-Portfolio/",
  },
];

export const Projects = () => {
  const [visibleCount, setVisibleCount] = useState(4); // Show 2 initially

  const handleScroll = () => {
    const scrollBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (scrollBottom && visibleCount < projectData.length) {
      setVisibleCount((prev) => prev + 2); // Load 2 more
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount]);

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="max-w-6xl mx-auto px-4 w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectData.slice(0, visibleCount).map((project, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all"
            >
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <ul className="text-sm text-gray-300 mb-4 list-disc pl-5">
                {project.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                View Project ➜
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
