import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  Paintbrush, 
  Zap, 
  Wrench, 
  Shirt, 
  Scissors,
  Truck,
  Car,
  Printer,
  Hammer,
  ShirtIcon,
  ChefHat,
  Droplets,
  Settings
} from "lucide-react";

const ServiceCategories = () => {
  const navigate = useNavigate();
  
  const categories = [
    {
      id: 1,
      name: "Cleaning Services",
      icon: Sparkles,
      description: "House, office & deep cleaning",
      services: "50+ services",
      slug: "cleaning"
    },
    {
      id: 2,
      name: "House Painting",
      icon: Paintbrush,
      description: "Interior & exterior painting",
      services: "25+ services",
      slug: "painting"
    },
    {
      id: 3,
      name: "Electrician",
      icon: Zap,
      description: "Electrical repairs & installation",
      services: "30+ services",
      slug: "electrician"
    },
    {
      id: 4,
      name: "Home Appliance Repair",
      icon: Wrench,
      description: "AC, fridge, washing machine",
      services: "40+ services",
      slug: "appliance"
    },
    {
      id: 5,
      name: "Laundry Service",
      icon: Shirt,
      description: "Wash, dry & iron services",
      services: "15+ services"
    },
    {
      id: 6,
      name: "Beauty & Salon",
      icon: Scissors,
      description: "Hair, makeup & spa at home",
      services: "60+ services"
    },
    {
      id: 7,
      name: "Moving & Shifting",
      icon: Truck,
      description: "Home & office relocation",
      services: "20+ services"
    },
    {
      id: 8,
      name: "Car Services",
      icon: Car,
      description: "Wash, repair & maintenance",
      services: "35+ services"
    },
    {
      id: 9,
      name: "Printing Services",
      icon: Printer,
      description: "Print, photocopy & binding",
      services: "25+ services"
    },
    {
      id: 10,
      name: "Home Renovation",
      icon: Hammer,
      description: "Complete home makeover",
      services: "45+ services",
      slug: "renovation"
    },
    {
      id: 11,
      name: "Tailor & Alteration",
      icon: ShirtIcon,
      description: "Clothing repair & tailoring",
      services: "30+ services",
      slug: "tailor"
    },
    {
      id: 12,
      name: "Cooking Service",
      icon: ChefHat,
      description: "Home cooking & catering",
      services: "25+ services",
      slug: "cooking"
    },
    {
      id: 13,
      name: "Water Tanker",
      icon: Droplets,
      description: "Water supply & delivery",
      services: "15+ services",
      slug: "water"
    },
    {
      id: 14,
      name: "Plumbing Service",
      icon: Settings,
      description: "Pipe repair & installation",
      services: "35+ services",
      slug: "plumbing"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Our Service Categories
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose from our wide range of professional services. All providers are verified and rated by customers.
            </p>
          </div>
        </div>
        
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id} 
                className="group cursor-pointer transition-all duration-300 hover:shadow-hover hover:-translate-y-1 bg-gradient-card border-0"
              >
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-white group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                    <p className="text-xs text-primary font-medium">{category.services}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                    onClick={() => navigate(`/services/${category.slug}`)}
                  >
                    View Services
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default ServiceCategories;