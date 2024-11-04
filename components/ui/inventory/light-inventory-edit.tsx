'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Inventory, Status } from '@/lib/types';

import { Edit } from 'lucide-react';

type LightInventoryEditDialogProps = {
  inventoryItem: Inventory; // Assume Inventory type is defined as per your data
  onEditSuccess: () => void;
};

const LightInventoryEditDialog: React.FC<LightInventoryEditDialogProps> = ({
  inventoryItem,
  onEditSuccess,
}) => {
  const [tag, setTag] = useState('');
  const [number, setNumber] = useState(1);
  const [locatie, setLocatie] = useState('');
  const [status, setStatus] = useState('WERKEND'); // Default status
  const [dmx, setDmx] = useState(1);
  const [universe, setUniverse] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (inventoryItem) {
      setTag(inventoryItem.tag || '');
      setNumber(inventoryItem.number || 1);
      setLocatie(inventoryItem.locatie || ''); 
      setStatus(inventoryItem.status || 'WERKEND'); 
      setDmx(inventoryItem.dmx || 1); 
      setUniverse(inventoryItem.universe || 1); 
    }
  }, [inventoryItem]);

  const handleSubmit = async () => {
    setError(null); 
    try {
      const response = await fetch(`/api/inventory/light-inventory?id=${inventoryItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: inventoryItem.id,
          number,
          locatie,
          status,
          dmx,
          universe,
        }),
      });
  
      if (response.ok) {
        setTag('');
        setNumber(1);
        setLocatie('');
        setStatus('WERKEND');
        setDmx(1);
        setUniverse(1);
        
        onEditSuccess();
        setOpen(false);
      } else {
        setError('Error updating inventory item');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Edit /> Bewerken
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fixture Bewerken</DialogTitle>
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
              <Select
                value={status}
                onValueChange={(value: Status) => setStatus(value)}
              >
                <SelectTrigger className='w-full rounded-md border'>
                  <SelectValue placeholder='Select Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='WERKEND'>Werkend</SelectItem>
                  <SelectItem value='TER_REPARATIE'>Ter Reparatie</SelectItem>
                  <SelectItem value='DEFECT'>Defect</SelectItem>
                </SelectContent>
              </Select>
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
