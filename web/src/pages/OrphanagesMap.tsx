import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import { api } from "../services/api";
import mapMarker from "../images/map-marker.svg";

import "leaflet/dist/leaflet.css";

import "../styles/pages/orphanages-map.css";

const mapMarkerIcon = Leaflet.icon({
  iconUrl: mapMarker,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

export function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("/orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Franca</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-20.5890019, -47.3804479]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanages.map((it) => (
          <Marker
            position={[it.latitude, it.longitude]}
            icon={mapMarkerIcon}
            key={it.id}
          >
            <Popup
              className="map-popup"
              closeButton={false}
              minWidth={240}
              maxWidth={240}
            >
              {it.name}
              <Link to={`/orphanages/${it.id}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}
