import { ActionIcon, Group, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { CSSProperties } from 'react';


interface ColorSchemeToggleProps {
  readonly stroke: number,
  readonly style: CSSProperties,
  readonly variant: string,
}

export function ColorSchemeToggle({ stroke, style, variant }: ColorSchemeToggleProps ) {

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant={variant}
        size="md"
        aria-label="Toggle color scheme"
      >
        {computedColorScheme === 'dark' && <IconSun style={style} stroke={stroke} />}
        {computedColorScheme === 'light' && <IconMoon style={style} stroke={stroke} />}
      </ActionIcon>
    </Group>
  );
}
