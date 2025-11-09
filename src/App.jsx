import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ScannerPage from './pages/ScannerPage';
import SiteDetailPage from './pages/SiteDetailPage';
import ExplorePage from './pages/ExplorePage';
import QRGeneratorPage from './pages/QRGeneratorPage';
import NearMePage from './pages/NearMePage';
import AdminLogin from './pages/AdminLogin';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Tourist Routes (with Layout) */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/scan" element={<Layout><ScannerPage /></Layout>} />
        <Route path="/explore" element={<Layout><ExplorePage /></Layout>} />
        <Route path="/near-me" element={<Layout><NearMePage /></Layout>} />
        <Route path="/site/:siteId" element={<Layout><SiteDetailPage /></Layout>} />
        
        {/* Admin Routes (without bottom nav) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/qr-generator" element={<QRGeneratorPage />} />
        
        {/* Legacy route - redirect to admin login */}
        <Route path="/qr-generator" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
