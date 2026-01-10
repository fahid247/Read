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
      mapRef.current.flyTo([district.latitude, district.longitude], 14, {
        duration: 1.5,
      });
    }
  };

  return (
    <section className="bg-base-200 py-16 px-4">
      {/* Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-4xl playfair md:text-5xl font-extrabold text-primary">
          Nationwide Service Coverage
        </h2>
        <p className="mt-4 inter text-base-content/70 text-lg">
          We are available in all <span className="font-semibold">64 districts</span> of Bangladesh.
          Search your district to locate the nearest service center.
        </p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex justify-center mb-10">
        <div className="relative inter w-full max-w-lg">
          <input
            type="search"
            name="location"
            placeholder="Search by district name..."
            className="w-full rounded-full border border-base-300 px-5 py-3 pl-12
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                       shadow-sm bg-base-100 text-base-content"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50">
            🔍
          </span>
        </div>
      </form>

      {/* Map Container */}
      <div className="relative z-0 rounded-3xl overflow-hidden shadow-2xl border border-base-300 h-[70vh] md:h-[80vh]">
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
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <div className="text-sm text-base-content/80">
                  <strong className="text-base">{center.district}</strong>
                  <br />
                  <span className="text-base-content/60">Service Areas:</span>
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
