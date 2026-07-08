import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';
import AdminDashboard from './pages/Admin/Dashboard';
import Login from './pages/Admin/Login';
import { supabase } from './lib/supabase';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for hardcoded admin bypass
    const bypassEmail = localStorage.getItem('admin_email');
    if (bypassEmail === 'raomahad22@gmail.com') {
      setSession({ user: { email: bypassEmail } });
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!localStorage.getItem('admin_email')) {
        setSession(session);
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        localStorage.setItem('admin_email', 'raomahad22@gmail.com');
        window.location.href = '/admin';
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/admin/login" element={!session ? <Login /> : <Navigate to="/admin" />} />
        <Route path="/admin/*" element={session ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
}

