import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Navbar from "@/components/Navbar";
import Model from "@/components/Model";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar/> 
      <Hero/> 
      <Highlights/>
      <Model />
      <Features/>
      <HowItWorks/>
      <Footer/>
    </main>
  );
}
