'use client';

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        router.replace('/dashboard');
      } else {
        router.replace('/sign-in');
      }
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
