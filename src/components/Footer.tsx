import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
const Footer = () => {
  return <footer className="bg-foreground text-white">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-sm font-bold text-white">WN</span>
              </div>
              <span className="font-bold text-xl">Work</span>
            </div>
            <p className="text-sm text-gray-300">
              Your trusted partner for all home service needs. Connecting customers with verified professionals since 2024.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:text-primary">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-primary">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-primary">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/services" className="block text-sm text-gray-300 hover:text-white transition-colors">
                All Services
              </Link>
              <Link to="/how-it-works" className="block text-sm text-gray-300 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link to="/pricing" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="/support" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>

          {/* For Providers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Providers</h3>
            <div className="space-y-2">
              <Link to="/provider-register" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Join as Provider
              </Link>
              <Link to="/provider-login" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Provider Login
              </Link>
              <Link to="/provider-support" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Provider Support
              </Link>
              <Link to="/terms" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>support@worknest.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>DHA, PHASE 8 , Karachi, Pakistan</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Subscribe to our newsletter</h4>
              <div className="flex space-x-2">
                <Input placeholder="Enter your email" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                <Button className="bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            © 2024 HomeServices. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/refund" className="text-sm text-gray-300 hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;