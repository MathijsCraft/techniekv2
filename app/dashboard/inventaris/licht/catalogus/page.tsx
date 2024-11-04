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
import {
  Catalogus,
  LichtCatalogusColumns,
} from '@/components/ui/inventory/columns';
import { DataTable } from '@/components/ui/inventory/data-table';
import { prisma } from '@/lib/prisma';

// async function getData(): Promise<Catalogus[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: 'ST P75',
//       brand: 'ShowTec',
//       type: 'Phantom 75',
//       fixture: 'Moving Head',
//       dmx: 15,
//     },
//     {
//       id: 'ST P250',
//       brand: 'ShowTec',
//       type: 'Phantom 250',
//       fixture: 'Moving Head',
//       dmx: 15,
//     },
//     {
//       id: 'PL JS2',
//       brand: 'Tribe ProLights',
//       type: 'JetSpot 2',
//       fixture: 'Moving Head',
//       dmx: 15,
//     },
//   ];
// }

async function getData(): Promise<Catalogus[]> {
    const data = await prisma.lightingCatalog.findMany({
      select: {
        tag: true,
        brand: true,
        type: true,
        soort: true,
        dmx: true,
      },
    });
    return data; // Return the fetched data
  }

export default async function Page() {
  const data = await getData();
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
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='/dashboard/inventaris/licht/'>
                    Licht
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage>Catalogus</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <DataTable columns={LichtCatalogusColumns} data={data} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
