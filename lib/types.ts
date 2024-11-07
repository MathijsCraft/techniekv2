export type Status = 'WERKEND' | 'TER_REPARATIE' | 'DEFECT';

export type Inventory = {
  id: string;
  tag: string;
  number: number;
  locatie: string;
  status: Status;
  dmx: number;
  universe: number;
};

export type Catalogus = {
  id: string;
  tag: string;
  brand: string;
  type: string;
  soort: string;
  dmx: number;
};

// Define the structure of an inventory item for sound
export type SoundInventory = {
  id: string; // Unique identifier for the sound inventory item
  tag: string; // Unique tag for the sound item
  number: number; // Identifier or quantity of the sound item
  locatie: string; // Location of the sound inventory item
  status: Status; // Current status of the sound item
  patch?: string; // Optional field for specifying the sound patch
  stereo: boolean; // Indicates if the sound item supports stereo
};

// Define the structure of a catalog entry for sound
export type SoundCatalogus = {
  id: string; // Unique identifier for the sound catalog entry
  tag: string; // Unique tag for the sound item
  brand: string; // Brand of the sound equipment
  type: string; // Type of sound equipment
  extraInfo?: string; // Optional additional information about the sound item
};
