import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookingDashboard from "./pages/BookingDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import ServiceCategory from "./pages/ServiceCategory";
import ServiceBooking from "./pages/ServiceBooking";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/services" element={<Services />} />
          <Route path="/bookings" element={<BookingDashboard />} />
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/services/:category" element={<ServiceCategory />} />
          <Route path="/services/:category/:serviceId" element={<ServiceBooking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
