export type Status = 'Werkend' | 'Ter Reparatie' | 'Defect';

export type Inventory = {
    id: string;
    tag: string;
    nummer: number;
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