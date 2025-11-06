import { Button } from "@/components/ui/button";
import { MapPin, Play } from "lucide-react";
import heroImage from "@/assets/hero-worship.jpg";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Culto de adoração CB Atos 29"
          className="w-full h-full object-cover"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Uma igreja para viver o Evangelho{" "}
            <span className="text-white/90">todos os dias</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Comunhão, ensino e missão — venha fazer parte da CB Atos 29
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 shadow-strong"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Visite-nos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-primary hover:bg-white/10 text-lg px-8"
            >
              <Play className="mr-2 h-5 w-5" />
              Assista Online
            </Button>
          </div>

          <div className="pt-12 text-white/80">
            <p className="text-lg mb-2">Cultos aos domingos</p>
            <p className="text-3xl font-semibold">10:45, 17h00 e 19h30</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
