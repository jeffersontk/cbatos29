import AboutSection from "@/components/home/AboutSection";
import CellsSection from "@/components/home/CellsSection";
import EBDSection from "@/components/home/EBDSection";
import EventsSection from "@/components/home/EventsSection";
import HeroSection from "@/components/home/HeroSection";
import MinistriesSection from "@/components/home/MinistriesSection";
import OfferingsSection from "@/components/home/OfferingsSection";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";


export default function Home() {
   return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <EBDSection />
        <CellsSection />
        <EventsSection />
        <MinistriesSection />
        <OfferingsSection />
      </main>
      <Footer />
    </div>
  );
}
