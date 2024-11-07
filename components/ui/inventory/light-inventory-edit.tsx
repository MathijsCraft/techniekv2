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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Inventory, Status } from '@/lib/types';

import { Edit } from 'lucide-react';

type LightInventoryEditDialogProps = {
  inventoryItem: Inventory; // Assume Inventory type is defined as per your data
  onUpdateSuccess: () => void; // Callback on successful update
  onDeleteSuccess: () => void; // Callback on successful delete
};

const LightInventoryEditDialog: React.FC<LightInventoryEditDialogProps> = ({
  inventoryItem,
  onUpdateSuccess,
  onDeleteSuccess,
}) => {
  const [number, setNumber] = useState(1);
  const [locatie, setLocatie] = useState('');
  const [status, setStatus] = useState('WERKEND'); // Default status
  const [dmx, setDmx] = useState(1);
  const [universe, setUniverse] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (inventoryItem) {
      setNumber(inventoryItem.number || 1);
      setLocatie(inventoryItem.locatie || '');
      setStatus(inventoryItem.status || 'WERKEND');
      setDmx(inventoryItem.dmx || 1);
      setUniverse(inventoryItem.universe || 1);
    }
  }, [inventoryItem]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `/api/inventory/light-inventory?id=${inventoryItem.id}`,
        {
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
        }
      );

      if (response.ok) {
        setNumber(1);
        setLocatie('');
        setStatus('WERKEND');
        setDmx(1);
        setUniverse(1);

        onUpdateSuccess();
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/inventory/light-inventory?id=${inventoryItem.id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        onDeleteSuccess(); // Call the success callback to refresh data or show success message
        setOpen(false); // Close the form after deletion
      } else {
        console.error('Er was een error, probeer het later opnieuw.');
      }
    } catch (err) {
      console.error('An unexpected error occurred while deleting:', err);
    } finally {
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>Verwijderen</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Weet je zeker dat je wilt verwijderen?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Deze actie kan niet ongedaan gemaakt worden. Dit zal de lamp
                  permanent verwijderen.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuleren</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Doorgaan
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LightInventoryEditDialog;
