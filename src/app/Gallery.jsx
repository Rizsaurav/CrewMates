// src/app/Gallery.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../client';

export default function Gallery() {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from('crew mates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching crewmates:', error);
      else setCrewmates(data);
    };

    fetchCrewmates();
  }, []);

  const getCategoryStats = () => {
    const stats = {};
    for (let cm of crewmates) {
      const cat = cm.category || 'Uncategorized';
      stats[cat] = (stats[cat] || 0) + 1;
    }
    return stats;
  };

  const getColorStats = () => {
    const stats = {};
    for (let cm of crewmates) {
      const color = cm.color || 'Unknown';
      stats[color] = (stats[color] || 0) + 1;
    }
    return stats;
  };

  const categoryStats = getCategoryStats();
  const colorStats = getColorStats();

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8">The Crew</h1>

      {/* Summary Stats */}
      {crewmates.length > 0 && (
        <div className="mb-10 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Summary Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-bold mb-1">By Category</h3>
              <ul className="text-sm text-gray-700">
                {Object.entries(categoryStats).map(([cat, count]) => (
                  <li key={cat}>{cat}: {count}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-1">By Color</h3>
              <ul className="text-sm text-gray-700">
                {Object.entries(colorStats).map(([color, count]) => (
                  <li key={color}>{color}: {count}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-1">Total Crewmates</h3>
              <p className="text-lg font-semibold">{crewmates.length}</p>
            </div>
          </div>
        </div>
      )}

      {crewmates.length === 0 ? (
        <p className="text-center text-gray-600">No Crewmates Yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {crewmates.map((mate) => (
            <div key={mate.id} className="bg-white rounded-lg shadow p-4 text-left">
              <img
                src={mate.image_url || 'https://placehold.co/200x200?text=Crewmate'}
                alt={mate.username}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{mate.username}</h2>
              <p><strong>Category:</strong> {mate.category || 'None'}</p>
              <p><strong>Color:</strong> {mate.color}</p>
              <p><strong>Role:</strong> {mate.role || 'Unassigned'}</p>
              <p><strong>Location:</strong> {mate.location || 'Unknown'}</p>
              <p><strong>Description:</strong> {mate.description || 'No description provided.'}</p>

              <Link to={`/crewmate/${mate.id}`}>
                <button className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
