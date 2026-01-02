import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Dashboard from './pages/Dashboard';
import ClusterList from './pages/ClusterList';
import ComingSoon from './components/ComingSoon';
import './App.css';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clusters" element={<ComingSoon featureName="Cluster Management" phase="Phase 3" />} />
          <Route path="/monitoring" element={<ComingSoon featureName="Real-time Monitoring" phase="Phase 4" />} />
          <Route path="/settings" element={<ComingSoon featureName="System Settings" phase="Phase 5" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
