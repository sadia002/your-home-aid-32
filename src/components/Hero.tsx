import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-services.jpg";
import AreaFilter from "./AreaFilter";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                Professional Home Services
                <span className="text-secondary"> at Your Doorstep</span>
              </h1>
              <p className="max-w-[600px] text-white/90 md:text-xl">
                Connect with trusted service providers for all your home needs. From cleaning to repairs, 
                we've got you covered with verified professionals in your area.
              </p>
            </div>
            
            <div className="w-full max-w-lg space-y-2">
              <p className="text-xs text-white/70">
                Discover professional home services in your area
              </p>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-hover"
                onClick={() => navigate('/services')}
              >
                Browse Services
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                onClick={() => navigate('/provider')}
              >
                Become a Provider
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <img
              src={heroImage}
              alt="Home Services"
              className="aspect-[4/3] overflow-hidden rounded-xl object-cover shadow-strong animate-fade-in"
            />
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-secondary/20" />
      <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
    </section>
  );
};

export default Hero;