import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ScannerPage from './pages/ScannerPage';
import SiteDetailPage from './pages/SiteDetailPage';
import ExplorePage from './pages/ExplorePage';
import QRGeneratorPage from './pages/QRGeneratorPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scan" element={<ScannerPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/qr-generator" element={<QRGeneratorPage />} />
          <Route path="/site/:siteId" element={<SiteDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
