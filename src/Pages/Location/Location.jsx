import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const hospital = { lat: 23.8103, lng: 90.4125 };

export default function Location() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [userPos, setUserPos] = useState(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          "osm-tiles": {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution:
              '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          },
        },
        layers: [
          {
            id: "osm-tiles",
            type: "raster",
            source: "osm-tiles",
          },
        ],
      },
      center: [hospital.lng, hospital.lat],
      zoom: 13,
    });

    new maplibregl.Marker({ color: "red" })
      .setLngLat([hospital.lng, hospital.lat])
      .setPopup(new maplibregl.Popup().setText("🏥 Hospital"))
      .addTo(map.current);
  }, []);

  const showUserLocation = () => {
    if (!navigator.geolocation) return alert("⚠️ GPS not supported");

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const user = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setUserPos(user);

      new maplibregl.Marker({ color: "blue" })
        .setLngLat([user.lng, user.lat])
        .setPopup(new maplibregl.Popup().setText("🧍 You are here"))
        .addTo(map.current);

      try {
        const res = await fetch(
          `/api/route?startLng=${hospital.lng}&startLat=${hospital.lat}&endLng=${user.lng}&endLat=${user.lat}`
        );
        const data = await res.json();

        if (!data.features) return alert("Route not found");

        const route = data.features[0].geometry;

        if (map.current.getSource("route")) {
          map.current.getSource("route").setData({ type: "Feature", geometry: route });
        } else {
          map.current.addSource("route", {
            type: "geojson",
            data: { type: "Feature", geometry: route },
          });
          map.current.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": "#10B981", "line-width": 4 },
          });
        }

        const bounds = new maplibregl.LngLatBounds();
        bounds.extend([hospital.lng, hospital.lat]);
        bounds.extend([user.lng, user.lat]);
        map.current.fitBounds(bounds, { padding: 50 });
      } catch (err) {
        console.error(err);
        alert("⚠️ Unable to fetch route");
      }
    });
  };

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="w-full h-full" />
      <button
        onClick={showUserLocation}
        className="absolute top-4 right-4 bg-white text-black shadow-md px-3 py-2 rounded-lg font-semibold hover:bg-gray-100"
      >
        📍 Show My Location
      </button>
    </div>
  );
}
