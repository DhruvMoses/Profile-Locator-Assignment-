import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Default Leaflet marker icon configuration
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Apply the default icon globally
L.Marker.prototype.options.icon = defaultIcon;

// Helper to compute map bounds from profile coordinates
const getBounds = (profiles) => {
  const latLngs = profiles.map(p => [p.coordinates.lat, p.coordinates.lng]);
  return L.latLngBounds(latLngs);
};

// Handles dynamic map centering/zooming based on selection or bounds
const MapUpdater = ({ center, zoom, bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (center) {
      map.flyTo(center, zoom, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [map, center, zoom, bounds]);

  return null;
};

// Renders a marker and popup for a given profile
const ProfileMarker = ({ profile, isSelected }) => {
  const markerIcon = isSelected
    ? L.icon({ ...defaultIcon.options, iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png' })
    : defaultIcon;

  return (
    <Marker
      key={profile.id}
      position={[profile.coordinates.lat, profile.coordinates.lng]}
      icon={markerIcon}
    >
      <Popup>
        <div className="text-sm">
          <strong className="block mb-1">{profile.name}</strong>
          <span className="text-gray-600">{profile.location}</span>
          <p className="mt-1 text-xs text-gray-500">{profile.intro}</p>
        </div>
      </Popup>
    </Marker>
  );
};

// MapView component for displaying all profile markers and the selected one
const MapView = ({ profiles, selectedProfile }) => {
  const mapRef = useRef();

  const center = selectedProfile
    ? [selectedProfile.coordinates.lat, selectedProfile.coordinates.lng]
    : [0, 0]; // Default fallback center

  const bounds = !selectedProfile && profiles.length > 0 ? getBounds(profiles) : null;

  // Prevent Leaflet container error on hot reload
  useEffect(() => {
    return () => {
      const container = L.DomUtil.get('map');
      if (container) {
        container._leaflet_id = null;
      }
    };
  }, []);

  return (
    <div className="h-full min-h-[500px] rounded-lg shadow-md overflow-hidden border border-gray-200">
      <MapContainer
        center={center}
        zoom={selectedProfile ? 14 : 4}
        style={{ height: '100%', width: '100%' }}
        id="map"
        ref={mapRef}
      >
        <MapUpdater 
          center={selectedProfile ? center : null}
          zoom={selectedProfile ? 14 : 4}
          bounds={bounds}
        />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {profiles.map((profile) => (
          <ProfileMarker
            key={profile.id}
            profile={profile}
            isSelected={selectedProfile?.id === profile.id}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
