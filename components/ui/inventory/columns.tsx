'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

import { Badge } from '@/components/ui/badge';

import LightCatalogDialog from '@/components/ui/inventory/add-lamp'

type Status = 'Werkend' | 'Ter Reparatie' | 'Defect';

export type Inventory = {
  id: string;
  nummer: number;
  locatie: string;
  status: Status;
  dmx: number;
};

export type Catalogus = {
  tag: string;
  brand: string;
  type: string;
  soort: string;
  dmx: number;
};

export const LichtInventarisColumns: ColumnDef<Inventory>[] = [
  {
    accessorKey: 'tag',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        ID
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'nummer',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Nummer
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const nummer = parseFloat(row.getValue('nummer'));
      const formatted = new Intl.NumberFormat('en', {
        minimumIntegerDigits: 3,
      }).format(nummer);
      return <div className='font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'locatie',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Locatie
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Status
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const [status, setStatus] = useState(row.original.status);

      const handleStatusChange = (newStatus: Status) => {
        setStatus(newStatus);
      };

      const renderStatusBadge = () => {
        switch (status) {
          case 'Werkend':
            return (
              <Badge className='bg-green-600 hover:bg-green-700'>Werkend</Badge>
            );
          case 'Ter Reparatie':
            return (
              <Badge className='bg-purple-700 hover:bg-purple-800'>
                Ter Reparatie
              </Badge>
            );
          case 'Defect':
            return (
              <Badge className='bg-red-600 hover:bg-red-700'>Defect</Badge>
            );
          default:
            return (
              <Badge className='bg-stone-500 hover:bg-stone-600'>Unknown</Badge>
            );
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost'>{renderStatusBadge()}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleStatusChange('Werkend')}>
              Werkend
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleStatusChange('Ter Reparatie')}
            >
              Ter Reparatie
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange('Defect')}>
              Defect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    sortingFn: (rowA, rowB) => {
      const order = { Werkend: 1, 'Ter Reparatie': 2, Defect: 3 };
      return order[rowA.original.status] - order[rowB.original.status];
    },
  },
  {
    id: 'edit',
    header: ({ column }): React.ReactNode => (
      <Link href={'/dashboard/inventaris/licht/catalogus'}>
        <Button>
          <Pencil /> Catalogus Bewerken
        </Button>
      </Link>
    ),
    cell: ({ row }) => {
      const inventory = row.original;
      const [status, setStatus] = useState(inventory.status);
      const [dmx, setDmx] = useState(inventory.dmx || 1);

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Pencil /> Bewerken
            </Button>
          </DialogTrigger>
          <DialogContent className='w-[800px] sm:max-w-[425px] md:max-w-full'>
            <DialogHeader>
              <DialogTitle>
                Fixture: Showtec Phantom 75 nummer {inventory.nummer}
              </DialogTitle>
              <DialogDescription>
                Maak aanpassingen aan de gekozen fixture, let op dit kan niet
                ongedaan worden!
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-2 gap-8'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='id' className='text-right'>
                    ID
                  </Label>
                  <Input
                    id='id'
                    placeholder={inventory.id}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='nummer' className='text-right'>
                    Nummer
                  </Label>
                  <Input
                    id='nummer'
                    type='number'
                    value={inventory.nummer}
                    className='col-span-3'
                  />
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='locatie' className='text-right'>
                    Locatie
                  </Label>
                  <Input
                    id='locatie'
                    placeholder={inventory.locatie}
                    className='col-span-3'
                  />
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='status' className='text-right'>
                    Status
                  </Label>
                  <select
                    id='status'
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Status)}
                    className='col-span-3 rounded border p-2'
                  >
                    <option value='Werkend'>Werkend</option>
                    <option value='Ter Reparatie'>Ter Reparatie</option>
                    <option value='Defect'>Defect</option>
                  </select>
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='dmx' className='text-right'>
                    DMX Startadres
                  </Label>
                  <Input
                    id='dmx'
                    type='number'
                    min='1'
                    max='512'
                    value={dmx}
                    onChange={(e) =>
                      setDmx(Math.max(1, Math.min(512, Number(e.target.value))))
                    }
                    className='col-span-3'
                  />
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='channels' className='text-right'>
                    Kanalen
                  </Label>
                  <Input
                    id='channels'
                    type='number'
                    placeholder='1'
                    className='col-span-3'
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>Opslaan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export const LichtCatalogusColumns: ColumnDef<Catalogus>[] = [
  {
    accessorKey: 'tag',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        ID
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Merk
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Type
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'soort',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Soort
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'dmx',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Aantal Kanalen
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    id: 'edit',
    header:  () => {
      return (
        <div>
          <LightCatalogDialog />
        </div>
      );
    },
    cell: ({ row }) => {
      const inventory = row.original;
      const [id, setID] = useState(inventory.tag);
      const [brand, setBrand] = useState(inventory.brand);
      const [type, setType] = useState(inventory.type);
      const [DMX, setDMX] = useState(inventory.dmx || 1);

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Pencil /> Bewerken
            </Button>
          </DialogTrigger>
          <DialogContent className='w-[800px] sm:max-w-[425px] md:max-w-full'>
            <DialogHeader>
              <DialogTitle>
                Catalogus: {brand} {type}
              </DialogTitle>
              <DialogDescription>
                Maak aanpassingen aan het type in de catalogus.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-2 gap-8'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='id' className='text-right'>
                    ID
                  </Label>
                  <Input id='id' value={id} className='col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='brand' className='text-right'>
                    Merk
                  </Label>
                  <Input
                    id='brand'
                    value={inventory.brand}
                    className='col-span-3'
                  />
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='type' className='text-right'>
                    Type
                  </Label>
                  <Input
                    id='type'
                    placeholder={inventory.type}
                    className='col-span-3'
                  />
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='soort' className='text-right'>
                    Soort
                  </Label>
                  <Input
                    id='soort'
                    placeholder={inventory.soort}
                    className='col-span-3'
                  />
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='dmx' className='text-right'>
                    Aantal Kanalen
                  </Label>
                  <Input
                    id='dmx'
                    value={inventory.dmx}
                    className='col-span-3'
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>Opslaan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
