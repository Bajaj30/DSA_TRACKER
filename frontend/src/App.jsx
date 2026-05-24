import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProblemList from './pages/ProblemList';
import ProblemDetail from './pages/ProblemDetail';
import DailySchedule from './pages/DailySchedule';
import { getDashboard } from './api/client';

function App() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Fetch streak for navbar display
    getDashboard()
      .then((res) => setStreak(res.data.current_streak))
      .catch(() => {});
  }, []);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar streak={streak} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/problems/:id" element={<ProblemDetail />} />
          <Route path="/today" element={<DailySchedule />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
