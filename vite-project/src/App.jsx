import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [response, setResponse] = useState(null);
  const [average, setAverage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (numberId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://localhost:9876/numbers/${numberId}`);
      setResponse(res.data);
      
      // Calculate average
      const numbers = res.data.numbers;
      const avg = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
      setAverage(avg);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <button disabled={loading} onClick={() => fetchData('e')}>Fetch Even Numbers</button>
      <button disabled={loading} onClick={() => fetchData('o')}>Fetch Odd Numbers</button>
      <button disabled={loading} onClick={() => fetchData('p')}>Fetch Prime Numbers</button>
      <button disabled={loading} onClick={() => fetchData('f')}>Fetch Fibonacci Numbers</button>
      <button disabled={loading} onClick={() => fetchData('r')}>Fetch Random Numbers</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div>
          <p>Window Previous State: {response.windowPrevState.join(',')}</p>
          <p>Window Current State: {response.windowCurrState.join(',')}</p>
          <p>Numbers: {response.numbers.join(',')}</p>
          <p>Average: {average}</p>
        </div>
      )}
    </div>
  );
};

export default App;
