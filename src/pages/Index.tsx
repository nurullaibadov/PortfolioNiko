import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import PremiumEffects from "@/components/portfolio/PremiumEffects";
import ScrollToTop from "@/components/portfolio/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background cursor-none overflow-x-hidden noise-bg">
      <PremiumEffects />
      <ScrollToTop />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
