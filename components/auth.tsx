'use client';

import { signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export const LoginButton = () => {
  return <Button onClick={() => signIn()}>Log in</Button>;
};

export const LogoutButton = () => {
  return <Button onClick={() => signOut()}>Uitloggen</Button>;
};
