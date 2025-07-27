import { RevealOnScroll } from "../RevealOnScroll";

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
    >
      {/* <RevealOnScroll> */}
      <div className="px-4 py-16 sm:px-6 lg:px-8 text-center z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-tight">
          Hi, I'm a Web Developer
        </h1>

        <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          I’m a passionate Web Developer with over <strong>2+ years</strong> of
          experience crafting custom websites and delivering successful
          freelance projects. My goal is to build solutions that offer both
          exceptional performance and a delightful user experience.
        </p>

        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/swapnilk06/Web-Developer-Portfolio"
            target="_blank"
            className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.4)]"
          >
            View Projects
          </a>

          <a
            href="https://www.linkedin.com/in/swapnilk06/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
          >
            Contact Me
          </a>
        </div>
      </div>
      {/* </RevealOnScroll> */}
    </section>
  );
};
