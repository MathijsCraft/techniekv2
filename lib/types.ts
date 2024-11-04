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
