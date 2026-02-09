import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import 'maplibre-gl/dist/maplibre-gl.css'
import './custom.css'

import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { Notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { HomePage } from './pages/Home.page';

export default function App() {

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault()
      // eslint-disable-next-line no-console
      console.log('PWA install prompt available')
    })
  }, [])


  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <HomePage />
    </MantineProvider>
  );
}
