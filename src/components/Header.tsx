import { Box, Flex, Title } from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle/ColorSchemeToggle';
import { LAYOUT_SPACING } from './Welcome/Welcome';


const APP_NAME = import.meta.env.VITE_APP_NAME

export const HEADER_HEIGHT = 50

export function Header() {

  return (
    <Box 
      h={HEADER_HEIGHT} 
      style={{ borderBottom: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))' }}
      py="xs"
      px={LAYOUT_SPACING}
    >

        <Flex justify="space-between" align="center">
          <Title size="md">🌎&nbsp;&nbsp;{APP_NAME}</Title>
          <ColorSchemeToggle />
        </Flex>
    </Box>
  );
}