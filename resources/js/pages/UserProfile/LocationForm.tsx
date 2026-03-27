import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationForm = () => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [municipalities, setMunicipalities] = useState<any[]>([]);
  const [barangays, setBarangays] = useState<any[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedMunicipal, setSelectedMunicipal] = useState<number | null>(null);
  const [selectedBarangay, setSelectedBarangay] = useState<number | null>(null);

  // Load provinces on mount
  useEffect(() => {
    axios.get("/provinces").then((res) => setProvinces(res.data));
  }, []);

  // When province changes → load municipalities
  useEffect(() => {
    if (selectedProvince) {
      axios.get(`/municipalities/${selectedProvince}`).then((res) => {
        setMunicipalities(res.data);
        setBarangays([]); // reset barangays
        setSelectedMunicipal(null);
        setSelectedBarangay(null);
      });
    }
  }, [selectedProvince]);

  // When municipal changes → load barangays
  useEffect(() => {
    if (selectedMunicipal) {
      axios.get(`/barangays/${selectedMunicipal}`).then((res) => {
        setBarangays(res.data);
        setSelectedBarangay(null);
      });
    }
  }, [selectedMunicipal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      province: selectedProvince,
      municipality: selectedMunicipal,
      barangay: selectedBarangay,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-lg bg-white rounded-xl shadow-md">
      {/* Province Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Province</label>
        <select
          value={selectedProvince ?? ""}
          onChange={(e) => setSelectedProvince(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">-- Select Province --</option>
          {provinces.map((prov) => (
            <option key={prov.id} value={prov.id}>
              {prov.name}
            </option>
          ))}
        </select>
      </div>

      {/* Municipality Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Municipality</label>
        <select
          value={selectedMunicipal ?? ""}
          onChange={(e) => setSelectedMunicipal(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          disabled={!selectedProvince}
        >
          <option value="">-- Select Municipality --</option>
          {municipalities.map((mun) => (
            <option key={mun.id} value={mun.id}>
              {mun.name}
            </option>
          ))}
        </select>
      </div>

      {/* Barangay Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Barangay</label>
        <select
          value={selectedBarangay ?? ""}
          onChange={(e) => setSelectedBarangay(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          disabled={!selectedMunicipal}
        >
          <option value="">-- Select Barangay --</option>
          {barangays.map((brgy) => (
            <option key={brgy.id} value={brgy.id}>
              {brgy.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Save
      </button>
    </form>
  );
};

export default LocationForm;
