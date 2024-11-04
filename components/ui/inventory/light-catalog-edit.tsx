import { useState } from 'react';
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
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
import { Catalogus } from '@/lib/types';

interface LightCatalogEditDialogProps {
  inventory: Catalogus; // The inventory item to edit
  onUpdateSuccess: () => void; // Callback on successful update
  onDeleteSuccess: () => void; // Callback on successful delete
}

const LightCatalogEditDialog: React.FC<LightCatalogEditDialogProps> = ({
  inventory,
  onUpdateSuccess,
  onDeleteSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dialog open/close
  const [tag, setTag] = useState(inventory.tag);
  const [brand, setBrand] = useState(inventory.brand);
  const [soort, setSoort] = useState(inventory.soort);
  const [type, setType] = useState(inventory.type);
  const [dmx, setDMX] = useState(inventory.dmx || 1);

  // Unique ID for the inventory item from the database
  const uniqueId = inventory.id; // This should be a string

  // Function to handle saving updates
  const handleSave = async () => {
    try {
      const response = await fetch(
        `/api/inventory/light-catalog?id=${uniqueId}`,
        {
          // Use unique ID in URL
          method: 'PUT', // Use PUT for updating an existing item
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tag, brand, soort, type, dmx }),
        }
      );

      if (response.ok) {
        onUpdateSuccess(); // Call the parent callback to refresh data
        setIsOpen(false); // Close the dialog after saving
      } else {
        console.error('Error updating item');
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err);
    }
  };

  // Function to handle deletion of the item
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/inventory/light-catalog?id=${uniqueId}`,
        {
          // Use unique ID in URL
          method: 'DELETE', // Use DELETE for removing the item
        }
      );

      if (response.ok) {
        onDeleteSuccess(); // Call the parent callback to refresh data
        setIsOpen(false); // Close the dialog after deleting
      } else {
        console.error('Error deleting item');
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {' '}
      {/* Manage open state */}
      <DialogTrigger asChild>
        <Button>
          <Pencil /> Bewerken
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[800px] sm:max-w-[425px] md:max-w-full'>
        <DialogHeader>
          <DialogTitle>
            Catalogus: {inventory.tag} {/* Show the human-readable tag */}
          </DialogTitle>
          <DialogDescription>
            Maak aanpassingen aan de lamp in de catalogus.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-8'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='tag' className='text-right'>
                Tag
              </Label>
              <Input
                id='tag'
                value={tag}
                className='col-span-3'
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='brand' className='text-right'>
                Merk
              </Label>
              <Input
                id='brand'
                value={brand}
                className='col-span-3'
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='type' className='text-right'>
                Type
              </Label>
              <Input
                id='type'
                value={type}
                className='col-span-3'
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='soort' className='text-right'>
                Soort
              </Label>
              <Input
                id='soort'
                value={soort}
                className='col-span-3'
                onChange={(e) => setSoort(e.target.value)}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='dmx' className='text-right'>
                Aantal Kanalen
              </Label>
              <Input
                id='dmx'
                value={dmx}
                className='col-span-3'
                onChange={(e) => setDMX(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type='button' onClick={handleSave}>
            Opslaan
          </Button>
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

export default LightCatalogEditDialog;
