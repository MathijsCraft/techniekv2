'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SoundInventarisColumns } from '@/components/ui/inventory/tables'; // Adjust import as needed for sound columns
import { DataTable } from '@/components/ui/inventory/data-table';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';

import { SoundInventory } from '@/lib/types'; // Ensure you have the correct type for sound inventory

export default function Page() {
  const [data, setData] = useState<SoundInventory[]>([]); // State to hold sound inventory data
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Function to fetch sound inventory data from the server
  const fetchSoundData = async () => {
    try {
      const response = await fetch('/api/inventory/sound-inventory'); // Adjust API route for sound inventory
      if (response.ok) {
        const catalogData = await response.json();
        setData(catalogData);
      } else {
        console.error('Failed to fetch sound inventory data');
      }
    } catch (error) {
      console.error('Error fetching sound data:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSoundData();
  }, []);

  return (
    <>
      <header className='flex h-16 shrink-0 items-center gap-2'>
        <div className='flex items-center gap-2 px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className='hidden md:block'>
                <BreadcrumbLink href='/dashboard/'>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='hidden md:block' />
              <BreadcrumbItem className='hidden md:block'>
                <BreadcrumbLink href='/dashboard/inventaris/'>
                  Inventaris
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='hidden md:block' />
              <BreadcrumbItem>
                <BreadcrumbPage>Geluid</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
        <Suspense fallback={loading && <div>Loading...</div>}>
          <DataTable
            columns={SoundInventarisColumns(fetchSoundData)}
            data={data}
          />
        </Suspense>
      </div>
    </>
  );
}
