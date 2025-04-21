// src/app/Create.jsx
import React, { useState } from 'react';
import { supabase } from '../../client';

export default function Create() {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('crew mates').insert([formData]);
    if (error) {
      console.error('Insert error:', error);
    } else {
      setFormData({
        username: '',
        category: '',
        color: '',
        role: '',
        location: '',
        image_url: '',
        description: ''
      });
    }
  };

  return (
    <div className="create-container">
      <h1 className="form-title">Create a New Crewmate</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
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
          <option value="">Select a color</option>
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
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        ></textarea>

        <button type="submit" className="create-btn">Create</button>
      </form>
    </div>
  );
}
