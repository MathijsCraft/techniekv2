'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Inventory } from '@/lib/types';

import { Status } from '@/lib/types'

type LightInventoryEditDialogProps = {
  inventoryItem: Inventory; // Assume Inventory type is defined as per your data
  onEditSuccess: () => void;
};

const LightInventoryEditDialog: React.FC<LightInventoryEditDialogProps> = ({ inventoryItem, onEditSuccess }) => {
  const [number, setNumber] = useState(inventoryItem.nummer);
  const [locatie, setLocatie] = useState(inventoryItem.locatie);
  const [status, setStatus] = useState(inventoryItem.status);
  const [dmx, setDmx] = useState(inventoryItem.dmx);
  const [universe, setUniverse] = useState(inventoryItem.universe);

  const handleSubmit = async () => {
    const response = await fetch('/api/inventory/lighting-inventory', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: inventoryItem.id, number, locatie, status, dmx, universe }),
    });

    if (response.ok) {
      onEditSuccess(); // Call the success callback to refresh data or show success message
    } else {
      console.error('Error updating inventory item');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Inventory Item</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-8'>
            <div>
              <Label htmlFor='number'>Nummer</Label>
              <Input
                id='number'
                type='number'
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor='locatie'>Locatie</Label>
              <Input
                id='locatie'
                value={locatie}
                onChange={(e) => setLocatie(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor='status'>Status</Label>
              <select
                id='status'
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                className="w-full border rounded-md"
              >
                <option value="Werkend">Werkend</option>
                <option value="Ter Reparatie">Ter Reparatie</option>
                <option value="Defect">Defect</option>
              </select>
            </div>
            <div>
              <Label htmlFor='dmx'>DMX</Label>
              <Input
                id='dmx'
                type='number'
                value={dmx}
                onChange={(e) => setDmx(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor='universe'>Universe</Label>
              <Input
                id='universe'
                type='number'
                value={universe}
                onChange={(e) => setUniverse(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Opslaan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LightInventoryEditDialog;
