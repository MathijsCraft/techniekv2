'use client';

import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { LichtInventarisColumns } from '@/components/ui/inventory/tables';
import { DataTable } from '@/components/ui/inventory/data-table';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';

import { Inventory } from '@/lib/types';

export default function Page() {
  const [data, setData] = useState<Inventory[]>([]); // State to hold inventory data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Function to fetch data from the server
  const fetchInventarisData = async () => {
    try {
      const response = await fetch('/api/inventory/light-inventory'); // Adjust API route if needed
      if (response.ok) {
        const catalogData = await response.json();
        setData(catalogData);
      } else {
        console.error('Failed to fetch catalog data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchInventarisData();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
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
                  <BreadcrumbPage>Licht</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <Suspense>
          <DataTable columns={LichtInventarisColumns(fetchInventarisData)} data={data} />
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
