import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex gap-4 bg-muted p-4 text-white">
      <Link to="/">Home</Link>
      <Link to="/create">Create</Link>
      <Link to="/gallery">Gallery</Link>
    </nav>
  );
}
