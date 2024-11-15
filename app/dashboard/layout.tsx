import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/options';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = {
    name: session?.user?.name ?? 'Jacob van Liesveldt',
    email: session?.user?.email ?? 'jl@penta.nl',
  };
  return (
    <main>
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </main>
  );
}
