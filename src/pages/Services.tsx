import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import AreaFilter from "@/components/AreaFilter";
import PaymentMethods from "@/components/PaymentMethods";
import ServiceCategories from "@/components/ServiceCategories";
const Services = () => {
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Get services from localStorage (added by providers)
  const [providerServices, setProviderServices] = useState<any[]>([]);
  useEffect(() => {
    const savedServices = localStorage.getItem('providerServices');
    if (savedServices) {
      setProviderServices(JSON.parse(savedServices));
    }
  }, []);

  // Sample default services data
  const defaultServices = [{
    id: 1,
    name: "Basic House Cleaning",
    provider: "CleanPro Services",
    price: "PKR 2,000",
    originalPrice: "PKR 2,500",
    rating: 4.8,
    reviews: 125,
    duration: "2-3 hours",
    category: "cleaning",
    area: "DHA",
    description: "Complete house cleaning including dusting, mopping, and bathroom cleaning"
  }, {
    id: 2,
    name: "Deep Cleaning Service",
    provider: "Sparkle Clean",
    price: "PKR 4,500",
    originalPrice: "PKR 5,000",
    rating: 4.9,
    reviews: 89,
    duration: "4-5 hours",
    category: "cleaning",
    area: "Gulshan",
    description: "Comprehensive deep cleaning with kitchen appliances and carpet cleaning"
  }, {
    id: 3,
    name: "AC Repair & Service",
    provider: "Cool Tech",
    price: "PKR 2,500",
    rating: 4.8,
    reviews: 134,
    duration: "2-3 hours",
    category: "appliance",
    area: "Clifton",
    description: "AC repair, gas refilling, and general maintenance"
  }, {
    id: 4,
    name: "Interior Wall Painting",
    provider: "Paint Masters",
    price: "PKR 15,000",
    rating: 4.8,
    reviews: 45,
    duration: "2-3 days",
    category: "painting",
    area: "DHA",
    description: "Complete interior painting with premium quality paint"
  }];

  // Combine default services with provider services
  const allServices = [...defaultServices, ...providerServices];

  // Filter services based on selected filters
  const filteredServices = allServices.filter(service => {
    if (selectedArea && service.area && !service.area.toLowerCase().includes(selectedArea.toLowerCase())) return false;
    if (selectedCategory && service.category !== selectedCategory) return false;
    return true;
  });
  const handleBookService = (serviceId: number, category: string) => {
    navigate(`/services/${category}/${serviceId}`);
  };
  return <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Services</h1>
          <p className="text-muted-foreground">Browse all available services from verified professionals</p>
        </div>

        {/* Service Categories Section */}
        <div className="mb-8">
          <ServiceCategories />
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <AreaFilter onAreaChange={setSelectedArea} />
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Services Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map(service => <Card key={service.id} className="group hover:shadow-hover transition-shadow cursor-pointer">
                  <div className="aspect-video bg-muted rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{service.provider}</p>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{service.rating}</span>
                          <span className="text-muted-foreground">({service.reviews || 0})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{service.duration}</span>
                        </div>
                        {service.area && <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{service.area}</span>
                          </div>}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">{service.price}</span>
                          {service.originalPrice && <span className="text-sm text-muted-foreground line-through">
                              {service.originalPrice}
                            </span>}
                        </div>
                        <Button size="sm" onClick={() => handleBookService(service.id, service.category)}>
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>

          {/* Payment Methods Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <PaymentMethods />
            </div>
          </div>
        </div>

        {/* Load More */}
        <div className="mt-8 flex justify-center">
          <Button variant="outline" size="lg">
            Load More Services
          </Button>
        </div>
      </div>
    </div>;
};
export default Services;