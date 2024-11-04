import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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

interface SoundInventoryDialogProps {
  onAddSuccess?: () => void; // Optional callback prop for success handling
}

const SoundInventoryDialog: React.FC<SoundInventoryDialogProps> = ({
  onAddSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState('');
  const [number, setNumber] = useState(1);
  const [locatie, setLocatie] = useState('');
  const [status, setStatus] = useState('WERKEND'); // Default status
  const [patch, setPatch] = useState('');
  const [stereo, setStereo] = useState(false); // Default stereo to false
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    try {
      const response = await fetch('/api/inventory/sound-inventory', {
        // Adjust the API endpoint as necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tag, number, locatie, status, patch, stereo }),
      });

      if (response.ok) {
        setOpen(false); // Close dialog
        setTag('');
        setNumber(1);
        setLocatie('');
        setStatus('WERKEND');
        setPatch('');
        setStereo(false); // Reset fields
        onAddSuccess?.(); // Call the parent callback to refresh data
      } else {
        setError('Er was een error. Kijk even of de gebruikte tag wel in de catalogus staat.');
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
          <Plus />
          Nieuw
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Voeg een nieuw geluidselement toe aan de inventaris
          </DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-8'>
            <div>
              <Label htmlFor='tag'>Tag</Label>
              <Input
                id='tag'
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
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
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className='w-full'>
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
              <Label htmlFor='patch'>Patch</Label>
              <Input
                id='patch'
                value={patch}
                onChange={(e) => setPatch(e.target.value)}
              />
            </div>
            <div>
            <Label htmlFor='stereo'>Stereo</Label>
      <Select
        value={stereo ? 'STEREO' : 'MONO'} // Convert boolean to string for the Select component
        onValueChange={(value) => setStereo(value === 'STEREO')} // Convert string back to boolean
      >
        <SelectTrigger className='w-full rounded-md border'>
          <SelectValue placeholder='Select Stereo/Mono' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='STEREO'>Stereo</SelectItem>
          <SelectItem value='MONO'>Mono</SelectItem>
        </SelectContent>
      </Select>
            </div>
          </div>
          {error && <p className='text-red-500'>{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Opslaan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SoundInventoryDialog;
