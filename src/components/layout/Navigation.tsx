import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Users, FolderKanban, FileBarChart } from 'lucide-react';

export function Navigation() {
  const navItems = [
    { to: '/projets', icon: FolderKanban, label: 'Projets' },
    { to: '/calendrier', icon: Calendar, label: 'Calendrier' },
    { to: '/partenaires', icon: Users, label: 'Partenaires' },
    { to: '/bilan', icon: FileBarChart, label: 'Bilan d\'Activité' },
  ];

  return (
    <nav className="bg-indigo-700 text-white p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Gestion DSU</h1>
          <div className="flex space-x-6">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
                  ${isActive ? 'bg-indigo-800' : 'hover:bg-indigo-600'}`
                }
              >
                <Icon size={20} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}