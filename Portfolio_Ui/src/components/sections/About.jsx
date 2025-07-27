export const About = () => {
  const coreSkills = [
    "HTML",
    "CSS",
    "JavaScript",
    "WordPress",
    "Elementor",
    "PHP (basic)",
    "Custom CSS/JS",
    "Figma to WordPress",
    "Responsive Design",
    "API Integration",
    "Theme Customization",
  ];

  const WebTools = [
    "Yoast SEO",
    "Website Performance Optimization",
    "Security Plugins",
    "WooCommerce",
    "Git & GitHub",
    "Hostinger",
    "UI/UX Concepts",
    "Backup & Maintenance",
  ];

  return (
    <section
      id="about"
      className="min-h-screen py-20 flex items-center justify-center"
    >
      <div className="max-w-6xl w-full mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className=" backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/10 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all">
          <p className="text-gray-300 text-lg mb-8 text-center leading-relaxed">
            I'm always eager to learn and contribute to{" "}
            <strong>collaborative development environments</strong>, and I take
            pride in turning designs (Figma) into{" "}
            <strong>fully responsive, high-performing websites</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Core Skills */}
            <div className="bg-white/5 p-6 rounded-xl hover:-translate-y-1 transition duration-300">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">
                🔧 Core Web Dev Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {coreSkills.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-500/10 text-blue-400 py-1 px-4 rounded-full text-sm hover:bg-blue-500/20 hover:shadow transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Optimization & Tools */}
            <div className="bg-white/5 p-6 rounded-xl hover:-translate-y-1 transition duration-300">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">
                ⚙️ Web Optimization & Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {WebTools.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-500/10 text-blue-400 py-1 px-4 rounded-full text-sm hover:bg-blue-500/20 hover:shadow transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Education */}
          <div className="p-6  rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              📚 Education
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 text-base">
              <li>
                <strong>B.Sc in Computer Science</strong> – Savitribai Phule,
                Pune University (2017–2020)
              </li>
              <li>
                <strong>Self-learning</strong>: Full Stack Development, GenAI,
                Data Science, and emerging web technologies.
              </li>
            </ul>
          </div>

          {/* Work Experience */}
          <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              💼 Work Experience
            </h3>
            <div className="space-y-4 text-gray-300 text-base">
              <div>
                <h4 className="font-semibold text-white">
                  Web Developer – Valourithm Technologies (2024 – Present)
                </h4>
                <p>
                  Managing full website lifecycle from Figma to WordPress.
                  Focused on updates, testing, and SEO/performance optimization.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white">
                  Freelance Web Developer (2022 – 2023)
                </h4>
                <p>
                  Delivered scalable websites using WordPress, Elementor, and
                  custom CSS, with SEO integration and client-focused design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
