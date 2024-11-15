// components/NavUser.tsx
import ClientNavUser from '@/components/client-nav-user';

interface NavUserProps {
  user: {
    name: string;
    email: string;
  };
}

export default function NavUser({ user }: NavUserProps) {
  return <ClientNavUser name={user.name} email={user.email} />;
}
