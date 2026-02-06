import { ActionIcon, Box, Flex, Title } from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle/ColorSchemeToggle';
import { LAYOUT_SPACING } from './Welcome/Welcome';
import { IconInfoCircle, IconSettings } from '@tabler/icons-react';


const APP_NAME = import.meta.env.VITE_APP_NAME

export const HEADER_HEIGHT = 50

const ICON_STROKE = 1.5
const ICON_SIZE = '80%'
const ICON_VARIANT = 'subtle'

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

          <Flex gap="xs">

            <ActionIcon
              onClick={() => {}}
              variant={ICON_VARIANT}
              size="md"
              aria-label="Toggle color scheme"
            >
              <IconInfoCircle 
                stroke={ICON_STROKE}
                style={{ width: ICON_SIZE, height: ICON_SIZE }}
              />
            </ActionIcon>

            <ColorSchemeToggle 
              stroke={ICON_STROKE}
              style={{ width: ICON_SIZE, height: ICON_SIZE }} 
              variant={ICON_VARIANT}
            />

            <ActionIcon
              onClick={() => {}}
              variant={ICON_VARIANT}
              size="md"
              aria-label="Toggle color scheme"
            >
              <IconSettings                 
                stroke={ICON_STROKE}
                style={{ width: ICON_SIZE, height: ICON_SIZE }} 
              />
            </ActionIcon>

          </Flex>
        </Flex>
    </Box>
  );
}