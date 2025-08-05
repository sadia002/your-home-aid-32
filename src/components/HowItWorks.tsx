import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, UserCheck, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Browse Services",
      description: "Explore our wide range of home services and find what you need",
      icon: Search,
      color: "bg-blue-500"
    },
    {
      step: 2,
      title: "Book & Schedule",
      description: "Choose your preferred time slot and book instantly online",
      icon: Calendar,
      color: "bg-green-500"
    },
    {
      step: 3,
      title: "Get Service",
      description: "Our verified professionals arrive at your doorstep on time",
      icon: UserCheck,
      color: "bg-purple-500"
    },
    {
      step: 4,
      title: "Rate & Review",
      description: "Share your experience and help others make informed decisions",
      icon: Star,
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              How It Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get professional home services in just 4 simple steps
            </p>
          </div>
        </div>
        
        <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.step} className="relative">
                <Card className="group transition-all duration-300 hover:shadow-hover bg-gradient-card border-0">
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${step.color} text-white shadow-soft`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div className="space-y-2 text-center">
                      <div className="text-sm font-bold text-primary">Step {step.step}</div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-muted-foreground">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;