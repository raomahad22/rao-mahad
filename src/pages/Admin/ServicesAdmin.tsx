import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function ServicesAdmin() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<any>({ title: '', description: '', icon: 'Star' });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setServices(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentService.id) {
      await supabase.from('services').update({
        title: currentService.title,
        description: currentService.description,
        icon: currentService.icon
      }).eq('id', currentService.id);
    } else {
      await supabase.from('services').insert([{
        title: currentService.title,
        description: currentService.description,
        icon: currentService.icon
      }]);
    }
    setIsEditing(false);
    setCurrentService({ title: '', description: '', icon: 'Star' });
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      await supabase.from('services').delete().eq('id', id);
      fetchServices();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <button 
          onClick={() => { setIsEditing(true); setCurrentService({ title: '', description: '', icon: 'Star' }); }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      {isEditing && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input 
                type="text" 
                value={currentService.title}
                onChange={e => setCurrentService({...currentService, title: e.target.value})}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea 
                value={currentService.description}
                onChange={e => setCurrentService({...currentService, description: e.target.value})}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Icon Name (Lucide React)</label>
              <input 
                type="text" 
                value={currentService.icon}
                onChange={e => setCurrentService({...currentService, icon: e.target.value})}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>
            <div className="flex gap-2 pt-4">
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md">Save Service</button>
              <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-200 px-6 py-2 rounded-md">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
              <div className="flex gap-2 border-t pt-4">
                <button onClick={() => { setCurrentService(service); setIsEditing(true); }} className="flex-1 flex justify-center items-center gap-1 bg-gray-50 py-2 rounded-md text-sm hover:bg-gray-100">
                  <Edit2 size={16} /> Edit
                </button>
                <button onClick={() => handleDelete(service.id)} className="flex-1 flex justify-center items-center gap-1 bg-red-50 text-red-600 py-2 rounded-md text-sm hover:bg-red-100">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
          {services.length === 0 && <p className="col-span-full">No services found.</p>}
        </div>
      )}
    </div>
  );
}
