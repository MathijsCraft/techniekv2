'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil } from 'lucide-react';
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

import LightCatalogDialog from '@/components/ui/inventory/light-catalog-add';
import LightCatalogEdit from '@/components/ui/inventory/light-catalog-edit';

import LightInventoryEditDialog from '@/components/ui/inventory/edit-lamp';
import { Status, Inventory, Catalogus } from '@/lib/types';

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
      const [status, setStatus] = useState<Status>(row.original.status);

      const handleStatusChange = (newStatus: Status) => {
        setStatus(newStatus);
        // Optionally, you might want to add logic here to persist this change.
      };

      const renderStatusBadge = () => {
        switch (status) {
          case 'Werkend':
            return <Badge className='bg-green-600 hover:bg-green-700'>Werkend</Badge>;
          case 'Ter Reparatie':
            return <Badge className='bg-purple-700 hover:bg-purple-800'>Ter Reparatie</Badge>;
          case 'Defect':
            return <Badge className='bg-red-600 hover:bg-red-700'>Defect</Badge>;
          default:
            return <Badge className='bg-stone-500 hover:bg-stone-600'>Unknown</Badge>;
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost'>{renderStatusBadge()}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {(['Werkend', 'Ter Reparatie', 'Defect'] as Status[]).map((stat) => (
              <DropdownMenuItem key={stat} onClick={() => handleStatusChange(stat)}>
                {stat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    sortingFn: (rowA, rowB) => {
      const order = { Werkend: 1, 'Ter Reparatie': 2, Defect: 3 };
      return (order[rowA.original.status] || 0) - (order[rowB.original.status] || 0);
    },
  },
  {
    id: 'edit',
    header: () => (
      <Link href={'/dashboard/inventaris/licht/catalogus'}>
        <Button>
          <Pencil /> Catalogus Bewerken
        </Button>
      </Link>
    ),
    cell: ({ row }) => {
      const inventory = row.original;
      return (
        <div>
          <LightInventoryEditDialog inventoryItem={inventory} onEditSuccess={() => {/* handle success */}} />
        </div>
      );
    },
  },
];

export const LichtCatalogusColumns = (fetchCatalogData: () => Promise<void>): ColumnDef<Catalogus>[] => [
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
    header: () => (
      <div>
        <LightCatalogDialog onAddSuccess={fetchCatalogData} />
      </div>
    ),
    // cell: ({ row }) => {
    //   const inventory = row.original;
    //   const [id, setID] = useState(inventory.tag);
    //   const [brand, setBrand] = useState(inventory.brand);
    //   const [soort, setSoort] = useState(inventory.soort);
    //   const [type, setType] = useState(inventory.type);
    //   const [dmx, setDMX] = useState(inventory.dmx || 1);
    //   const [isDialogOpen, setDialogOpen] = useState(false);
    
    //   const handleSave = async () => {
    //     const response = await fetch(`/api/inventory/light-catalog/${id}`, {
    //       method: 'PUT', // Use PUT for updates
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ brand, soort, type, dmx }),
    //     });
    
    //     if (response.ok) {
    //       // Handle success, e.g., show a message or refresh data
    //       console.log('Item updated successfully');
    //       setDialogOpen(false); // Close dialog after saving
    //     } else {
    //       console.error('Error updating item');
    //     }
    //   };
    
    //   const handleDelete = async () => {
    //     const response = await fetch(`/api/inventory/light-catalog/${id}`, {
    //       method: 'DELETE', // Use DELETE for removing the item
    //     });
    
    //     if (response.ok) {
    //       // Handle success, e.g., show a message or refresh data
    //       console.log('Item deleted successfully');
    //       // Optionally, you could call fetchCatalogData() here to refresh the data
    //     } else {
    //       console.error('Error deleting item');
    //     }
    //   };
    
    //   return (
    //     <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
    //       <DialogTrigger asChild>
    //         <Button>
    //           <Pencil /> Bewerken
    //         </Button>
    //       </DialogTrigger>
    //       <DialogContent className='w-[800px] sm:max-w-[425px] md:max-w-full'>
    //         <DialogHeader>
    //           <DialogTitle>
    //             Catalogus: {brand} {type}
    //           </DialogTitle>
    //           <DialogDescription>
    //             Maak aanpassingen aan de lamp in de catalogus.
    //           </DialogDescription>
    //         </DialogHeader>
    //         <div className='grid gap-4 py-4'>
    //           <div className='grid grid-cols-2 gap-8'>
    //             <div className='grid grid-cols-4 items-center gap-4'>
    //               <Label htmlFor='id' className='text-right'>ID</Label>
    //               <Input id='id' value={id} className='col-span-3' readOnly />
    //             </div>
    //             <div className='grid grid-cols-4 items-center gap-4'>
    //               <Label htmlFor='brand' className='text-right'>Merk</Label>
    //               <Input id='brand' value={brand} className='col-span-3' onChange={(e) => setBrand(e.target.value)} />
    //             </div>
    //             <div className='grid grid-cols-4 items-center gap-4'>
    //               <Label htmlFor='type' className='text-right'>Type</Label>
    //               <Input id='type' value={type} className='col-span-3' onChange={(e) => setType(e.target.value)} />
    //             </div>
    //             <div className='grid grid-cols-4 items-center gap-4'>
    //               <Label htmlFor='soort' className='text-right'>Soort</Label>
    //               <Input id='soort' value={soort} className='col-span-3' onChange={(e) => setSoort(e.target.value)} />
    //             </div>
    //             <div className='grid grid-cols-4 items-center gap-4'>
    //               <Label htmlFor='dmx' className='text-right'>Aantal Kanalen</Label>
    //               <Input id='dmx' value={dmx} className='col-span-3' onChange={(e) => setDMX(parseInt(e.target.value) || 0)} />
    //             </div>
    //           </div>
    //         </div>
    //         <DialogFooter>
    //           <Button type='button' onClick={handleSave}>Opslaan</Button>
    //           <Button type='button' variant='destructive' onClick={handleDelete}>Verwijderen</Button>
    //         </DialogFooter>
    //       </DialogContent>
    //     </Dialog>
    //   );
    // },
    cell: ({ row }) => {
      const inventory = row.original;    
      return (
        <LightCatalogEdit
          inventory={inventory}
          onUpdateSuccess={fetchCatalogData}
          onDeleteSuccess={fetchCatalogData}
        />
      );
    },
    
  },
];
