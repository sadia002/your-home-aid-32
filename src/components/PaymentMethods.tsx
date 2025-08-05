import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Building2, Smartphone, Wallet } from "lucide-react";
const PaymentMethods = () => {
  const paymentMethods = [{
    id: 1,
    name: "Credit/Debit Cards",
    icon: CreditCard,
    description: "Visa, MasterCard, American Express",
    available: true
  }, {
    id: 2,
    name: "Bank Transfer",
    icon: Building2,
    description: "HBL, UBL, MCB, Allied Bank",
    available: true
  }, {
    id: 3,
    name: "Mobile Banking",
    icon: Smartphone,
    description: "JazzCash, EasyPaisa, UPaisa",
    available: true
  }, {
    id: 4,
    name: "Wallet",
    icon: Wallet,
    description: "Pay with your app wallet",
    available: true
  }];
  return <Card>
      
      
    </Card>;
};
export default PaymentMethods;