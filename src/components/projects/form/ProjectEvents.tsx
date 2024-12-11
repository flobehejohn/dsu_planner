import React from 'react';
import { Plus, X } from 'lucide-react';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';

export function ProjectEvents() {
  const { control, watch, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'events',
  });

  const projectStartDate = watch('startDate');
  const projectEndDate = watch('endDate');

  return (
    <div>
      <button
        type="button"
        onClick={() => append({ title: '', description: '', startDate: projectStartDate, endDate: projectEndDate, location: '', type: '' })}
        className="bg-indigo-100 text-indigo-700"
      >
        Ajouter un événement
      </button>

      {fields.map((field, index) => (
        <div key={field.id}>
          <Controller
            name={`events.${index}.startDate`}
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                minDate={projectStartDate}
                maxDate={projectEndDate}
              />
            )}
          />
          {errors?.events?.[index]?.startDate && (
            <p className="text-red-600">{errors.events[index].startDate.message}</p>
          )}

          {/* Similar validation for other fields */}
        </div>
      ))}
    </div>
  );
}
