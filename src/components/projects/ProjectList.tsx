import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import { ProjectTable } from './ProjectTable';
import { ProjectDialog } from './ProjectDialog';

export function ProjectList() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const projects = useProjectStore((state) => state.projects);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Projets</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsDialogOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau Projet
        </motion.button>
      </div>

      <ProjectTable projects={projects} onEdit={(id) => console.log('Edit project:', id)} />
      
      <ProjectDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        mode="create"
      />
    </div>
  );
}