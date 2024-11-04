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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LightCatalogDialogProps {
  onAddSuccess?: () => void; // Optional callback prop for success handling
}

const LightCatalogDialog: React.FC<LightCatalogDialogProps> = ({
  onAddSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [soort, setSoort] = useState('');
  const [dmx, setDmx] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    try {
      const response = await fetch('/api/inventory/light-catalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tag, brand, type, soort, dmx }),
      });

      if (response.ok) {
        setOpen(false); // Close dialog
        setTag('');
        setBrand('');
        setType('');
        setSoort('');
        setDmx(1); // Reset fields
        onAddSuccess?.(); // Call the parent callback to refresh data
      } else {
        setError('Er was een error, probeer het later opnieuw.');
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
          <Plus /> Nieuw
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Voeg een nieuwe lamp toe</DialogTitle>
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
              <Label htmlFor='brand'>Merk</Label>
              <Input
                id='brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor='type'>Type</Label>
              <Input
                id='type'
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor='soort'>Soort</Label>
              <Input
                id='soort'
                value={soort}
                onChange={(e) => setSoort(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor='dmx'>Aantal Kanalen</Label>
              <Input
                id='dmx'
                type='number'
                value={dmx}
                onChange={(e) => setDmx(Number(e.target.value))}
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

export default LightCatalogDialog;
