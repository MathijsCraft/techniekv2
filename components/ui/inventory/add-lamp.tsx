import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LightCatalogDialog: React.FC = () => {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      tag: event.currentTarget.tag.value,
      brand: event.currentTarget.brand.value,
      type: event.currentTarget.type.value,
      soort: event.currentTarget.soort.value,
      dmx: parseInt(event.currentTarget.dmx.value, 10),
    };

    try {
      const response = await fetch('/api/inventory/light-catalog-add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newLamp = await response.json();
        console.log('Lamp added:', newLamp);

        // Close the form and refresh the data
      } else {
        const errorResponse = await response.json();
        console.error('Failed to add lamp:', errorResponse.error);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Toevoegen
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[800px] sm:max-w-[425px] md:max-w-full'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Een lamp toevoegen</DialogTitle>
            <DialogDescription>Voeg een lamp toe aan de catalogus.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-2 gap-8'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='tag' className='text-right'>Tag</Label>
                <Input id='tag' className='col-span-3' required />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='brand' className='text-right'>Merk</Label>
                <Input id='brand' className='col-span-3' required />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='type' className='text-right'>Type</Label>
                <Input id='type' className='col-span-3' required />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='soort' className='text-right'>Soort</Label>
                <Input id='soort' className='col-span-3' required />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='dmx' className='text-right'>Aantal Kanalen</Label>
                <Input id='dmx' type='number' className='col-span-3' required />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Toevoegen</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LightCatalogDialog;
