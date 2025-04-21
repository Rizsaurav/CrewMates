import React from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
}
