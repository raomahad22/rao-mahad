import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { Save, Image as ImageIcon } from 'lucide-react';
import ImageCropDialog from '../../components/ImageCropDialog';

const DEFAULT_HERO = {
  title: "SEO Expert\nBased in Worldwide.",
  subtitle: "I'm an experienced SEO Specialist with 5+ years in the field, collaborating with various companies and startups to drive organic growth.",
  image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  greeting: "Hello There!",
  badge1: "SEO Specialist",
  badge2: "Organic Growth",
  badge3: "SEO Expert"
};

export default function HeroAdmin() {
  const [content, setContent] = useState<any>(DEFAULT_HERO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [cropImageFile, setCropImageFile] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase.from('site_content').select('content').eq('section', 'hero').single();
    if (!error && data?.content) {
      // Merge with default values in case keys like greeting or badges don't exist in existing DB records yet
      setContent({ ...DEFAULT_HERO, ...data.content });
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
      // Check if it exists
      const { data } = await supabase.from('site_content').select('id').eq('section', 'hero').single();
      
      if (data) {
        const { error } = await supabase.from('site_content').update({ content }).eq('section', 'hero');
        if (error) throw error;
      } else {
        const { error } = await supabase.from('site_content').insert([{ section: 'hero', content }]);
        if (error) throw error;
      }
      alert('Hero section updated successfully!');
    } catch (err) {
      console.error('Save failed', err);
      alert('Failed to save content.');
    }
    setSaving(false);
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Hero Section</h1>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-70 font-semibold"
        >
          <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-3xl">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Greeting Text</label>
              <input 
                type="text"
                value={content.greeting || ''}
                onChange={e => setContent({...content, greeting: e.target.value})}
                className="w-full border p-2.5 rounded-md focus:ring-2 focus:ring-primary outline-none"
                placeholder="Ex: Hello There!"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Badge 1 (Top-Right on Image)</label>
              <input 
                type="text"
                value={content.badge1 || ''}
                onChange={e => setContent({...content, badge1: e.target.value})}
                className="w-full border p-2.5 rounded-md focus:ring-2 focus:ring-primary outline-none"
                placeholder="Ex: SEO Specialist"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Badge 2 (Bottom-Left on Image)</label>
              <input 
                type="text"
                value={content.badge2 || ''}
                onChange={e => setContent({...content, badge2: e.target.value})}
                className="w-full border p-2.5 rounded-md focus:ring-2 focus:ring-primary outline-none"
                placeholder="Ex: Organic Growth"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Badge 3 (Bottom-Center on Image)</label>
              <input 
                type="text"
                value={content.badge3 || ''}
                onChange={e => setContent({...content, badge3: e.target.value})}
                className="w-full border p-2.5 rounded-md focus:ring-2 focus:ring-primary outline-none"
                placeholder="Ex: SEO Expert"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Main Title</label>
            <textarea 
              value={content.title}
              onChange={e => setContent({...content, title: e.target.value})}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-primary outline-none"
              rows={2}
              placeholder="Ex. Scale Your Business With Proven SEO..."
            />
            <p className="text-xs text-gray-500 mt-1">This text appears right below "I'm Mahad SEO".</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle Description</label>
            <textarea 
              value={content.subtitle}
              onChange={e => setContent({...content, subtitle: e.target.value})}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-primary outline-none"
              rows={3}
              placeholder="Brief description about yourself..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Hero Profile Image</label>
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 flex-shrink-0">
                <img src={content.image} alt="Hero Preview" className="w-full h-full object-cover" />
              </div>
              <div className="pt-4">
                <label className="bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2 rounded-md cursor-pointer flex items-center gap-2 text-sm font-medium inline-flex">
                  <ImageIcon size={18} />
                  {uploadingImage ? 'Uploading...' : 'Upload New Image'}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageSelect} disabled={uploadingImage} />
                </label>
                <p className="text-xs text-gray-500 mt-2 max-w-xs">Upload a high-quality square image. It will crop to a circle automatically.</p>
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
