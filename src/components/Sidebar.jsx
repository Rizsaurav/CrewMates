import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="text-2xl font-bold mb-4">🚀 Crew</h2>
      <ul className="space-y-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create">Create</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
      </ul>
    </div>
  );
}
