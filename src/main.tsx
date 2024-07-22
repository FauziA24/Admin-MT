import React from 'react';
import ReactDOM from 'react-dom/client';
import "../app/globals.css";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './routes/Auth';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from './components/ui/toaster';
import 'react-toastify/dist/ReactToastify.css';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Auth />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
    <Toaster />
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
);
