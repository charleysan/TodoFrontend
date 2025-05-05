import React, { useState } from 'react';
import axios from 'axios';
import { momentToRailsTimeZones } from '../utils/timezoneMap'; // ✅ adjust path if needed

const TimeZoneConverter = () => {
  const [inputTime, setInputTime] = useState('');
  const [fromZone, setFromZone] = useState('');
  const [toZone, setToZone] = useState('');
  const [convertedTime, setConvertedTime] = useState('');

  const handleConvert = async () => {
    const railsFromZone = momentToRailsTimeZones[fromZone] || fromZone;
    const railsToZone = momentToRailsTimeZones[toZone] || toZone;
  
    console.log("Sending to API:", { inputTime, railsFromZone, railsToZone });
  
    try {
      const response = await axios.get('http://localhost:3000/api/v1/convert_time', {
        params: {
          time: inputTime,
          from_zone: railsFromZone, // Use the mapped time zones here
          to_zone: railsToZone // Use the mapped time zones here
        }
      });
      
      setConvertedTime(response.data.converted_time);
    } catch (error) {
      console.error("Error converting time:", error);
      setConvertedTime("Conversion failed. Please check your input.");
    }
  };

  return (
    <div>
      <h2>🕒 Time Zone Converter</h2>
      <input
        type="datetime-local"
        value={inputTime}
        onChange={(e) => setInputTime(e.target.value)}
      />
      <br />
      <select value={fromZone} onChange={(e) => setFromZone(e.target.value)}>
        <option value="">Select source zone</option>
        {Object.keys(momentToRailsTimeZones).map((tz) => (
          <option key={tz} value={tz}>{tz}</option>
        ))}
      </select>
      <br />
      <select value={toZone} onChange={(e) => setToZone(e.target.value)}>
        <option value="">Select target zone</option>
        {Object.keys(momentToRailsTimeZones).map((tz) => (
          <option key={tz} value={tz}>{tz}</option>
        ))}
      </select>
      <br />
      <button onClick={handleConvert}>Convert</button>
      <p>Converted Time: {convertedTime}</p>
    </div>
  );
};

export default TimeZoneConverter;
