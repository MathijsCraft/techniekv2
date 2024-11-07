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
import fs from 'fs';
import path from 'path';
import { Card } from '@/components/ui/card'; // Assuming you have a Card component
import Link from 'next/link';
import { Lightbulb, AudioLines } from 'lucide-react';

// Utility function to read directories
const readDirectories = (basePath: string) => {
  const dirs = fs.readdirSync(basePath, { withFileTypes: true });
  return dirs.filter((dir) => dir.isDirectory()).map((dir) => dir.name);
};

// Server-side function to get folders dynamically
export async function getData() {
  // Define the base path for your categories
  const lichtPath = path.join(process.cwd(), '/app/dashboard/data/licht/');
  const geluidPath = path.join(process.cwd(), '/app/dashboard/data/geluid/');

  // Read directories inside the 'licht' and 'geluid' folders
  const lichtItems = readDirectories(lichtPath);
  const geluidItems = readDirectories(geluidPath);

  return { lichtItems, geluidItems };
}

export default async function Page() {
  // Fetch the folder data dynamically
  const { lichtItems, geluidItems } = await getData();

  const formatFolderName = (name: string) => {
    return name
      .replace(/-/g, ' ') // Replace dashes with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
  };

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
                <BreadcrumbItem>
                  <BreadcrumbPage>Data</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          {/* Two columns for Licht and Geluid categories */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {/* Licht Category */}
            <div className='space-y-4'>
              <h2 className='text-xl font-semibold'>Licht</h2>
              {lichtItems.length > 0 ? (
                lichtItems.map((item, index) => (
                  <Card className='p-4' key={index}>
                    <Link href={`/dashboard/data/licht/${item}`}>
                      <h3 className='text-lg font-medium flex flex-row gap-2'><Lightbulb /> {formatFolderName(item)}</h3>
                    </Link>
                  </Card>
                ))
              ) : (
                <p>Geen data gevonden</p>
              )}
            </div>

            {/* Geluid Category */}
            <div className='space-y-4'>
              <h2 className='text-xl font-semibold'>Geluid</h2>
              {geluidItems.length > 0 ? (
                geluidItems.map((item, index) => (
                  <Card className='p-4' key={index}>
                    <Link href={`/dashboard/data/geluid/${item}`}>
                      <h3 className='text-lg font-medium flex flex-row gap-2'><AudioLines /> {formatFolderName(item)}</h3>
                    </Link>
                  </Card>
                ))
              ) : (
                <p>Geen data gevonden</p>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
