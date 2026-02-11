import { ActionIcon, Box, Flex, Menu, Modal, Stack, Text, Title } from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { IconInfoCircle, IconRefresh, IconSettings } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { LAYOUT_SPACING } from '@/pages/Home.page';


const APP_NAME = import.meta.env.VITE_APP_NAME

export const HEADER_HEIGHT = 50

const ICON_STROKE = 1.5
const ICON_SIZE = '80%'
const ICON_VARIANT = 'subtle'

export function Header() {

  const [infoOpened, { open: openInfo, close: closeInfo }] = useDisclosure(false)

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

            <Menu shadow="md" position="bottom-end">
              <Menu.Target>
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
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconRefresh size={14} />}>
                  Restart
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <ActionIcon
              onClick={() => openInfo()}
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

          </Flex>
        </Flex>

        <Modal opened={infoOpened} onClose={closeInfo} 
          title={<IconInfoCircle size={24} aria-label="Info" />} 
          centered
        >
          <Stack gap="xs">
            <Text>A game where you guess the country.</Text>
              
            <Text>Country data sourced 
              from <a href="https://www.naturalearthdata.com">Natural Earth Data</a> and 
              rendered using <a href="https://maplibre.org/">MapLibre</a>. The country set is 
              based on de facto, rather than de jure boundaries.
            </Text>
            <Text c="dimmed" size="sm">&copy; Tara Mathers, {new Date().getFullYear()}.</Text>
          </Stack>
        </Modal>
    </Box>
  );
}