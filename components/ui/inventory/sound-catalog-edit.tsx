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
import { SoundCatalogus } from '@/lib/types';

interface SoundCatalogEditDialogProps {
  inventory: SoundCatalogus; // The inventory item to edit
  onUpdateSuccess: () => void; // Callback on successful update
  onDeleteSuccess: () => void; // Callback on successful delete
}

const SoundCatalogEditDialog: React.FC<SoundCatalogEditDialogProps> = ({
  inventory,
  onUpdateSuccess,
  onDeleteSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dialog open/close
  const [tag, setTag] = useState(inventory.tag);
  const [brand, setBrand] = useState(inventory.brand);
  const [type, setType] = useState(inventory.type);
  const [extraInfo, setExtraInfo] = useState(inventory.extraInfo || '');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  // Unique ID for the inventory item from the database
  const uniqueId = inventory.id; // This should be a string

  // Function to handle saving updates
  const handleSave = async () => {
    try {
      const response = await fetch(
        `/api/inventory/sound-catalog?id=${uniqueId}`,
        {
          method: 'PUT', // Use PUT for updating an existing item
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tag, brand, type, extraInfo }),
        }
      );

      if (response.ok) {
        onUpdateSuccess(); // Call the parent callback to refresh data
        setIsOpen(false); // Close the dialog after saving
        setErrorMessage(null); // Clear any previous error messages
      } else {
        setErrorMessage('Er was een error, probeer het later opnieuw.'); // Set error message for UI
      }
    } catch (err) {
      setErrorMessage(
        'An unexpected error occurred: ' + (err as Error).message
      );
      console.error('An unexpected error occurred:', err);
    }
  };

  // Function to handle deletion of the item
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/inventory/sound-catalog?id=${uniqueId}`,
        {
          method: 'DELETE', // Use DELETE for removing the item
        }
      );

      if (response.ok) {
        onDeleteSuccess(); // Call the parent callback to refresh data
        setIsOpen(false); // Close the dialog after deleting
        setErrorMessage(null); // Clear any previous error messages
      } else {
        setErrorMessage(
          'Er was een error, waarschijnlijk is deze tag in gebruik.'
        ); // Set error message for UI
      }
    } catch (err) {
      setErrorMessage(
        'An unexpected error occurred: ' + (err as Error).message
      );
      console.error('An unexpected error occurred:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            Maak aanpassingen aan het geluid in de catalogus.
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
              <Label htmlFor='extraInfo' className='text-right'>
                Extra Informatie
              </Label>
              <Input
                id='extraInfo'
                value={extraInfo}
                className='col-span-3'
                onChange={(e) => setExtraInfo(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Render error message if it exists */}
        {errorMessage && (
          <div className='error-message text-red-600'>
            <p>{errorMessage}</p>
          </div>
        )}
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
                  Deze actie kan niet ongedaan gemaakt worden. Dit zal het
                  geluid permanent verwijderen.
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

export default SoundCatalogEditDialog;
