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
          <a href={shortUrlData.shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrlData.shortUrl}
          </a>

          <div style={{ marginTop: '20px' }}>
            <p><strong>QR Code:</strong></p>
            <img src={shortUrlData.qrCodeImg} alt="Generated QR Code" style={{ width: '200px' }} />
          </div>
        </div>
      )}
    </div>
  );
}

// Basic inline styles
const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  input: {
    padding: '10px',
    fontSize: '1rem'
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  result: {
    marginTop: '20px',
    fontSize: '1.1rem'
  },
  error: {
    color: 'red'
  }
};

export default App;
