import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

declare global {
  interface Window {
    google: typeof google;
  }
}

interface GoogleMapProps {
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  height?: string;
}

const GoogleMap = ({ onLocationSelect, height = "300px" }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');

  const initializeMap = async (key: string) => {
    if (!mapRef.current || !key) return;

    try {
      const loader = new Loader({
        apiKey: key,
        version: 'weekly',
        libraries: ['places']
      });

      await loader.load();
      
      // Default to Karachi, Pakistan
      const defaultLocation = { lat: 24.8607, lng: 67.0011 };
      
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: defaultLocation,
        zoom: 12,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      const markerInstance = new google.maps.Marker({
        position: defaultLocation,
        map: mapInstance,
        draggable: true,
        title: 'Service Location'
      });

      // Add click listener to map
      mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const position = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          };
          markerInstance.setPosition(position);
          
          // Get address from coordinates
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: position }, (results, status) => {
            if (status === 'OK' && results?.[0]) {
              onLocationSelect?.({
                ...position,
                address: results[0].formatted_address
              });
            }
          });
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
          
          // Get address from coordinates
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: coords }, (results, status) => {
            if (status === 'OK' && results?.[0]) {
              onLocationSelect?.({
                ...coords,
                address: results[0].formatted_address
              });
            }
          });
        }
      });

      setMap(mapInstance);
      setMarker(markerInstance);
      setIsLoaded(true);
      setError('');
    } catch (err) {
      setError('Failed to load Google Maps. Please check your API key.');
      console.error('Google Maps loading error:', err);
    }
  };

  useEffect(() => {
    if (apiKey) {
      initializeMap(apiKey);
    }
  }, [apiKey]);

  if (!isLoaded && !apiKey) {
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="google-maps-key">Google Maps API Key</Label>
          <Input
            id="google-maps-key"
            type="password"
            placeholder="Enter your Google Maps API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Get your API key from Google Cloud Console. For production, store this in Supabase Secrets.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!isLoaded && apiKey && (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading Google Maps...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div 
        ref={mapRef} 
        style={{ height, width: '100%' }}
        className="rounded-md border"
      />
      
      {isLoaded && (
        <p className="text-xs text-muted-foreground">
          Click on the map or drag the marker to select service location
        </p>
      )}
    </div>
  );
};

export default GoogleMap;