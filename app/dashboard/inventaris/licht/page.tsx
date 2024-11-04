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
  Inventory,
  LichtInventarisColumns,
} from '@/components/ui/inventory/columns';
import { DataTable } from '@/components/ui/inventory/data-table';

async function getData(): Promise<Inventory[]> {
  // Fetch data from your API here.
  return [
    {
      id: 'ST P75',
      nummer: 1,
      locatie: 'Truss Cirkel p1',
      status: 'Defect',
      dmx: 1,
    },
    {
      id: 'ST P75',
      nummer: 2,
      locatie: 'Truss Cirkel p2',
      status: 'Werkend',
      dmx: 1,
    },
    {
      id: 'ST P75',
      nummer: 3,
      locatie: 'Truss Cirkel p3',
      status: 'Defect',
      dmx: 1,
    },
    {
      id: 'ST P75',
      nummer: 4,
      locatie: 'Truss Cirkel p4',
      status: 'Defect',
      dmx: 1,
    },
    {
      id: 'ST P75',
      nummer: 5,
      locatie: 'Truss Cirkel p4',
      status: 'Werkend',
      dmx: 1,
    },
    {
      id: 'ST P75',
      nummer: 6,
      locatie: 'Truss Cirkel p4',
      status: 'Defect',
      dmx: 1,
    },
    {
      id: 'ST P75',
      nummer: 7,
      locatie: 'Truss Cirkel p4',
      status: 'Ter Reparatie',
      dmx: 1,
    },
    {
      id: 'ST P75',
      nummer: 8,
      locatie: 'Truss Cirkel p4',
      status: 'Defect',
      dmx: 1,
    },
    {
      id: 'ST P75',
      nummer: 9,
      locatie: 'Truss Cirkel p4',
      status: 'Defect',
      dmx: 1,
    },
    {
      id: 'ST P75',
      nummer: 10,
      locatie: 'Truss Cirkel p4',
      status: 'Defect',
      dmx: 1,
    },
    {
      id: 'ST P75',
      nummer: 11,
      locatie: 'Truss Cirkel p4',
      status: 'Defect',
      dmx: 1,
    },
    {
      id: 'ST P75',
      nummer: 12,
      locatie: 'Truss Cirkel p4',
      status: 'Defect',
      dmx: 1,
    },
    {
      id: 'ST P75',
      nummer: 13,
      locatie: 'Truss Cirkel p4',
      status: 'Defect',
      dmx: 1,
    },
    {
      id: 'ST P75',
      nummer: 14,
      locatie: 'Truss Cirkel p4',
      status: 'Defect',
      dmx: 1,
    },
    {
      id: 'ST P75',
      nummer: 15,
      locatie: 'Truss Cirkel p4',
      status: 'Defect',
      dmx: 1,
    },
    // ...
  ];
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
                <BreadcrumbItem>
                  <BreadcrumbPage>Licht</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <DataTable columns={LichtInventarisColumns} data={data} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
