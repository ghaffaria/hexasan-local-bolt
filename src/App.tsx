import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import PoolsLayout from './components/pools/PoolsLayout';
import { ZvolLayout } from './components/zvol/ZvolLayout';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/storage/pools" element={<PoolsLayout />} />
              <Route path="/storage/zvols" element={<ZvolLayout />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
