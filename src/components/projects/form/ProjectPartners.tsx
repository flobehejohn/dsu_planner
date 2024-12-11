import React from 'react';
import Select from 'react-select';
import { Plus, Trash2 } from 'lucide-react';
import type { Partner, PartnerRole } from '../../../types';

const PARTNER_ROLES: { value: PartnerRole; label: string }[] = [
  { value: 'principal', label: 'Partenaire principal' },
  { value: 'benevole', label: 'Bénévole' },
  { value: 'prestataire', label: 'Prestataire' },
];

export function ProjectPartners() {
  const [partners, setPartners] = React.useState<
    Array<{ partner: Partner | null; role: PartnerRole | null }>
  >([]);

  const addPartner = () => {
    setPartners([...partners, { partner: null, role: null }]);
  };

  const removePartner = (index: number) => {
    setPartners(partners.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Partenaires
        </label>
        <button
          type="button"
          onClick={addPartner}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="w-4 h-4 mr-1" />
          Ajouter un partenaire
        </button>
      </div>

      <div className="space-y-4">
        {partners.map((partnerEntry, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-1">
              <Select
                placeholder="Sélectionner un partenaire"
                // options={partnerOptions} // À implémenter avec les vrais partenaires
                value={partnerEntry.partner}
                onChange={(value) =>
                  setPartners(
                    partners.map((p, i) =>
                      i === index ? { ...p, partner: value } : p
                    )
                  )
                }
              />
            </div>
            <div className="w-48">
              <Select
                placeholder="Rôle"
                options={PARTNER_ROLES}
                value={PARTNER_ROLES.find((role) => role.value === partnerEntry.role)}
                onChange={(value) =>
                  setPartners(
                    partners.map((p, i) =>
                      i === index ? { ...p, role: value?.value || null } : p
                    )
                  )
                }
              />
            </div>
            <button
              type="button"
              onClick={() => removePartner(index)}
              className="text-gray-400 hover:text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}