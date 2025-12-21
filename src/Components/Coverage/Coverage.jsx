import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const Coverage = () => {
  const position = [23.6850, 90.3563];
  const [serviceCenters, setServiceCenters] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    axios
      .get("/serviceCenters.json")
      .then((res) => setServiceCenters(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim();

    if (!location) return;

    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district && mapRef.current) {
      mapRef.current.flyTo(
        [district.latitude, district.longitude],
        14,
        { duration: 1.5 }
      );
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          Nationwide Service Coverage
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We are currently available in all <span className="font-semibold">64 districts</span> of Bangladesh.
          Search your district to locate the nearest service center.
        </p>
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-8"
      >
        <div className="relative w-full max-w-md">
          <input
            type="search"
            name="location"
            placeholder="Search by district name..."
            className="w-full rounded-full border border-gray-300 px-5 py-3 pl-12 
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                       shadow-sm"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </form>

      {/* Map Container */}
      <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-[70vh] md:h-[80vh]">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-full w-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <div className="text-sm">
                  <strong className="text-base">{center.district}</strong>
                  <br />
                  <span className="text-gray-600">
                    Service Areas:
                  </span>
                  <br />
                  {center.covered_area.join(", ")}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default Coverage;
