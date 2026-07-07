import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Mail, Phone, MapPin, DollarSign, Target, Calendar } from 'lucide-react';

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setContacts(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      await supabase.from('contacts').delete().eq('id', id);
      fetchContacts();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Submissions</h1>
      </div>

      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <div className="space-y-6">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-primary">{contact.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><Mail size={14} /> {contact.email}</span>
                    {contact.phone && <span className="flex items-center gap-1"><Phone size={14} /> {contact.phone}</span>}
                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(contact.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(contact.id)} 
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  title="Delete Message"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg text-sm">
                <div>
                  <span className="block text-gray-500 mb-1 flex items-center gap-1"><Target size={14}/> Interested In</span>
                  <span className="font-medium">{contact.interest || 'Not specified'}</span>
                </div>
                <div>
                  <span className="block text-gray-500 mb-1 flex items-center gap-1"><DollarSign size={14}/> Budget</span>
                  <span className="font-medium">{contact.budget || 'Not specified'}</span>
                </div>
                <div>
                  <span className="block text-gray-500 mb-1 flex items-center gap-1"><MapPin size={14}/> Country</span>
                  <span className="font-medium">{contact.country || 'Not specified'}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Message:</h4>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">{contact.message}</p>
              </div>
            </div>
          ))}
          {contacts.length === 0 && (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
              No messages found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
