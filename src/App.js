import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrlData, setShortUrlData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!originalUrl) {
      setError('Please enter a URL');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setShortUrlData(null);

      const response = await axios.post('http://localhost:3000/api/short', {
        originalUrl: originalUrl
      });

      setShortUrlData(response.data);
      setOriginalUrl('');
    } catch (err) {
      console.error(err);
      setError('Failed to generate short URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>URL Shortener with QR Code</h1>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter your URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Generating...' : 'Shorten URL'}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {shortUrlData && (
        <div style={styles.result}>
          <p><strong>Short URL:</strong></p>
          <a href={shortUrlData.shortUrl} target="_blank" rel="noopener noreferrer" style={styles.shortLink}>
            {shortUrlData.shortUrl}
          </a>

          <div style={styles.qrContainer}>
            <p><strong>QR Code:</strong></p>
            <img src={shortUrlData.qrCodeImg} alt="Generated QR Code" style={styles.qrImage} />
          </div>
        </div>
      )}
    </div>
  );
}

// Updated styles for better UI
const styles = {
  container: {
    maxWidth: '500px',
    margin: '25px auto',
    textAlign: 'center',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'rgb(220 229 240)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none'
  },
  button: {
    padding: '12px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background 0.3s ease',
    ':hover': {
      backgroundColor: '#0056b3'
    }
  },
  result: {
    marginTop: '20px',
    fontSize: '1.1rem',
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  error: {
    color: 'red',
    marginTop: '10px'
  },
  shortLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '1.1rem'
  },
  qrContainer: {
    marginTop: '20px',
    padding: '10px'
  },
  qrImage: {
    width: '180px',
    borderRadius: '5px'
  }
};

export default App;