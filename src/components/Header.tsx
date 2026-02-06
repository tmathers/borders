import { Box, Container, Flex, Title } from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle/ColorSchemeToggle';


const APP_NAME = import.meta.env.VITE_APP_NAME

export function Header() {

  return (
    <Box bd="5">
      <Container size="md"  py="xs">

        <Flex justify="space-between" align="center">
          <Title size="md">🌎&nbsp;&nbsp;{APP_NAME}</Title>
          <ColorSchemeToggle />
        </Flex>
      </Container>
    </Box>
  );
}