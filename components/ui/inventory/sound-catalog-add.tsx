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

interface SoundCatalogDialogProps {
  onAddSuccess?: () => void; // Optional callback prop for success handling
}

const SoundCatalogDialog: React.FC<SoundCatalogDialogProps> = ({
  onAddSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    try {
      const response = await fetch('/api/inventory/sound-catalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tag, brand, type, extraInfo }),
      });

      if (response.ok) {
        setOpen(false); // Close dialog
        setTag('');
        setBrand('');
        setType('');
        setExtraInfo(''); // Reset fields
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
          <DialogTitle>Voeg nieuwe randapparatuur toe</DialogTitle>
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
              <Label htmlFor='extraInfo'>Extra Informatie</Label>
              <Input
                id='extraInfo'
                value={extraInfo}
                onChange={(e) => setExtraInfo(e.target.value)}
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

export default SoundCatalogDialog;
