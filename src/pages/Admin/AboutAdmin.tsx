import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { Save, Image as ImageIcon } from 'lucide-react';
import ImageCropDialog from '../../components/ImageCropDialog';

const DEFAULT_ABOUT = {
  title: "Who is Mahad SEO?",
  description: "I am a results-driven SEO specialist dedicated to helping businesses scale organically. With a deep understanding of search algorithms and a strict adherence to white-hat techniques, I build strategies that deliver sustainable, long-term traffic and revenue growth.",
  image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  stat1_value: "100+",
  stat1_label: "Projects Completed",
  stat2_value: "50M+",
  stat2_label: "Organic Traffic Generated",
  stat3_value: "5+",
  stat3_label: "Years Experience"
};

export default function AboutAdmin() {
  const [content, setContent] = useState(DEFAULT_ABOUT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [cropImageFile, setCropImageFile] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase.from('site_content').select('content').eq('section', 'about').single();
    if (!error && data?.content) {
      setContent(data.content);
    }
    setLoading(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setCropImageFile(reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    setCropImageFile(null);
    setUploadingImage(true);
    try {
      const file = new File([croppedBlob], "cropped.jpg", { type: "image/jpeg" });
      const url = await uploadToCloudinary(file);
      setContent({ ...content, image: url });
    } catch (error) {
      console.error('Upload failed', error);
      alert('Failed to upload image. Check Cloudinary credentials.');
    }
    setUploadingImage(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await supabase.from('site_content').select('id').eq('section', 'about').single();
      
      if (data) {
        await supabase.from('site_content').update({ content }).eq('section', 'about');
      } else {
        await supabase.from('site_content').insert([{ section: 'about', content }]);
      }
      alert('About section updated successfully!');
    } catch (err) {
      console.error('Save failed', err);
      alert('Failed to save content.');
    }
    setSaving(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage About Section</h1>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-70"
        >
          <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-3xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input 
              type="text"
              value={content.title}
              onChange={e => setContent({...content, title: e.target.value})}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-primary outline-none"
              placeholder="Ex. Who is Mahad SEO?"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea 
              value={content.description}
              onChange={e => setContent({...content, description: e.target.value})}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-primary outline-none"
              rows={4}
              placeholder="Detailed description..."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border">
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Stat 1</label>
              <input 
                type="text"
                value={content.stat1_value}
                onChange={e => setContent({...content, stat1_value: e.target.value})}
                className="w-full border p-2 rounded-md mb-2 font-bold"
                placeholder="Value (e.g. 100+)"
              />
              <input 
                type="text"
                value={content.stat1_label}
                onChange={e => setContent({...content, stat1_label: e.target.value})}
                className="w-full border p-2 rounded-md text-sm"
                placeholder="Label"
              />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Stat 2</label>
              <input 
                type="text"
                value={content.stat2_value}
                onChange={e => setContent({...content, stat2_value: e.target.value})}
                className="w-full border p-2 rounded-md mb-2 font-bold"
                placeholder="Value"
              />
              <input 
                type="text"
                value={content.stat2_label}
                onChange={e => setContent({...content, stat2_label: e.target.value})}
                className="w-full border p-2 rounded-md text-sm"
                placeholder="Label"
              />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Stat 3</label>
              <input 
                type="text"
                value={content.stat3_value}
                onChange={e => setContent({...content, stat3_value: e.target.value})}
                className="w-full border p-2 rounded-md mb-2 font-bold"
                placeholder="Value"
              />
              <input 
                type="text"
                value={content.stat3_label}
                onChange={e => setContent({...content, stat3_label: e.target.value})}
                className="w-full border p-2 rounded-md text-sm"
                placeholder="Label"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">About Image</label>
            <div className="flex items-start gap-6">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100">
                <img src={content.image} alt="About Preview" className="w-full h-full object-cover" />
              </div>
              <div className="pt-4">
                <label className="bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2 rounded-md cursor-pointer flex items-center gap-2 text-sm font-medium inline-flex">
                  <ImageIcon size={18} />
                  {uploadingImage ? 'Uploading...' : 'Upload New Image'}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageSelect} disabled={uploadingImage} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {cropImageFile && (
          <ImageCropDialog
            imageSrc={cropImageFile}
            onCropComplete={handleCropComplete}
            onCancel={() => setCropImageFile(null)}
            aspectRatio={1}
          />
        )}
      </div>
    </div>
  );
}
