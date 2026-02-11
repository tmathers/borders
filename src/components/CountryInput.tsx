import { ActionIcon, Autocomplete, Flex } from '@mantine/core';
import { IconX, IconArrowRight } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { LAYOUT_SPACING } from './Welcome/Welcome';

interface CountryInputProps {
  readonly ALL_COUNTRIES: string[], 
  readonly onSubmit: (v: string) => void
}

const INPUT_HEIGHT = 34

export function CountryInput({ ALL_COUNTRIES, onSubmit }: CountryInputProps) {

  const [value, setValue] = useState('')

  const entryIsValid = useMemo(() => {
    
    
    return ALL_COUNTRIES
      .map(c => c.toLocaleLowerCase())
      .includes(value.toLocaleLowerCase().trim())
  }, [value])

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
          h={INPUT_HEIGHT}
          placeholder="Enter country"
          aria-label="Enter country"
          data={ALL_COUNTRIES}
          maxDropdownHeight={200}
          rightSection={<IconX 
              height={INPUT_HEIGHT / 2} 
              onClick={() => setValue('')}  size="md"
              cursor="pointer"
            />
          }
          value={value}
          onChange={v => setValue(v)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && entryIsValid) {
              onSubmit(value)
              setValue('')
            }
          }}
        />
        
        <ActionIcon 
          variant="filled" 
          aria-label="Submit" 
          disabled={!entryIsValid}
          style={{ 
            height: INPUT_HEIGHT + 2, width: INPUT_HEIGHT + 2, // account for input border
          }}
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
