import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';

declare global {
  interface Window {
    google: typeof google;
  }
}

interface GoogleMapProps {
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  height?: string;
  defaultLocation?: { lat: number; lng: number };
}

const GoogleMap = ({ 
  onLocationSelect, 
  height = "300px",
  defaultLocation = { lat: 24.8607, lng: 67.0011 } // Karachi, Pakistan
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');

  // Fetch API key from Supabase Edge Function
  const fetchApiKey = async () => {
    try {
      const response = await fetch('/functions/v1/get-maps-config', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success && data.apiKey) {
        setApiKey(data.apiKey);
        return data.apiKey;
      } else {
        throw new Error(data.message || 'Failed to get API key');
      }
    } catch (err) {
      console.error('Error fetching API key:', err);
      setError('Google Maps API key not configured. Please add GOOGLE_MAPS_API_KEY to your Supabase project secrets.');
      return null;
    }
  };

  const initializeMap = async (apiKey: string) => {
    if (!mapRef.current || !apiKey) return;

    try {
      const loader = new Loader({
        apiKey: apiKey,
        version: 'weekly',
        libraries: ['places', 'geometry']
      });

      await loader.load();
      
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: defaultLocation,
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi.business',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }
        ]
      });

      const markerInstance = new google.maps.Marker({
        position: defaultLocation,
        map: mapInstance,
        draggable: true,
        title: 'Service Location',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#ef4444',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff'
        }
      });

      // Initialize Places service
      const placesService = new google.maps.places.PlacesService(mapInstance);

      // Add click listener to map
      mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const position = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          };
          markerInstance.setPosition(position);
          mapInstance.panTo(position);
          
          // Get detailed address information
          getAddressFromCoordinates(position);
        }
      });

      // Add drag listener to marker
      markerInstance.addListener('dragend', () => {
        const position = markerInstance.getPosition();
        if (position) {
          const coords = {
            lat: position.lat(),
            lng: position.lng()
          };
          mapInstance.panTo(coords);
          getAddressFromCoordinates(coords);
        }
      });

      // Function to get address from coordinates
      const getAddressFromCoordinates = (coords: { lat: number; lng: number }) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: coords }, (results, status) => {
          if (status === 'OK' && results?.[0]) {
            const address = results[0].formatted_address;
            setSelectedLocation(address);
            onLocationSelect?.({
              ...coords,
              address: address
            });
          }
        });
      };

      // Initialize with default location address
      getAddressFromCoordinates(defaultLocation);

      setMap(mapInstance);
      setMarker(markerInstance);
      setIsLoaded(true);
      setError('');
    } catch (err) {
      setError('Google Maps API key not configured. Please add your API key to Supabase Secrets.');
      console.error('Google Maps loading error:', err);
    }
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          if (map && marker) {
            map.setCenter(userLocation);
            map.setZoom(15);
            marker.setPosition(userLocation);
            
            // Get address for current location
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: userLocation }, (results, status) => {
              if (status === 'OK' && results?.[0]) {
                const address = results[0].formatted_address;
                setSelectedLocation(address);
                onLocationSelect?.({
                  ...userLocation,
                  address: address
                });
              }
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  useEffect(() => {
    const setupMap = async () => {
      const key = await fetchApiKey();
      if (key) {
        await initializeMap(key);
      }
    };
    
    setupMap();
  }, []);

  if (error) {
    return (
      <div className="space-y-4">
        <div className="p-6 bg-muted rounded-md text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <p className="text-xs text-muted-foreground">
            Please configure your Google Maps API key in Supabase Secrets with the key name "GOOGLE_MAPS_API_KEY"
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-8" style={{ height }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Service Location</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={getCurrentLocation}
          className="flex items-center gap-2"
        >
          <Navigation className="h-4 w-4" />
          Use Current Location
        </Button>
      </div>
      
      <div 
        ref={mapRef} 
        style={{ height, width: '100%' }}
        className="rounded-md border shadow-sm"
      />
      
      {selectedLocation && (
        <div className="p-3 bg-muted rounded-md">
          <p className="text-sm font-medium mb-1">Selected Location:</p>
          <p className="text-sm text-muted-foreground">{selectedLocation}</p>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground">
        💡 Click anywhere on the map or drag the marker to select your service location
      </p>
    </div>
  );
};

export default GoogleMap;