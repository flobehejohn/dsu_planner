import React from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import { fr } from 'date-fns/locale';
import { useToastStore } from '../../../hooks/useToast';
import 'react-datepicker/dist/react-datepicker.css';
import { ProjectImageUpload } from './ProjectImageUpload';
import { ProjectPartners } from './ProjectPartners';
import { ProjectEvents } from './ProjectEvents';
import { ProjectMap } from './ProjectMap';
import type { Project } from '../../../types';

// Définition du schéma de validation Zod
const projectSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  description: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional().refine(
    (endDate, ctx) => {
      const startDate = ctx?.parent?.startDate;
      return !startDate || !endDate || endDate > startDate;
    },
    { message: 'La date de fin doit être après la date de début' }
  ),
  type: z.string().optional(),
  address: z.string().optional(),
  budget: z
    .number()
    .min(0, 'Le budget doit être un nombre positif')
    .optional(),
  events: z
    .array(
      z.object({
        id: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        location: z.string().optional(),
        type: z.string().optional(),
      })
    )
    .optional(),
  partners: z
    .array(
      z.object({
        id: z.string().optional(),
        role: z.string().optional(),
      })
    )
    .optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
}

export function ProjectForm({ onSubmit }: ProjectFormProps) {
  const addToast = useToastStore((state) => state.addToast);

  const methods = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      type: '',
      address: '',
      budget: 0,
      events: [],
      partners: [],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleSubmitWithValidation = async (data: ProjectFormData) => {
    try {
      const validatedData = projectSchema.parse(data);
      onSubmit(validatedData);
      addToast('success', 'Projet créé avec succès');
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          addToast('error', err.message);
        });
      } else {
        addToast('error', 'Erreur inattendue lors de la création du projet');
        console.error(error);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        id="project-form"
        onSubmit={handleSubmit(handleSubmitWithValidation)}
        className="space-y-6"
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre du projet *
          </label>
          <input
            type="text"
            id="title"
            {...register('title')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date de début *
            </label>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  locale="fr"
                  dateFormat="dd/MM/yyyy"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              )}
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date de fin *
            </label>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  minDate={methods.watch('startDate')}
                  locale="fr"
                  dateFormat="dd/MM/yyyy"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              )}
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
            Budget
          </label>
          <input
            type="number"
            id="budget"
            {...register('budget', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.budget && (
            <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
          )}
        </div>

        <ProjectMap position={{ lat: 48.8566, lng: 2.3522 }} onPositionChange={() => {}} />
        <ProjectImageUpload />
        <ProjectPartners />
        <ProjectEvents />

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Créer
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
