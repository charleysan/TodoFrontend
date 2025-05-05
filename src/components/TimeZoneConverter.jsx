import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

const TimeZoneConverter = () => {
  const [time, setTime] = useState('');
  const [fromZone, setFromZone] = useState('UTC');
  const [toZone, setToZone] = useState('UTC');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const timeZones = moment.tz.names();

  const handleConvert = async () => {
    if (!time || !fromZone || !toZone) {
      setResult("Please fill all fields correctly.");
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const res = await axios.get('/api/v1/convert_time', {
        params: {
          time: time,
          from_zone: fromZone,
          to_zone: toZone
        }
      });
      setResult(res.data.converted_time);  // This will display the converted time
    } catch (err) {
      setResult(err.response?.data?.error || 'Error converting time.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>🕒 Time Zone Converter</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Time (YYYY-MM-DD HH:MM): </label>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="2025-05-02 14:00"
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>From Time Zone: </label>
        <select value={fromZone} onChange={(e) => setFromZone(e.target.value)}>
          {timeZones.map((zone) => (
            <option key={zone} value={zone}>{zone}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>To Time Zone: </label>
        <select value={toZone} onChange={(e) => setToZone(e.target.value)}>
          {timeZones.map((zone) => (
            <option key={zone} value={zone}>{zone}</option>
          ))}
        </select>
      </div>

      <button onClick={handleConvert} disabled={loading}>
        {loading ? 'Converting...' : 'Convert'}
      </button>

      <div style={{ marginTop: '1rem' }}>
        <h4>Converted Time:</h4>
        <p>{result}Results</p>
      </div>
    </div>
  );
};

export default TimeZoneConverter;
