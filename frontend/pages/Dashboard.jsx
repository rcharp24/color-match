import React, { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const res = await axios.post('/api/image', formData);
    setResult(res.data);
  };

  return (
    <div className="p-4">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {result && (
        <div>
          <p>Extracted Color: {result.extractedColor}</p>
          <p>Status: {result.status}</p>
          {result.suggestedColors && (
            <div>
              <p>Suggested Colors:</p>
              <ul>
                {result.suggestedColors.map((c, idx) => <li key={idx}>{c}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}