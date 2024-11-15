'use client';

import { signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export const LoginButton = () => {
  const handleSignIn = () => {
    // Optional: You can add query parameters if required.
    signIn('credentials', {
      callbackUrl: '/dashboard', // example: redirect after login
      nextauth: 'login-success', // You can add any necessary query parameter here
    });
  };

  return <Button onClick={handleSignIn}>Log in</Button>;
};

export const LogoutButton = () => {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' }); // Optional: Redirect after sign out
  };

  return <Button onClick={handleSignOut}>Uitloggen</Button>;
};
