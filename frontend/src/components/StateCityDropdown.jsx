import { useState } from "react";

const stateCityData = {
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Tirupati",
    "Kakinada",
  ],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro"],
  Assam: ["Guwahati", "Dibrugarh", "Jorhat", "Nagaon", "Tezpur"],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Munger"],
  Chhattisgarh: ["Raipur", "Bilaspur", "Korba", "Durg", "Raigarh"],
  Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  Haryana: ["Chandigarh", "Gurugram", "Faridabad", "Panipat", "Ambala"],
  "Himachal Pradesh": ["Shimla", "Kullu", "Manali", "Mandi", "Dharamshala"],
  "Jammu & Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kashmir"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Hazaribagh", "Bokaro"],
  Karnataka: ["Bengaluru", "Mysuru", "Hubli", "Dharwad", "Mangalore"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kottayam", "Kannur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Manipur: ["Imphal", "Thoubal", "Churachandpur"],
  Meghalaya: ["Shillong", "Tura", "Jowai", "Nongstoin"],
  Mizoram: ["Aizawl", "Lunglei", "Champhai", "Kolasib"],
  Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Wokha"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
  Punjab: ["Chandigarh", "Amritsar", "Ludhiana", "Jalandhar", "Patiala"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer"],
  Sikkim: ["Gangtok", "Namchi", "Mangan"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy"],
  Telangana: ["Hyderabad", "Warangal", "Khammam", "Karimnagar"],
  Tripura: ["Agartala", "Udaipur", "Ambassa", "Belonia"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Allahabad"],
  Uttarakhand: ["Dehradun", "Haridwar", "Nainital", "Rishikesh", "Haldwani"],
  " West Bengal": ["Kolkata", "Darjeeling", "Siliguri", "Asansol", "Howrah"],
  "Andaman & Nicobar Islands": ["Port Blair"],
  Chandigarh: ["Chandigarh"],
  "Dadra & Nagar Haveli": ["Silvassa"],
  "Daman & Diu": ["Daman", "Diu"],
  Lakshadweep: ["Kavaratti"],
  Delhi: ["Delhi"],
};

export default function StateCityDropdown({ register, setValue }) {
  const [cities, setCities] = useState([]);
  const [stateSelected, setStateSelected] = useState("");
  const [citySelected, setCitySelected] = useState("");

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setStateSelected(selectedState);
    setCitySelected(""); // Reset city when state changes
    setCities(stateCityData[selectedState] || []);
    setValue("state", selectedState); // Update form state
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCitySelected(selectedCity);
    setValue("city", selectedCity); // Update form city
  };

  return (
    <div className="space-y-4">
      <label htmlFor="job_type" className="font-medium flex">
        State{" "}
      </label>
      <select
        {...register("state")}
        onChange={handleStateChange}
        value={stateSelected}
        className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="" disabled>
          Select State
        </option>
        {Object.keys(stateCityData).map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <label htmlFor="job_type" className="font-medium flex">
        City{" "}
      </label>
      <select
        {...register("city")}
        value={citySelected}
        onChange={handleCityChange}
        className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        disabled={!stateSelected} // Disable city dropdown if state is not selected
      >
        <option value="" disabled>
          Select City
        </option>
        {cities.length > 0 ? (
          cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No cities available. Please select a state.
          </option>
        )}
      </select>
    </div>
  );
}
