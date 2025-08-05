import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin, Users } from "lucide-react";
import Header from "@/components/Header";
import AreaFilter from "@/components/AreaFilter";
import PaymentMethods from "@/components/PaymentMethods";
const ServiceCategory = () => {
  const {
    category
  } = useParams();
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [providerServices, setProviderServices] = useState<any[]>([]);

  // Load provider services from localStorage
  useEffect(() => {
    const savedServices = localStorage.getItem('providerServices');
    if (savedServices) {
      setProviderServices(JSON.parse(savedServices));
    }
  }, []);

  const servicesData: Record<string, any[]> = {
    "cleaning": [{
      id: 101,
      name: "Basic House Cleaning",
      provider: "CleanPro Services",
      price: "PKR 2,000",
      originalPrice: "PKR 2,500",
      rating: 4.8,
      reviews: 125,
      duration: "2-3 hours",
      image: "/placeholder.svg",
      description: "Complete house cleaning including dusting, mopping, and bathroom cleaning",
      areas: ["Saddar Town", "Clifton", "DHA (Defence)", "Gulshan-e-Iqbal", "Johar Town"]
    }, {
      id: 102,
      name: "Deep Cleaning Service",
      provider: "Sparkle Clean",
      price: "PKR 4,500",
      originalPrice: "PKR 5,000",
      rating: 4.9,
      reviews: 89,
      duration: "4-5 hours",
      image: "/placeholder.svg",
      description: "Comprehensive deep cleaning with kitchen appliances and carpet cleaning",
      areas: ["Clifton", "DHA (Defence)", "Gulberg", "North Nazimabad"]
    }, {
      id: 103,
      name: "Office Cleaning",
      provider: "Commercial Clean Co.",
      price: "PKR 3,000",
      rating: 4.7,
      reviews: 67,
      duration: "3-4 hours",
      image: "/placeholder.svg",
      description: "Professional office cleaning including workstations and meeting rooms",
      areas: ["Saddar Town", "Federal B Area", "Gulshan-e-Iqbal", "Shahra-e-Faisal"]
    }, {
      id: 104,
      name: "Carpet Cleaning",
      provider: "Clean Masters",
      price: "PKR 1,500",
      rating: 4.6,
      reviews: 92,
      duration: "1-2 hours",
      image: "/placeholder.svg",
      description: "Professional carpet and upholstery cleaning service",
      areas: ["Nazimabad", "North Karachi", "Korangi", "Landhi"]
    }],
    "painting": [{
      id: 201,
      name: "Interior Wall Painting",
      provider: "Paint Masters",
      price: "PKR 15,000",
      rating: 4.8,
      reviews: 45,
      duration: "2-3 days",
      image: "/placeholder.svg",
      description: "Complete interior painting with premium quality paint",
      areas: ["DHA (Defence)", "Clifton", "Gulshan-e-Iqbal", "Gulberg"]
    }, {
      id: 202,
      name: "Exterior House Painting",
      provider: "Color Craft",
      price: "PKR 25,000",
      rating: 4.9,
      reviews: 32,
      duration: "3-5 days",
      image: "/placeholder.svg",
      description: "Weather-resistant exterior painting with primer",
      areas: ["Saddar Town", "Federal B Area", "North Nazimabad", "Johar Town"]
    }],
    "electrician": [{
      id: 301,
      name: "Electrical Wiring",
      provider: "PowerFix Solutions",
      price: "PKR 5,000",
      rating: 4.7,
      reviews: 78,
      duration: "4-6 hours",
      image: "/placeholder.svg",
      description: "Complete electrical wiring installation and repair",
      areas: ["Clifton", "DHA (Defence)", "Gulshan-e-Iqbal", "Saddar Town"]
    }, {
      id: 302,
      name: "Fan Installation",
      provider: "Quick Electric",
      price: "PKR 800",
      rating: 4.6,
      reviews: 156,
      duration: "1 hour",
      image: "/placeholder.svg",
      description: "Ceiling fan installation with proper wiring",
      areas: ["Nazimabad", "Federal B Area", "Korangi", "North Karachi", "Gulberg"]
    }],
    "appliance": [{
      id: 401,
      name: "AC Repair & Service",
      provider: "Cool Tech",
      price: "PKR 2,500",
      rating: 4.8,
      reviews: 134,
      duration: "2-3 hours",
      image: "/placeholder.svg",
      description: "AC repair, gas refilling, and general maintenance",
      areas: ["DHA (Defence)", "Clifton", "Gulshan-e-Iqbal", "Johar Town", "Gulberg"]
    }, {
      id: 402,
      name: "Washing Machine Repair",
      provider: "Appliance Pro",
      price: "PKR 1,800",
      rating: 4.5,
      reviews: 89,
      duration: "1-2 hours",
      image: "/placeholder.svg",
      description: "Washing machine repair and parts replacement",
      areas: ["Saddar Town", "Federal B Area", "North Nazimabad", "Nazimabad"]
    }],
    "tailor": [{
      id: 501,
      name: "Dress Alteration",
      provider: "Master Tailor",
      price: "PKR 500",
      rating: 4.7,
      reviews: 89,
      duration: "2-3 days",
      image: "/placeholder.svg",
      description: "Professional dress fitting and alteration service",
      areas: ["Saddar Town", "Clifton", "DHA (Defence)", "Gulshan-e-Iqbal"]
    }, {
      id: 502,
      name: "Suit Stitching",
      provider: "Royal Tailors",
      price: "PKR 3,500",
      rating: 4.8,
      reviews: 67,
      duration: "5-7 days",
      image: "/placeholder.svg",
      description: "Custom suit stitching with premium fabric",
      areas: ["DHA (Defence)", "Clifton", "Gulberg", "Johar Town"]
    }],
    "cooking": [{
      id: 601,
      name: "Home Cooking Service",
      provider: "Home Chef",
      price: "PKR 2,000",
      rating: 4.9,
      reviews: 156,
      duration: "2-3 hours",
      image: "/placeholder.svg",
      description: "Fresh home-cooked meals prepared at your location",
      areas: ["Clifton", "DHA (Defence)", "Gulshan-e-Iqbal", "Gulberg"]
    }, {
      id: 602,
      name: "Party Catering",
      provider: "Delicious Catering",
      price: "PKR 8,000",
      rating: 4.6,
      reviews: 89,
      duration: "4-6 hours",
      image: "/placeholder.svg",
      description: "Complete catering service for parties and events",
      areas: ["Saddar Town", "Federal B Area", "North Nazimabad", "Johar Town"]
    }],
    "water": [{
      id: 701,
      name: "Water Tanker Supply",
      provider: "Fresh Water Co.",
      price: "PKR 1,200",
      rating: 4.5,
      reviews: 234,
      duration: "30-60 mins",
      image: "/placeholder.svg",
      description: "Clean water supply for homes and offices",
      areas: ["All Areas", "Clifton", "DHA (Defence)", "Gulshan-e-Iqbal", "Saddar Town"]
    }, {
      id: 702,
      name: "Emergency Water Supply",
      provider: "Quick Water",
      price: "PKR 1,500",
      rating: 4.7,
      reviews: 167,
      duration: "15-30 mins",
      image: "/placeholder.svg",
      description: "24/7 emergency water supply service",
      areas: ["Nazimabad", "Federal B Area", "North Karachi", "Korangi"]
    }],
    "plumbing": [{
      id: 801,
      name: "Pipe Repair",
      provider: "Plumb Pro",
      price: "PKR 1,000",
      rating: 4.6,
      reviews: 145,
      duration: "1-2 hours",
      image: "/placeholder.svg",
      description: "Professional pipe repair and leak fixing",
      areas: ["Saddar Town", "Clifton", "DHA (Defence)", "Gulshan-e-Iqbal"]
    }, {
      id: 802,
      name: "Bathroom Plumbing",
      provider: "Fix Masters",
      price: "PKR 2,500",
      rating: 4.8,
      reviews: 98,
      duration: "3-4 hours",
      image: "/placeholder.svg",
      description: "Complete bathroom plumbing installation and repair",
      areas: ["Gulberg", "Johar Town", "Federal B Area", "North Nazimabad"]
    }]
  };
  const categoryMap: Record<string, string> = {
    "cleaning": "Cleaning Services",
    "painting": "House Painting",
    "electrician": "Electrician Services",
    "appliance": "Home Appliance Repair",
    "laundry": "Laundry Service",
    "beauty": "Beauty & Salon",
    "moving": "Moving & Shifting",
    "car": "Car Services",
    "printing": "Printing Services",
    "renovation": "Home Renovation",
    "tailor": "Tailor & Alteration",
    "cooking": "Cooking Service",
    "water": "Water Tanker",
    "plumbing": "Plumbing Service"
  };
  const defaultServices = servicesData[category || "cleaning"] || [];
  const categoryName = categoryMap[category || "cleaning"] || "Services";

  // Get provider services for this category
  const categoryProviderServices = providerServices.filter(service => 
    service.category === category
  );

  // Combine default services with provider services for this category
  const allServices = [...defaultServices, ...categoryProviderServices];

  // Filter services based on selected filters
  const filteredServices = allServices.filter(service => {
    if (selectedArea && selectedArea !== "All Areas") {
      // Check both areas array (for default services) and area string (for provider services)
      if (service.areas && !service.areas.includes(selectedArea)) return false;
      if (service.area && !service.area.toLowerCase().includes(selectedArea.toLowerCase())) return false;
      if (!service.areas && !service.area) return false;
    }
    return true;
  });
  const handleBookService = (serviceId: number) => {
    navigate(`/services/${category}/${serviceId}`);
  };
  return <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
          <p className="text-muted-foreground">Choose from verified professionals in your area</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <AreaFilter onAreaChange={setSelectedArea} />
          {selectedArea && <div className="flex gap-2">
              <Badge variant="default">Selected Area: {selectedArea}</Badge>
            </div>}
        </div>

        
        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="group hover:shadow-hover transition-shadow cursor-pointer">
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
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {service.areas ? service.areas.join(", ") : service.area || "Various areas"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">{service.price}</span>
                          {service.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {service.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleBookService(service.id)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
          
        </div>
      </div>
    </div>;
};
export default ServiceCategory;