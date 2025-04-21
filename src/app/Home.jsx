// src/app/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center mt-16">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Crewmate Creator!</h1>
      <p className="text-lg mb-8">
        Here is where you can create your very own set of crewmates before sending them off into space!
      </p>
      <img src="./vite.png" alt="Crewmates and UFO" className="mx-auto" />
    </div>
  );
}