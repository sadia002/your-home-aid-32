
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Star, Clock, MapPin, Calendar as CalendarIcon, CreditCard, Building2, Smartphone, Wallet, ArrowLeft, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const ServiceBooking = () => {
  const { category, serviceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [bankDetails, setBankDetails] = useState({
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    transactionId: ""
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: ""
  });
  const [mobileDetails, setMobileDetails] = useState({
    phoneNumber: "",
    provider: "",
    accountName: ""
  });
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
    notes: ""
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Sample service data with more comprehensive coverage
  const serviceData: Record<string, any> = {
    "1": {
      id: 1,
      name: "Basic House Cleaning",
      provider: "CleanPro Services",
      price: "PKR 2,000",
      originalPrice: "PKR 2,500",
      rating: 4.8,
      reviews: 125,
      duration: "2-3 hours",
      description: "Complete house cleaning including dusting, mopping, and bathroom cleaning",
      features: ["Dusting all surfaces", "Mopping floors", "Bathroom cleaning", "Kitchen cleaning", "Vacuum cleaning"]
    },
    "2": {
      id: 2,
      name: "Deep Cleaning Service",
      provider: "Sparkle Clean",
      price: "PKR 4,500",
      originalPrice: "PKR 5,000",
      rating: 4.9,
      reviews: 89,
      duration: "4-5 hours",
      description: "Comprehensive deep cleaning with kitchen appliances and carpet cleaning",
      features: ["Deep kitchen cleaning", "Carpet cleaning", "Appliance cleaning", "Window cleaning", "Sanitization"]
    },
    "3": {
      id: 3,
      name: "Office Cleaning",
      provider: "Commercial Clean Co.",
      price: "PKR 3,000",
      rating: 4.7,
      reviews: 67,
      duration: "3-4 hours",
      description: "Professional office cleaning including workstations and meeting rooms",
      features: ["Workstation cleaning", "Meeting room setup", "Restroom maintenance", "Floor cleaning", "Trash removal"]
    }
  };

  // Get service data or use a default fallback
  const service = serviceData[serviceId || "1"] || {
    id: parseInt(serviceId || "1"),
    name: "Service",
    provider: "Professional Service Provider",
    price: "PKR 2,000",
    rating: 4.5,
    reviews: 50,
    duration: "2-3 hours",
    description: "Professional service with quality guarantee",
    features: ["Professional service", "Quality guarantee", "Experienced staff", "Reliable service"]
  };

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, details: "Visa, MasterCard, American Express" },
    { id: "bank", name: "Bank Transfer", icon: Building2, details: "HBL, UBL, MCB, Allied Bank" },
    { id: "mobile", name: "Mobile Banking", icon: Smartphone, details: "JazzCash, EasyPaisa, UPaisa" },
    { id: "wallet", name: "App Wallet", icon: Wallet, details: "Pay with your app wallet" }
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedPayment || !customerDetails.name || !customerDetails.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields to proceed.",
        variant: "destructive"
      });
      return;
    }

    // Validate payment method specific details
    if (selectedPayment === "bank" && (!bankDetails.accountHolder || !bankDetails.bankName || !bankDetails.accountNumber)) {
      toast({
        title: "Missing Bank Information",
        description: "Please fill all bank details to proceed.",
        variant: "destructive"
      });
      return;
    }

    if (selectedPayment === "card" && (!cardDetails.cardNumber || !cardDetails.expiryMonth || !cardDetails.expiryYear || !cardDetails.cvv || !cardDetails.cardholderName)) {
      toast({
        title: "Missing Card Information",
        description: "Please fill all card details to proceed.",
        variant: "destructive"
      });
      return;
    }

    if (selectedPayment === "mobile" && (!mobileDetails.phoneNumber || !mobileDetails.provider)) {
      toast({
        title: "Missing Mobile Banking Information",
        description: "Please fill all mobile banking details to proceed.",
        variant: "destructive"
      });
      return;
    }

    // Show success popup
    setShowSuccessDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{service.name}</CardTitle>
                    <p className="text-muted-foreground">{service.provider}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{service.price}</div>
                    {service.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        {service.originalPrice}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{service.rating}</span>
                    <span className="text-muted-foreground">({service.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{service.duration}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground">{service.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2">What's Included:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {service.features.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Customer Details */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                      placeholder="+92 300 1234567"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Service Address</Label>
                  <Input
                    id="address"
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                    placeholder="Enter complete address"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Special Notes</Label>
                  <Textarea
                    id="notes"
                    value={customerDetails.notes}
                    onChange={(e) => setCustomerDetails({...customerDetails, notes: e.target.value})}
                    placeholder="Any special requirements or notes..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            {/* Date & Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label>Select Time *</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div
                      key={method.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedPayment === method.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-primary text-white rounded-lg">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{method.name}</p>
                          <p className="text-xs text-muted-foreground">{method.details}</p>
                        </div>
                        {selectedPayment === method.id && (
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Payment Details Forms */}
            {selectedPayment === "card" && (
              <Card>
                <CardHeader>
                  <CardTitle>Card Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name *</Label>
                    <Input
                      id="cardholderName"
                      value={cardDetails.cardholderName}
                      onChange={(e) => setCardDetails({...cardDetails, cardholderName: e.target.value})}
                      placeholder="Enter cardholder name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="expiryMonth">Month *</Label>
                      <Select value={cardDetails.expiryMonth} onValueChange={(value) => setCardDetails({...cardDetails, expiryMonth: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({length: 12}, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="expiryYear">Year *</Label>
                      <Select value={cardDetails.expiryYear} onValueChange={(value) => setCardDetails({...cardDetails, expiryYear: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="YY" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({length: 10}, (_, i) => (
                            <SelectItem key={i} value={String(new Date().getFullYear() + i).slice(-2)}>
                              {String(new Date().getFullYear() + i).slice(-2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedPayment === "bank" && (
              <Card>
                <CardHeader>
                  <CardTitle>Bank Transfer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 mb-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="font-semibold text-sm">HBL Bank</h4>
                      <p className="text-sm text-muted-foreground">Account: 1234567890</p>
                      <p className="text-sm text-muted-foreground">IBAN: PK12HABB1234567890</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="font-semibold text-sm">UBL Bank</h4>
                      <p className="text-sm text-muted-foreground">Account: 0987654321</p>
                      <p className="text-sm text-muted-foreground">IBAN: PK34UBL0987654321</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Enter Your Bank Details</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="accountHolder">Account Holder Name *</Label>
                        <Input
                          id="accountHolder"
                          value={bankDetails.accountHolder}
                          onChange={(e) => setBankDetails({...bankDetails, accountHolder: e.target.value})}
                          placeholder="Enter account holder name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bankName">Bank Name *</Label>
                        <Select value={bankDetails.bankName} onValueChange={(value) => setBankDetails({...bankDetails, bankName: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your bank" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="HBL">HBL Bank</SelectItem>
                            <SelectItem value="UBL">UBL Bank</SelectItem>
                            <SelectItem value="MCB">MCB Bank</SelectItem>
                            <SelectItem value="Allied">Allied Bank</SelectItem>
                            <SelectItem value="NBP">National Bank</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="accountNumber">Account Number *</Label>
                        <Input
                          id="accountNumber"
                          value={bankDetails.accountNumber}
                          onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                          placeholder="Enter your account number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="transactionId">Transaction ID (Optional)</Label>
                        <Input
                          id="transactionId"
                          value={bankDetails.transactionId}
                          onChange={(e) => setBankDetails({...bankDetails, transactionId: e.target.value})}
                          placeholder="Enter transaction reference"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedPayment === "mobile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Mobile Banking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="provider">Mobile Banking Provider *</Label>
                    <Select value={mobileDetails.provider} onValueChange={(value) => setMobileDetails({...mobileDetails, provider: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jazzcash">JazzCash</SelectItem>
                        <SelectItem value="easypaisa">EasyPaisa</SelectItem>
                        <SelectItem value="upaisa">UPaisa</SelectItem>
                        <SelectItem value="sadapay">SadaPay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="mobileNumber">Mobile Number *</Label>
                    <Input
                      id="mobileNumber"
                      value={mobileDetails.phoneNumber}
                      onChange={(e) => setMobileDetails({...mobileDetails, phoneNumber: e.target.value})}
                      placeholder="+92 300 1234567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input
                      id="accountName"
                      value={mobileDetails.accountName}
                      onChange={(e) => setMobileDetails({...mobileDetails, accountName: e.target.value})}
                      placeholder="Enter account name"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedPayment === "wallet" && (
              <Card>
                <CardHeader>
                  <CardTitle>App Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <Wallet className="h-12 w-12 mx-auto text-primary mb-4" />
                    <p className="text-lg font-medium">Pay with App Wallet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Your payment will be processed using your app wallet balance
                    </p>
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium">Available Balance</p>
                      <p className="text-lg font-bold text-primary">PKR 5,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Total & Book Button */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Service Cost</span>
                    <span>{service.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Service Fee</span>
                    <span>PKR 200</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">PKR 2,200</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleBooking}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <AlertDialogTitle className="text-xl">Successfully Booked!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your payment has been processed and service is confirmed for{" "}
              {selectedDate && format(selectedDate, 'PPP')} at {selectedTime}.
              <br />
              <br />
              You will receive a confirmation message shortly.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => {
                setShowSuccessDialog(false);
                navigate("/");
              }}
              className="w-full"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServiceBooking;
