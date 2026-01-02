import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import ClusterList from './pages/ClusterList';
import './App.css';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clusters" element={<ClusterList />} />
          <Route path="/monitoring" element={<div className="flex items-center justify-center h-full text-slate-500">Monitoring feature coming in Phase 4</div>} />
          <Route path="/settings" element={<div className="flex items-center justify-center h-full text-slate-500">Settings feature coming in Phase 5</div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
