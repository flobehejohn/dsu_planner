import React from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ProjectForm } from './form/ProjectForm';
import { useProjectStore } from '../../store/projectStore';
import { useToastStore } from '../../hooks/useToast';
import { v4 as uuidv4 } from 'uuid';

interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ProjectDialog({ open, onClose }: ProjectDialogProps) {
  const addProject = useProjectStore((state) => state.addProject);
  const addToast = useToastStore((state) => state.addToast);

  const handleCreate = (data) => {
    try {
      const newProject = { ...data, id: uuidv4() };
      addProject(newProject);
      addToast('success', 'Projet créé avec succès');
      onClose();
    } catch (error) {
      addToast('error', 'Erreur lors de la création du projet');
      console.error(error);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={open}
          onClose={onClose}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-lg font-medium">Nouveau Projet</Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ProjectForm onSubmit={handleCreate} />

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Annuler
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
