import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { Trash2, Edit2, Plus, Image as ImageIcon } from 'lucide-react';

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<any>({ text: '', name: '', role: '', rating: 5, avatar: '' });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    
    const defaultTestimonials = [
      { id: '1', text: "Mahad completely transformed our organic presence. Within 6 months, our non-branded traffic tripled, and we secured top rankings. Highly recommend his services.", name: "Sarah Jenkins", role: "CMO, TechGrowth Solutions", rating: 5, avatar: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=2A4B37&color=fff" },
      { id: '2', text: "The quality of backlinks Mahad secures is unparalleled. We were struggling to build authority in a crowded niche, and his manual outreach strategy delivered amazing results.", name: "David Chen", role: "Founder, E-Commerce Direct", rating: 5, avatar: "https://ui-avatars.com/api/?name=David+Chen&background=F4A222&color=fff" },
      { id: '3', text: "Working with Mahad was the best marketing decision we made this year. He doesn't focus on vanity metrics; he focuses on traffic that actually converts.", name: "Michael Ross", role: "Director of Marketing, LegalPro", rating: 5, avatar: "https://ui-avatars.com/api/?name=Michael+Ross&background=1E3728&color=fff" }
    ];

    if (!error && data && data.length > 0) {
      setTestimonials(data);
    } else {
      if (!error && data && data.length === 0) {
        await supabase.from('testimonials').insert(defaultTestimonials.map(({id, ...rest}) => rest));
        const { data: newData } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
        if (newData && newData.length > 0) {
          setTestimonials(newData);
          setLoading(false);
          return;
        }
      }
      setTestimonials(defaultTestimonials);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingImage(true);
    try {
      const url = await uploadToCloudinary(e.target.files[0]);
      setCurrentTestimonial({ ...currentTestimonial, avatar: url });
    } catch (error) {
      console.error('Upload failed', error);
      alert('Failed to upload image. Check Cloudinary credentials.');
    }
    setUploadingImage(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Provide a default avatar if none is uploaded
    const avatarToSave = currentTestimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTestimonial.name)}&background=2A4B37&color=fff`;

    const payload = {
      text: currentTestimonial.text,
      name: currentTestimonial.name,
      role: currentTestimonial.role,
      rating: currentTestimonial.rating,
      avatar: avatarToSave
    };

    if (currentTestimonial.id) {
      await supabase.from('testimonials').update(payload).eq('id', currentTestimonial.id);
    } else {
      await supabase.from('testimonials').insert([payload]);
    }
    setIsEditing(false);
    setCurrentTestimonial({ text: '', name: '', role: '', rating: 5, avatar: '' });
    fetchTestimonials();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      await supabase.from('testimonials').delete().eq('id', id);
      fetchTestimonials();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Testimonials</h1>
        <button 
          onClick={() => { setIsEditing(true); setCurrentTestimonial({ text: '', name: '', role: '', rating: 5, avatar: '' }); }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      {isEditing && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text" 
                value={currentTestimonial.name}
                onChange={e => setCurrentTestimonial({...currentTestimonial, name: e.target.value})}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role/Company</label>
              <input 
                type="text" 
                value={currentTestimonial.role}
                onChange={e => setCurrentTestimonial({...currentTestimonial, role: e.target.value})}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Review Text</label>
              <textarea 
                value={currentTestimonial.text}
                onChange={e => setCurrentTestimonial({...currentTestimonial, text: e.target.value})}
                className="w-full border p-2 rounded-md"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
              <input 
                type="number" 
                min="1" max="5"
                value={currentTestimonial.rating}
                onChange={e => setCurrentTestimonial({...currentTestimonial, rating: parseInt(e.target.value)})}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Avatar Image (Optional)</label>
              <div className="flex items-center gap-4">
                {currentTestimonial.avatar && (
                  <img src={currentTestimonial.avatar} alt="Preview" className="w-16 h-16 object-cover rounded-full" />
                )}
                <label className="bg-gray-100 px-4 py-2 rounded-md cursor-pointer flex items-center gap-2 text-sm">
                  <ImageIcon size={18} />
                  {uploadingImage ? 'Uploading...' : 'Upload Image'}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">If left blank, an auto-generated initial avatar will be used.</p>
            </div>
            <div className="flex gap-2 pt-4">
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md">Save Testimonial</button>
              <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-200 px-6 py-2 rounded-md">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading testimonials...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-4 mb-4">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-md">{testimonial.name}</h3>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex text-accent mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm line-clamp-4 mb-4">"{testimonial.text}"</p>
              
              <div className="flex gap-2 border-t pt-4 mt-auto">
                <button onClick={() => { setCurrentTestimonial(testimonial); setIsEditing(true); }} className="flex-1 flex justify-center items-center gap-1 bg-gray-50 py-2 rounded-md text-sm hover:bg-gray-100">
                  <Edit2 size={16} /> Edit
                </button>
                <button onClick={() => handleDelete(testimonial.id)} className="flex-1 flex justify-center items-center gap-1 bg-red-50 text-red-600 py-2 rounded-md text-sm hover:bg-red-100">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && <p className="col-span-full">No testimonials found. Add one above.</p>}
        </div>
      )}
    </div>
  );
}
