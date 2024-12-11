import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectMapProps {
  position: { lat: number; lng: number };
  onPositionChange: (position: { lat: number; lng: number }) => void;
}

function MapController({ position }: { position: { lat: number; lng: number } }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(position);
  }, [map, position]);
  return null;
}

export function ProjectMap({ position, onPositionChange }: ProjectMapProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-2 right-2 z-[1000] p-2 bg-white rounded-md shadow-md hover:bg-gray-50"
      >
        {isExpanded ? (
          <Minimize2 className="w-4 h-4" />
        ) : (
          <Maximize2 className="w-4 h-4" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 256 }}
            exit={{ height: 0 }}
            className="rounded-lg overflow-hidden"
          >
            <MapContainer
              center={position}
              zoom={13}
              className="h-64 w-full"
              whenCreated={(map) => {
                map.on('click', (e) => {
                  onPositionChange({
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                  });
                });
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position} />
              <MapController position={position} />
            </MapContainer>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-12 bg-gray-50 rounded-lg flex items-center px-4"
          >
            <span className="text-sm text-gray-600">
              Position : {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
