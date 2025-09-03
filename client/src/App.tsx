import { useState, useEffect, useCallback } from 'react';

function App() {
  const [timeData, setTimeData] = useState<{ time: { readable: string; iso: string; } } | null>(null);
  const [greetingData, setGreetingData] = useState<{ greeting: string; } | null>(null);
  const [isTimeLoading, setIsTimeLoading] = useState(true);
  const [isGreetingLoading, setIsGreetingLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTime = useCallback(async () => {
    setIsTimeLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/time');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTimeData(data);
    } catch (error) {
      setError('Failed to fetch time. Is the server running?');
      console.error("Error fetching time:", error);
    } finally {
      setIsTimeLoading(false);
    }
  }, []);

  const fetchGreeting = useCallback(async () => {
    setIsGreetingLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/greeting');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGreetingData(data);
    } catch (error) {
      setError('Failed to fetch greeting. Is the server running?');
      console.error("Error fetching greeting:", error);
    } finally {
      setIsGreetingLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTime();
    fetchGreeting();
  }, [fetchTime, fetchGreeting]);

  return (
    <div className="app-container">
      <div className="main-card">
        
        <header className="header">
          <h1 className="title">Full-Stack API Client</h1>
          <p className="subtitle">A React frontend consuming a Node.js & Express API.</p>
        </header>

        {error && (
          <div className="error-box">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        <div className="sections-container">
          {/* --- Time API Card --- */}
          <div className="api-card">
            <div className="api-card-header">
              <h2 className="api-card-title indigo">Current Server Time</h2>
              <button 
                onClick={fetchTime}
                disabled={isTimeLoading}
                className="button indigo"
              >
                {isTimeLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
            {isTimeLoading ? (
              <p className="loading-text">Fetching time...</p>
            ) : timeData && (
              <div className="data-display">
                {timeData.time.readable}
              </div>
            )}
          </div>

          <div className="api-card">
            <div className="api-card-header">
              <h2 className="api-card-title purple">Random Greeting</h2>
              <button 
                onClick={fetchGreeting}
                disabled={isGreetingLoading}
                className="button purple"
              >
                {isGreetingLoading ? 'Loading...' : 'Get New Greeting'}
              </button>
            </div>
            {isGreetingLoading ? (
              <p className="loading-text">Fetching greeting...</p>
            ) : greetingData && (
              <div className="data-display">
                "{greetingData.greeting}"
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
