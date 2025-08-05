import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Star, Phone } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const BookingDashboard = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState([
    {
      id: 1,
      service: "House Cleaning",
      provider: "Clean Pro Services",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "Confirmed",
      price: "PKR 2,500",
      rating: 4.8,
      location: "DHA Phase 5, Karachi"
    },
    {
      id: 2,
      service: "AC Repair", 
      provider: "Cool Tech Solutions",
      date: "2024-01-18",
      time: "2:00 PM", 
      status: "Pending",
      price: "PKR 1,800",
      rating: 4.6,
      location: "Gulshan-e-Iqbal, Karachi"
    },
    {
      id: 3,
      service: "House Painting",
      provider: "Paint Masters",
      date: "2024-01-20",
      time: "9:00 AM",
      status: "Completed",
      price: "PKR 15,000",
      rating: 4.9,
      location: "Clifton, Karachi"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-500";
      case "Pending": return "bg-yellow-500";
      case "Completed": return "bg-blue-500";
      case "Cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleConfirmBooking = (bookingId: number) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: "Confirmed" }
        : booking
    ));
    toast({
      title: "Booking Confirmed!",
      description: "Your booking has been confirmed successfully.",
    });
  };

  const handleCancelBooking = (bookingId: number) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: "Cancelled" }
        : booking
    ));
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled.",
      variant: "destructive"
    });
  };

  const handleCompleteBooking = (bookingId: number) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: "Completed" }
        : booking
    ));
    toast({
      title: "Service Completed!",
      description: "Please rate your experience.",
    });
  };

  const handleContactProvider = () => {
    toast({
      title: "Contact Provider",
      description: "Connecting you with the service provider...",
    });
  };

  const handleRateService = () => {
    toast({
      title: "Rate Service",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">Manage your service bookings</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-hover transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{booking.service}</CardTitle>
                      <p className="text-muted-foreground">{booking.provider}</p>
                    </div>
                    <Badge className={`${getStatusColor(booking.status)} text-white`}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-lg">{booking.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{booking.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleContactProvider}>
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      {booking.status === "Pending" && (
                        <Button size="sm" onClick={() => handleConfirmBooking(booking.id)}>
                          Confirm
                        </Button>
                      )}
                      {booking.status === "Confirmed" && (
                        <>
                          <Button size="sm" onClick={() => handleCompleteBooking(booking.id)}>
                            Complete
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleCancelBooking(booking.id)}>
                            Cancel
                          </Button>
                        </>
                      )}
                      {booking.status === "Completed" && (
                        <Button size="sm" onClick={handleRateService}>Rate Service</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            {bookings.filter(b => b.status === "Pending").map((booking) => (
              <Card key={booking.id} className="hover:shadow-hover transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{booking.service}</CardTitle>
                      <p className="text-muted-foreground">{booking.provider}</p>
                    </div>
                    <Badge className={`${getStatusColor(booking.status)} text-white`}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-lg">{booking.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{booking.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleContactProvider}>
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button size="sm" onClick={() => handleConfirmBooking(booking.id)}>
                        Confirm
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="confirmed" className="space-y-4">
            {bookings.filter(b => b.status === "Confirmed").map((booking) => (
              <Card key={booking.id} className="hover:shadow-hover transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{booking.service}</CardTitle>
                      <p className="text-muted-foreground">{booking.provider}</p>
                    </div>
                    <Badge className={`${getStatusColor(booking.status)} text-white`}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-lg">{booking.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{booking.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleContactProvider}>
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button size="sm" onClick={() => handleCompleteBooking(booking.id)}>
                        Complete
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleCancelBooking(booking.id)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {bookings.filter(b => b.status === "Completed").map((booking) => (
              <Card key={booking.id} className="hover:shadow-hover transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{booking.service}</CardTitle>
                      <p className="text-muted-foreground">{booking.provider}</p>
                    </div>
                    <Badge className={`${getStatusColor(booking.status)} text-white`}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-lg">{booking.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{booking.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleContactProvider}>
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button size="sm" onClick={handleRateService}>
                        Rate Service
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BookingDashboard;