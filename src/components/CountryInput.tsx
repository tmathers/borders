import { ActionIcon, Autocomplete, Flex } from '@mantine/core';
import { IconX, IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';
import { LAYOUT_SPACING } from './Welcome/Welcome';

interface CountryInputProps {
  readonly ALL_COUNTRIES: string[], 
  readonly onSubmit: (v: string) => void
}

const INPUT_HEIGHT = 34

export function CountryInput({ ALL_COUNTRIES, onSubmit }: CountryInputProps) {

  const [value, setValue] = useState('')

  return (
    <Flex 
      style={{ zIndex: 999 }}
      pos="absolute"
      bottom={0}
      h={INPUT_HEIGHT}
      justify="center"
      align="flex-end"
      w="100%"
      my={LAYOUT_SPACING}
    >

      <Flex w="100%" justify="center" gap="sm">
        <Autocomplete
          styles={{ dropdown: { zIndex: 999, opacity: '80%' } }}
          placeholder="Enter country"
          aria-label="Enter country"
          data={ALL_COUNTRIES}
          maxDropdownHeight={200}
          h={INPUT_HEIGHT}
          rightSection={<IconX 
            height={INPUT_HEIGHT / 2} 
            onClick={() => setValue('')}  
            cursor="pointer"
          />}
          value={value}
          onChange={v => setValue(v)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && ALL_COUNTRIES.includes(value)) {
              onSubmit(value)
              setValue('')
            }
          }}
        />
        
        <ActionIcon 
          variant="filled" 
          aria-label="Submit" 
          disabled={!ALL_COUNTRIES.includes(value)}
          h={INPUT_HEIGHT} 
          w={INPUT_HEIGHT} 
          onClick={() => {
            onSubmit(value)
            setValue('')
          }}
        >
          <IconArrowRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>

      </Flex>

    </Flex>
  )
}
