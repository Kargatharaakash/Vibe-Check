
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, LocateFixed, Box, Loader2, ExternalLink, Satellite } from 'lucide-react';

declare global {
  interface Window {
    L: any;
  }
}

interface Props {
  coordinates?: {
    lat: number;
    lng: number;
    locationName: string;
  };
}

export const GeoMap: React.FC<Props> = ({ coordinates }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  // Default to Shoreditch, London if no coordinates
  const defaultLat = 51.5245;
  const defaultLng = -0.0780;
  
  const targetLat = coordinates?.lat || defaultLat;
  const targetLng = coordinates?.lng || defaultLng;

  useEffect(() => {
    // Check if Leaflet is loaded
    if (!window.L) return;

    if (!mapInstanceRef.current && mapContainerRef.current) {
      // Initialize Map
      const map = window.L.map(mapContainerRef.current, {
        center: [targetLat, targetLng],
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });

      // CartoDB Dark Matter Tiles (Professional & Vibe aligned)
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Custom Icon
      const icon = window.L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: #ff4d00; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #000; box-shadow: 0 0 10px #ff4d00;"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      const marker = window.L.marker([targetLat, targetLng], { icon: icon }).addTo(map);
      
      // Add a popup with explicit white text color to fix visibility issues
      marker.bindPopup(`
        <div style="font-family: monospace; font-size: 10px; color: #e5e5e5; background-color: #0a0a0a; padding: 4px;">
          <strong style="color: #ff4d00;">TARGET_LOC</strong><br/>
          ${coordinates?.locationName || 'UNKNOWN_SECTOR'}
        </div>
      `);

      mapInstanceRef.current = map;
      setMapReady(true);
      setLoading(false);
    } else if (mapInstanceRef.current) {
        // Update view if coordinates change
        mapInstanceRef.current.setView([targetLat, targetLng], 15);
        
        // Clear existing markers
        mapInstanceRef.current.eachLayer((layer: any) => {
             if (layer instanceof window.L.Marker) {
                 mapInstanceRef.current.removeLayer(layer);
             }
        });

        // Re-add marker
        const icon = window.L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: #ff4d00; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #000; box-shadow: 0 0 10px #ff4d00;"></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        });
        
        const marker = window.L.marker([targetLat, targetLng], { icon: icon }).addTo(mapInstanceRef.current);
        marker.bindPopup(`
            <div style="font-family: monospace; font-size: 10px; color: #e5e5e5; background-color: #0a0a0a; padding: 4px;">
            <strong style="color: #ff4d00;">TARGET_LOC</strong><br/>
            ${coordinates?.locationName || 'UNKNOWN_SECTOR'}
            </div>
        `);
    }

    return () => {
      // Cleanup if needed, though typically we keep map instance alive during session
    };
  }, [targetLat, targetLng, coordinates]);

  const openStreetView = () => {
      // Direct link to Google Earth/Maps Satellite view
      const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${targetLat},${targetLng}&heading=-45&pitch=10&fov=80`;
      window.open(url, '_blank');
  };

  return (
    <div className="w-full h-full bg-anthro-gray/10 border border-gray-800 relative overflow-hidden group">
      <div ref={mapContainerRef} className="absolute inset-0 z-0 bg-[#1a1a1a]" />
      
      {/* Overlay for "Loading" if tiles take a moment */}
      {!mapReady && (
         <div className="absolute inset-0 z-10 bg-anthro-black flex items-center justify-center">
             <div className="flex items-center gap-2 text-signal-green font-mono text-xs animate-pulse">
                 <Loader2 className="w-4 h-4 animate-spin" />
                 INITIALIZING SAT_LINK...
             </div>
         </div>
      )}

      {/* HUD Elements */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-signal-green flex flex-col gap-1 z-[400] pointer-events-none">
          <div className="flex items-center gap-2 bg-black/60 px-2 py-1 backdrop-blur-sm border border-gray-800">
              <LocateFixed className="w-3 h-3 animate-pulse" />
              <span>LIVE_FEED: ACTIVE</span>
          </div>
          <div className="bg-black/60 px-2 py-1 backdrop-blur-sm border border-gray-800 text-gray-400">
            <div>LAT: {targetLat.toFixed(4)}° N</div>
            <div>LON: {targetLng.toFixed(4)}° W</div>
          </div>
      </div>

      {/* Street View Button */}
      <div className="absolute bottom-4 left-4 z-[400]">
          <button 
            onClick={openStreetView}
            className="flex items-center gap-2 bg-black/80 border border-signal-orange text-signal-orange hover:bg-signal-orange hover:text-black px-4 py-2 text-[10px] font-mono transition-all uppercase tracking-wider font-bold shadow-lg shadow-orange-900/20"
          >
              <Satellite className="w-3 h-3" />
              Open Sat_Uplink (Street View)
          </button>
      </div>

      <div className="absolute bottom-4 right-4 bg-black/80 p-2 border border-gray-800 backdrop-blur-sm z-[400] pointer-events-none">
          <div className="flex items-center gap-2 text-[10px] text-gray-300">
              <Navigation className="w-3 h-3 text-signal-green" />
              <span>SECTOR: {coordinates?.locationName?.toUpperCase() || 'ANALYZING...'}</span>
          </div>
      </div>

      {/* Scanning Line overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-signal-green/5 to-transparent h-[10%] w-full animate-scan z-[300]" />
    </div>
  );
};
