// src/app/CrewmateDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../client';

export default function CrewmateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    category: '',
    color: '',
    role: '',
    location: '',
    image_url: '',
    description: ''
  });

  const categoryOptions = ['Engineer', 'Pilot', 'Medic', 'Spy'];
  const roleOptions = {
    Engineer: ['Mechanic', 'Builder'],
    Pilot: ['Captain', 'Navigator'],
    Medic: ['Doctor', 'Surgeon'],
    Spy: ['Agent', 'Decoder']
  };

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('crew mates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error("Fetch error:", error);
      else {
        setCrewmate(data);
        setFormData(data);
      }
    };

    if (id) fetchCrewmate();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('crew mates')
      .update(formData)
      .eq('id', id);

    if (error) console.error("Update error:", error);
    else {
      setIsEditing(false);
      setCrewmate(formData);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this crewmate?");
    if (!confirmed) return;

    const { error } = await supabase.from('crew mates').delete().eq('id', id);
    if (error) {
      console.error("Delete error:", error);
    } else {
      navigate('/gallery');
    }
  };

  if (!crewmate) return <div className="text-center mt-16">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <Link to="/gallery">
          <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
            ← Back to Gallery
          </button>
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
        >
          🗑 Delete Crewmate
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        {!isEditing ? (
          <>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img
                src={crewmate.image_url || 'https://placehold.co/200x200?text=Crewmate'}
                alt={crewmate.username}
                className="w-40 h-40 object-cover rounded-full border"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{crewmate.username}</h1>
                <p><strong>Category:</strong> {crewmate.category}</p>
                <p><strong>Color:</strong> {crewmate.color}</p>
                <p><strong>Role:</strong> {crewmate.role || 'Unassigned'}</p>
                <p><strong>Location:</strong> {crewmate.location || 'Unknown'}</p>
                <p><strong>Description:</strong> {crewmate.description || 'N/A'}</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600"
                onClick={() => setIsEditing(true)}
              >
                ✎ Edit Crewmate
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="grid gap-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a Category</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select a Role</option>
              {(roleOptions[formData.category] || []).map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <select
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            >
              <option value="">Select color</option>
              <option value="Red">Red</option>
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
              <option value="Purple">Purple</option>
              <option value="Yellow">Yellow</option>
              <option value="Orange">Orange</option>
              <option value="Pink">Pink</option>
              <option value="Rainbow">Rainbow</option>
            </select>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
            />
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="Image URL"
            />
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            ></textarea>
            <div className="flex gap-4 justify-center">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                ✅ Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                ✖ Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}