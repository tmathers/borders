import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import 'maplibre-gl/dist/maplibre-gl.css'

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { Notifications } from '@mantine/notifications';
import { useEffect } from 'react';

export default function App() {

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault()
      console.log('PWA install prompt available')
      // you can later call e.prompt() to show it
    })
  }, [])


  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <Router />
    </MantineProvider>
  );
}
