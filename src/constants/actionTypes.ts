export const ACTION_TYPES = {
  CULTURAL: {
    id: 'cultural',
    label: 'Actions Culturelles',
    subTypes: [
      'Ateliers artistiques',
      'Projections de films',
      'Concerts et spectacles',
      'Festivals culturels',
      'Expositions'
    ]
  },
  EDUCATIONAL: {
    id: 'educational',
    label: 'Actions Éducatives',
    subTypes: [
      'Ateliers pédagogiques',
      'Conférences',
      'Formations professionnelles',
      'Soutien scolaire',
      'Sensibilisation environnementale'
    ]
  },
  SOCIAL: {
    id: 'social',
    label: 'Actions Sociales',
    subTypes: [
      'Rencontres intergénérationnelles',
      'Fêtes de quartier',
      'Distribution de biens',
      'Permanences sociales',
      'Ateliers d\'insertion'
    ]
  },
  SPORT: {
    id: 'sport',
    label: 'Actions Sportives',
    subTypes: [
      'Tournois sportifs',
      'Activités fitness',
      'Randonnées',
      'Initiations sportives'
    ]
  },
  ENVIRONMENTAL: {
    id: 'environmental',
    label: 'Actions Environnementales',
    subTypes: [
      'Nettoyage collectif',
      'Jardinage et compostage',
      'Création espaces verts',
      'Sensibilisation tri'
    ]
  },
  ECONOMIC: {
    id: 'economic',
    label: 'Actions Économiques',
    subTypes: [
      'Forums emploi',
      'Bourses d\'échange',
      'Marchés locaux',
      'Networking'
    ]
  },
  CIVIC: {
    id: 'civic',
    label: 'Actions Citoyennes',
    subTypes: [
      'Réunions publiques',
      'Votes participatifs',
      'Portes ouvertes',
      'Consultations'
    ]
  }
} as const;