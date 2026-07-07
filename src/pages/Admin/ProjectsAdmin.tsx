import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { Trash2, Edit2, Plus, Image as ImageIcon } from 'lucide-react';

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>({ title: '', image: '', tags: [] });
  const [tagInput, setTagInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingImage(true);
    try {
      const url = await uploadToCloudinary(e.target.files[0]);
      setCurrentProject({ ...currentProject, image: url });
    } catch (error) {
      console.error('Upload failed', error);
      alert('Failed to upload image. Check Cloudinary credentials.');
    }
    setUploadingImage(false);
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setCurrentProject({ ...currentProject, tags: [...currentProject.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setCurrentProject({
      ...currentProject,
      tags: currentProject.tags.filter((_: any, index: number) => index !== indexToRemove)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProject.id) {
      // Update
      await supabase.from('projects').update({
        title: currentProject.title,
        image: currentProject.image,
        tags: currentProject.tags
      }).eq('id', currentProject.id);
    } else {
      // Insert
      await supabase.from('projects').insert([{
        title: currentProject.title,
        image: currentProject.image,
        tags: currentProject.tags
      }]);
    }
    setIsEditing(false);
    setCurrentProject({ title: '', image: '', tags: [] });
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await supabase.from('projects').delete().eq('id', id);
      fetchProjects();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <button 
          onClick={() => { setIsEditing(true); setCurrentProject({ title: '', image: '', tags: [] }); }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-4">{currentProject.id ? 'Edit Project' : 'Add New Project'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input 
                type="text" 
                value={currentProject.title}
                onChange={e => setCurrentProject({...currentProject, title: e.target.value})}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <div className="flex items-center gap-4">
                {currentProject.image && (
                  <img src={currentProject.image} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
                )}
                <label className="bg-gray-100 px-4 py-2 rounded-md cursor-pointer flex items-center gap-2">
                  <ImageIcon size={18} />
                  {uploadingImage ? 'Uploading...' : 'Upload Image'}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tags</label>
              <div className="flex gap-2 mb-2">
                <input 
                  type="text" 
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  className="flex-1 border p-2 rounded-md"
                  placeholder="Add a tag (e.g. SEO, Marketing)"
                />
                <button type="button" onClick={handleAddTag} className="bg-gray-200 px-4 py-2 rounded-md">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProject.tags.map((tag: string, index: number) => (
                  <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm flex items-center gap-1">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(index)} className="text-red-500 hover:text-red-700">&times;</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md">Save Project</button>
              <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-200 px-6 py-2 rounded-md">Cancel</button>
            </div>
          </form>
        </div>
      ) : null}

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                <div className="flex gap-1 mb-4 flex-wrap">
                  {project.tags.map((tag: string, index: number) => (
                    <span key={index} className="bg-gray-100 px-2 py-1 rounded-md text-xs">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-2 border-t pt-4">
                  <button onClick={() => { setCurrentProject(project); setIsEditing(true); }} className="flex-1 flex justify-center items-center gap-1 bg-gray-50 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
                    <Edit2 size={16} /> Edit
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="flex-1 flex justify-center items-center gap-1 bg-red-50 text-red-600 py-2 rounded-md text-sm font-medium hover:bg-red-100">
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && !loading && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No projects found. Add one above.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
