import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import ProjectsAdmin from './ProjectsAdmin';
import ServicesAdmin from './ServicesAdmin';
import ContactsAdmin from './ContactsAdmin';
import TestimonialsAdmin from './TestimonialsAdmin';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <Link to="/admin" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium">Dashboard Overview</Link>
          <Link to="/admin/projects" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium">Manage Projects</Link>
          <Link to="/admin/services" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium">Manage Services</Link>
          <Link to="/admin/testimonials" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium">Manage Reviews</Link>
          <Link to="/admin/contacts" className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium">Manage Contacts</Link>
          <button 
            onClick={handleLogout}
            className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 font-medium mt-auto"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <Routes>
          <Route path="/" element={
            <div>
              <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome to your admin panel. Select an option from the sidebar to manage your content.</p>
              <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Supabase Setup Complete</h3>
                <p className="text-sm">You can now manage your projects, services, reviews, and view contact form submissions using the sidebar menu.</p>
              </div>
            </div>
          } />
          <Route path="/projects" element={<ProjectsAdmin />} />
          <Route path="/services" element={<ServicesAdmin />} />
          <Route path="/testimonials" element={<TestimonialsAdmin />} />
          <Route path="/contacts" element={<ContactsAdmin />} />
        </Routes>
      </main>
    </div>
  );
}

