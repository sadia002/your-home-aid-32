import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface AreaFilterProps {
  onAreaChange?: (area: string) => void;
}

const AreaFilter = ({ onAreaChange }: AreaFilterProps) => {
  const karachiAreas = [
    "All Areas",
    "Saddar Town",
    "Clifton",
    "DHA (Defence)",
    "Gulshan-e-Iqbal",
    "Johar Town",
    "Lyari Town",
    "Shahra-e-Faisal",
    "Nazimabad",
    "North Nazimabad", 
    "Korangi",
    "Landhi",
    "Malir",
    "Gulberg",
    "Federal B Area",
    "North Karachi",
    "Surjani Town",
    "New Karachi",
    "Orangi Town",
    "Baldia Town",
    "SITE Town",
    "Kemari",
    "Shah Faisal Colony",
    "Gulistan-e-Johar"
  ];

  return (
    <div className="flex items-center space-x-2">
      <MapPin className="h-4 w-4 text-muted-foreground" />
      <Select defaultValue="All Areas" onValueChange={(value) => onAreaChange?.(value === "All Areas" ? "" : value)}>
        <SelectTrigger className="w-[200px] bg-white/95 border-0 shadow-soft">
          <SelectValue placeholder="Select area" />
        </SelectTrigger>
        <SelectContent>
          {karachiAreas.map((area) => (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AreaFilter;