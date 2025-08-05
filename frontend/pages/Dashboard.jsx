import React, { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const res = await axios.post(
        'https://your-backend-url.onrender.com/api/upload', // replace with your deployed backend
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setResult(res.data); // contains extracted + match data
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Color Match Dashboard</h1>

      <form onSubmit={handleImageUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>

      {loading && <p>Processing image...</p>}

      {result && (
        <div>
          <h3>Extracted Colors:</h3>
          <ul>
            {result.extracted.map((color, index) => (
              <li key={index}>
                <div
                  style={{
                    backgroundColor: color,
                    width: '50px',
                    height: '20px',
                    display: 'inline-block',
                    marginRight: '10px',
                  }}
                />
                {color}
              </li>
            ))}
          </ul>

          <h3>Match Result:</h3>
          <pre>{JSON.stringify(result.match, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
