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

interface LightingInventoryDialogProps {
  onAddSuccess?: () => void; // Optional callback prop for success handling
}

const LightingInventoryDialog: React.FC<LightingInventoryDialogProps> = ({
  onAddSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState('');
  const [number, setNumber] = useState(1);
  const [locatie, setLocatie] = useState('');
  const [status, setStatus] = useState('WERKEND'); // Default status
  const [dmx, setDmx] = useState(1);
  const [universe, setUniverse] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    try {
      const response = await fetch('/api/inventory/light-inventory', {
        // Adjust the API endpoint as necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tag, number, locatie, status, dmx, universe }),
      });

      if (response.ok) {
        setOpen(false); // Close dialog
        setTag('');
        setNumber(1);
        setLocatie('');
        setStatus('WERKEND');
        setDmx(1);
        setUniverse(1); // Reset fields
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
            Voeg een nieuwe fixture toe aan de inventaris
          </DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-8'>
            <div>
              <Label htmlFor='tag'>ID</Label>
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
              <Label htmlFor='dmx'>DMX Startadres</Label>
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
          {error && <p className='text-red-500'>{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Opslaan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LightingInventoryDialog;
