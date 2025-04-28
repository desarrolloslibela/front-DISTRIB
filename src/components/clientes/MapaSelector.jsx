import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useCallback, useState } from "react";

const MapaSelector = ({ latitud, longitud, onSelectUbicacion }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const [selected, setSelected] = useState({
    lat: latitud || -24.782932,
    lng: longitud || -65.423197,
  });

  const handleMapClick = useCallback((event) => {
    const nuevaUbicacion = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelected(nuevaUbicacion);
    onSelectUbicacion(nuevaUbicacion);
  }, [onSelectUbicacion]);

  if (!isLoaded) return <p>Cargando mapa...</p>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "300px" }}
      center={selected}
      zoom={14}
      onClick={handleMapClick}
    >
      <Marker position={selected} />
    </GoogleMap>
  );
};

export default MapaSelector;