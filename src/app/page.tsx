import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProfessionalIdentity from "@/components/ProfessionalIdentity";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between overflow-hidden">
      <Navbar />
      <Hero />
      <ProfessionalIdentity />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Certifications />
      <Resume />
      <Contact />
      <Footer />
    </main>
  );
}
