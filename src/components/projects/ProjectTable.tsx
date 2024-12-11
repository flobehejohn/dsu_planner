import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Edit2, Trash2 } from 'lucide-react';
import { useToastStore } from '../../hooks/useToast';
import { useProjectStore } from '../../store/projectStore';
import type { Project } from '../../types';
import { ACTION_TYPES } from '../../constants/actionTypes';

interface ProjectTableProps {
  onEdit: (id: string) => void;
}

const columnHelper = createColumnHelper<Project>();

const getActionTypeLabel = (type: string) => {
  const actionType = Object.values(ACTION_TYPES).find(
    (action) => action.id === type
  );
  return actionType?.label || 'Non défini';
};

export function ProjectTable({ onEdit }: ProjectTableProps) {
  const projects = useProjectStore((state) => state.projects);
  const removeProject = useProjectStore((state) => state.removeProject);
  const addToast = useToastStore((state) => state.addToast);

  const handleDelete = (id: string) => {
    try {
      removeProject(id);
      addToast('success', 'Projet supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du projet :', error);
      addToast('error', 'Impossible de supprimer le projet');
    }
  };

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Titre',
        cell: (info) => (
          <div className="font-medium text-gray-900">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: (info) => (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {getActionTypeLabel(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor('startDate', {
        header: 'Date de début',
        cell: (info) =>
          format(info.getValue(), 'dd MMMM yyyy', { locale: fr }),
      }),
      columnHelper.accessor('endDate', {
        header: 'Date de fin',
        cell: (info) =>
          format(info.getValue(), 'dd MMMM yyyy', { locale: fr }),
      }),
      columnHelper.accessor('partners', {
        header: 'Partenaires',
        cell: (info) => info.getValue().length,
      }),
      columnHelper.display({
        id: 'actions',
        cell: (info) => (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(info.row.original.id)}
              className="text-gray-400 hover:text-indigo-600"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(info.row.original.id)}
              className="text-gray-400 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      }),
    ],
    [onEdit, removeProject]
  );

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-8 flex flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
