import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocationMarker = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
};

const MapPicker = ({ onSelect, onClose }) => {
  const [position, setPosition] = useState({ lat: 27.7172, lng: 85.3240 });
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (position) {
      const fetchAddress = async () => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`
          );
          const data = await res.json();
          setAddress(data.display_name || 'Unknown location');
        } catch (err) {
          console.error('Error fetching address:', err);
        }
      };
      fetchAddress();
    }
  }, [position]);

  const handleConfirm = () => {
    if (onSelect && address) {
      onSelect({
        lat: position.lat,
        lng: position.lng,
        address,
      });
    } else {
      alert("Please select a location on the map.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-4 w-[90%] max-w-2xl relative">
        <h2 className="text-lg font-semibold mb-2">Select Location</h2>
        <div className="w-full h-96 rounded overflow-hidden">
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <LocationMarker setPosition={setPosition} />
            <Marker position={position}></Marker>
          </MapContainer>
        </div>
        <p className="text-sm text-gray-700 mt-2">📍 {address || "Click on the map to get address"}</p>
        <div className="flex justify-end mt-4 gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button onClick={handleConfirm} className="px-4 py-2 bg-black text-white rounded">
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPicker;
