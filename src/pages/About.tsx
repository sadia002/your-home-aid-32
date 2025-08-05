import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Star, Clock, CheckCircle, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Verified Providers",
      description: "All service providers undergo thorough background checks and verification"
    },
    {
      icon: Star,
      title: "Quality Assurance",
      description: "Customer ratings and reviews ensure consistent service quality"
    },
    {
      icon: Clock,
      title: "Reliable Service",
      description: "On-time service delivery with professional standards"
    },
    {
      icon: CheckCircle,
      title: "Satisfaction Guarantee",
      description: "100% satisfaction guarantee or your money back"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Verified Providers" },
    { number: "50+", label: "Service Categories" },
    { number: "4.8", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            About Home Services
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Connecting you with trusted professionals for all your home service needs. 
            Making home maintenance simple, reliable, and affordable.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => navigate('/services')}
          >
            Explore Services
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2020, Home Services was born out of a simple idea: finding reliable 
                home service providers shouldn't be a hassle. We noticed that homeowners 
                struggled to find trustworthy professionals for their daily needs.
              </p>
              <p>
                Today, we've built a platform that connects thousands of customers with 
                verified service providers across Pakistan. From cleaning and repairs to 
                specialized services, we ensure quality and reliability in every booking.
              </p>
              <p>
                Our mission is to make home maintenance effortless while supporting local 
                service providers in growing their businesses through our platform.
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                To become Pakistan's most trusted platform for home services, where quality, 
                reliability, and customer satisfaction are never compromised.
              </p>
              <p>
                We envision a future where every home service need can be fulfilled with 
                just a few clicks, backed by professional service providers who take pride 
                in their work.
              </p>
              <div className="flex items-center gap-2 mt-6">
                <Award className="h-6 w-6 text-primary" />
                <span className="font-semibold">Trusted by 10,000+ customers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-hover transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Values */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Quality First</h3>
                <p className="text-sm text-muted-foreground">
                  We maintain high standards for all service providers on our platform
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Customer Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Your satisfaction is our top priority in everything we do
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Continuously improving our platform to serve you better
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of satisfied customers who trust us with their home service needs
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate('/services')}>
              Book a Service
            </Button>
            <Button variant="outline" onClick={() => navigate('/provider')}>
              Become a Provider
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;