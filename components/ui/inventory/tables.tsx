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
import { Badge } from '@/components/ui/badge';

import LightCatalogDialog from '@/components/ui/inventory/light-catalog-add';
import LightCatalogEdit from '@/components/ui/inventory/light-catalog-edit';
import LightInventoryDialog from '@/components/ui/inventory/light-inventory-add';
import LightInventoryEdit from '@/components/ui/inventory/light-inventory-edit';

import SoundInventoryDialog from '@/components/ui/inventory/sound-inventory-add';
import SoundInventoryEdit from '@/components/ui/inventory/sound-inventory-edit';
import SoundCatalogDialog from '@/components/ui/inventory/sound-catalog-add';
import SoundCatalogEdit from '@/components/ui/inventory/sound-catalog-edit';

import {
  Status,
  Inventory,
  Catalogus,
  SoundCatalogus,
  SoundInventory,
} from '@/lib/types';

export const LichtInventarisColumns = (
  fetchInventarisData: () => Promise<void>
): ColumnDef<Inventory>[] => [
  {
    accessorKey: 'tag',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Tag
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'number',
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
      const number = parseFloat(row.getValue('number'));
      const formatted = new Intl.NumberFormat('en', {
        minimumIntegerDigits: 2,
      }).format(number);
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
      /* eslint-disable react-hooks/rules-of-hooks */
      const [status, setStatus] = useState<Status>(row.original.status);
      /* eslint-enable react-hooks/rules-of-hooks */

      const handleStatusChange = async (newStatus: Status) => {
        setStatus(newStatus);

        try {
          // Call the API to update the status in the database
          const response = await fetch(
            `/api/inventory/light-inventory?id=${row.original.id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                status: newStatus, // Update the status only
              }),
            }
          );

          if (response.ok) {
            // Call the success callback to refresh data or show success message
            // console.log('Status updated successfully');
          } else {
            console.error('Error updating inventory item');
          }
        } catch (error) {
          console.error('Error updating status:', error);
        }
      };

      const renderStatusBadge = () => {
        switch (status) {
          case 'WERKEND':
            return (
              <Badge className='bg-green-600 hover:bg-green-700'>Werkend</Badge>
            );
          case 'TER_REPARATIE':
            return (
              <Badge className='bg-purple-700 hover:bg-purple-800'>
                Ter Reparatie
              </Badge>
            );
          case 'DEFECT':
            return (
              <Badge className='bg-red-600 hover:bg-red-700'>Defect</Badge>
            );
          default:
            return (
              <Badge className='bg-stone-500 hover:bg-stone-600'>Unknown</Badge>
            );
        }
      };

      const statusDisplayMap = {
        WERKEND: 'Werkend',
        TER_REPARATIE: 'Ter Reparatie',
        DEFECT: 'Defect',
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost'>{renderStatusBadge()}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {(['WERKEND', 'TER_REPARATIE', 'DEFECT'] as Status[]).map(
              (stat) => (
                <DropdownMenuItem
                  key={stat}
                  onClick={() => handleStatusChange(stat)}
                >
                  {statusDisplayMap[stat]}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    sortingFn: (rowA, rowB) => {
      const order = { WERKEND: 1, TER_REPARATIE: 2, DEFECT: 3 };
      return (
        (order[rowA.original.status] || 0) - (order[rowB.original.status] || 0)
      );
    },
  },
  {
    accessorKey: 'dmx',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        DMX Adres
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const dmx = parseFloat(row.getValue('dmx'));
      const formatted = new Intl.NumberFormat('en', {
        minimumIntegerDigits: 3,
      }).format(dmx);
      return <div className='text-center font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'universe',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Universe
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    id: 'edit',
    header: () => (
      <div className='flex justify-end gap-4'>
        <LightInventoryDialog onAddSuccess={fetchInventarisData} />
        <Link href={'/dashboard/inventaris/licht/catalogus'}>
          <Button>
            <Pencil /> Catalogus
          </Button>
        </Link>
      </div>
    ),
    cell: ({ row }) => {
      const inventory = row.original;
      return (
        <div className='flex justify-end'>
          <LightInventoryEdit
            inventoryItem={inventory}
            onUpdateSuccess={fetchInventarisData}
            onDeleteSuccess={fetchInventarisData}
          />
        </div>
      );
    },
  },
];

export const LichtCatalogusColumns = (
  fetchCatalogData: () => Promise<void>
): ColumnDef<Catalogus>[] => [
  {
    accessorKey: 'tag',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Tag
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

export const SoundCatalogColumns = (
  fetchCatalogData: () => Promise<void>
): ColumnDef<SoundCatalogus>[] => [
  {
    accessorKey: 'tag',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Tag
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
    accessorKey: 'extraInfo',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Extra
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    id: 'edit',
    header: () => (
      <div>
        <SoundCatalogDialog onAddSuccess={fetchCatalogData} />
      </div>
    ),
    cell: ({ row }) => {
      const catalog = row.original;
      return (
        <SoundCatalogEdit
          inventory={catalog}
          onUpdateSuccess={fetchCatalogData}
          onDeleteSuccess={fetchCatalogData}
        />
      );
    },
  },
];

export const SoundInventarisColumns = (
  fetchInventarisData: () => Promise<void>
): ColumnDef<SoundInventory>[] => [
  {
    accessorKey: 'tag',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Tag
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'number',
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
      const number = parseFloat(row.getValue('number'));
      const formatted = new Intl.NumberFormat('en', {
        minimumIntegerDigits: 2,
      }).format(number);
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
      /* eslint-disable react-hooks/rules-of-hooks */
      const [status, setStatus] = useState<Status>(row.original.status);
      /* eslint-enable react-hooks/rules-of-hooks */

      const handleStatusChange = async (newStatus: Status) => {
        setStatus(newStatus);

        try {
          // Call the API to update the status in the database
          const response = await fetch(
            `/api/inventory/sound-inventory?id=${row.original.id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                status: newStatus, // Update the status only
              }),
            }
          );

          if (response.ok) {
            // console.log('Status updated successfully');
          } else {
            console.error('Error updating inventory item');
          }
        } catch (error) {
          console.error('Error updating status:', error);
        }
      };

      const renderStatusBadge = () => {
        switch (status) {
          case 'WERKEND':
            return (
              <Badge className='bg-green-600 hover:bg-green-700'>Werkend</Badge>
            );
          case 'TER_REPARATIE':
            return (
              <Badge className='bg-purple-700 hover:bg-purple-800'>
                Ter Reparatie
              </Badge>
            );
          case 'DEFECT':
            return (
              <Badge className='bg-red-600 hover:bg-red-700'>Defect</Badge>
            );
          default:
            return (
              <Badge className='bg-stone-500 hover:bg-stone-600'>Unknown</Badge>
            );
        }
      };

      const statusDisplayMap = {
        WERKEND: 'Werkend',
        TER_REPARATIE: 'Ter Reparatie',
        DEFECT: 'Defect',
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost'>{renderStatusBadge()}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {(['WERKEND', 'TER_REPARATIE', 'DEFECT'] as Status[]).map(
              (stat) => (
                <DropdownMenuItem
                  key={stat}
                  onClick={() => handleStatusChange(stat)}
                >
                  {statusDisplayMap[stat]}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    sortingFn: (rowA, rowB) => {
      const order = { WERKEND: 1, TER_REPARATIE: 2, DEFECT: 3 };
      return (
        (order[rowA.original.status] || 0) - (order[rowB.original.status] || 0)
      );
    },
  },
  {
    accessorKey: 'stereo',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Stereo
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      /* eslint-disable react-hooks/rules-of-hooks */
      const [stereo, setStereo] = useState<boolean>(row.original.stereo);
      /* eslint-enable react-hooks/rules-of-hooks */

      const handleStereoChange = async (newStereo: boolean) => {
        setStereo(newStereo);

        try {
          // Call the API to update the stereo status in the database
          const response = await fetch(
            `/api/inventory/sound-inventory?id=${row.original.id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                stereo: newStereo, // Update the stereo status only
              }),
            }
          );

          if (response.ok) {
            // console.log('Stereo updated successfully');
          } else {
            console.error('Error updating inventory item');
          }
        } catch (error) {
          console.error('Error updating stereo status:', error);
        }
      };

      const renderStereoBadge = () => {
        return stereo ? (
          <Badge className='bg-blue-600 hover:bg-blue-700'>Stereo</Badge>
        ) : (
          <Badge className='bg-gray-600 hover:bg-gray-700'>Mono</Badge>
        );
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost'>{renderStereoBadge()}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {([true, false] as boolean[]).map((stat) => (
              <DropdownMenuItem
                key={stat.toString()}
                onClick={() => handleStereoChange(stat)}
              >
                {stat ? 'Stereo' : 'Mono'}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'patch',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Patch
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    id: 'edit',
    header: () => (
      <div className='flex justify-end gap-4'>
        <SoundInventoryDialog onAddSuccess={fetchInventarisData} />
        <Link href={'/dashboard/inventaris/geluid/catalogus'}>
          <Button>
            <Pencil /> Catalogus
          </Button>
        </Link>
      </div>
    ),
    cell: ({ row }) => {
      const inventory = row.original;
      return (
        <div className='flex justify-end'>
          <SoundInventoryEdit
            inventoryItem={inventory}
            onUpdateSuccess={fetchInventarisData}
            onDeleteSuccess={fetchInventarisData}
          />
        </div>
      );
    },
  },
];
