import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/layout/Navigation';
import { ProjectsPage } from './pages/ProjectsPage';
import { Toast } from './components/common/Toast';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/projets" replace />} />
            <Route path="/projets" element={<ProjectsPage />} />
            <Route path="/calendrier" element={<div>Calendrier</div>} />
            <Route path="/partenaires" element={<div>Partenaires</div>} />
            <Route path="/bilan" element={<div>Bilan</div>} />
          </Routes>
        </main>
        <Toast />
      </div>
    </Router>
  );
}

export default App;