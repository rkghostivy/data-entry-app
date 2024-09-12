"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Result {
  id: number;
  name: string;
  max: number;
  min: number;
  average: number;
  timestamp: string;
}

export default function ProtectedPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Fetch results from the API
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/results', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          setError('Failed to fetch results.');
        }
      } catch (err) {
        setError('An error occurred while fetching results.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If error occurs, display the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Results</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Max Value</th>
            <th>Min Value</th>
            <th>Average</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.name}</td>
              <td>{result.max}</td>
              <td>{result.min}</td>
              <td>{result.average}</td>
              <td>{new Date(result.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => router.push('/')}>Go back to Home</button>
    </div>
  );
}
