import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../client';

export default function EditCrewmate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState({ name: '', speed: '', color: '' });

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data } = await supabase.from('crewmates').select('*').eq('id', id).single();
      setCrewmate(data);
    };
    fetchCrewmate();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await supabase.from('crewmates').update(crewmate).eq('id', id);
    navigate('/gallery');
  };

  const handleDelete = async () => {
    await supabase.from('crewmates').delete().eq('id', id);
    navigate('/gallery');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Edit Crewmate</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input value={crewmate.name} onChange={(e) => setCrewmate({ ...crewmate, name: e.target.value })} placeholder="Name" className="w-full p-2 border rounded" />
        <input value={crewmate.speed} onChange={(e) => setCrewmate({ ...crewmate, speed: e.target.value })} placeholder="Speed" className="w-full p-2 border rounded" />
        <input value={crewmate.color} onChange={(e) => setCrewmate({ ...crewmate, color: e.target.value })} placeholder="Color" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Update</button>
        <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ml-4">Delete</button>
      </form>
    </div>
  );
}
