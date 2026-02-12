import { ActionIcon, Box, Button, Card, Flex, Group, Modal, Stack, Text, ThemeIcon } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import CountryMap from '../components/CountryMap';
import { IconCheck, IconConfettiFilled, IconWorldPin, IconX } from '@tabler/icons-react';
import { CountryInput } from '../components/CountryInput';
import { notifications } from '@mantine/notifications';
import { Feature, FeatureCollection } from 'geojson';
import { highlightCountry } from '@/util/map';
import { Header } from '@/components/Header';
import { useDisclosure } from '@mantine/hooks';

const DATA_URL = new URL('../data/countries.geojson', import.meta.url).href
export const LAYOUT_SPACING = "md"
const ICON_STYLE = { width: '70%', height: '70%' }
const PICK_DELAY_MS = 2000
const NOTIFICATION_DELAY_MS = 5000


/**
 * TODO:
 *  - make PWA
 *  - fix mobile scroll
 */

export function HomePage() {

  const [country, setCountry] = useState<string | null>(null)
  const [geoJson, setGeojson] = useState<FeatureCollection>()
  const [countries, setCountries] = useState<{ 
    all: string[], 
    unused: string[]
  }>({ all: [], unused: []})
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [totalAsked, setTotalAsked] = useState(0)
  const [inputEnabled, setInputEnabled] = useState(false)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [completeModalOpened, { 
    open: openCompleteModal,
    close: closeCompleteModal
  }] = useDisclosure(false)

  useEffect(() => {
    if (countries.all.length > 0 && totalAsked === countries.all.length) {
      openCompleteModal()
      setInputEnabled(false)
    }
  }, [totalAsked, countries.all])

  useEffect(() => {
    setTimeout(() => {
      pickCountry()
    }, totalAsked === 0 ? 0 : PICK_DELAY_MS)
  }, [totalAsked, countries.all.length])


  const pickCountry = () => {

    if (countries.unused.length === 0) { return }

    const idx = Math.floor(Math.random() * countries.unused.length)
    const pick = countries.unused[idx]
    setCountry(pick)
    const set = new Set<string>([...countries.unused])
    set.delete(pick)
    setCountries({ all: [...countries.all], unused: Array.from(set) })
    setInputEnabled(true)

  }

  useEffect(() => {
    fetch(DATA_URL)
      .then(r => {
        if (!r.ok) {
          throw new Error(r.statusText);
        }
        return r.json();
      })
      .then(data => {
        setGeojson(data)

        const countries = data.features
          .map((f: Feature) => f.properties?.NAME_LONG)
          .sort((a: string, b: string) => a.localeCompare(b, 'en', { sensitivity: 'variant' }))

        setCountries({ all: [...countries], unused: [...countries] })

      })
      // eslint-disable-next-line no-console
      .catch(e => console.error('load error', e));

  }, [DATA_URL]);

  const submit = (selectedCountry: string) => {

    setTotalAsked(totalAsked + 1)
    setInputEnabled(false)

    const correct = selectedCountry === country

    if (correct) {
      setTotalCorrect(totalCorrect + 1)
    }

    notifications.show({
      position: 'top-center',
      withCloseButton: true,
      withBorder: true,
      autoClose: NOTIFICATION_DELAY_MS,
      title: <b>{correct ? 'Correct!' : 'Incorrect!'}</b>,
      message: <>The country was <b>{country}</b>.</>,
      color: correct ? 'green' : 'red',
      icon: correct ? <IconCheck /> : <IconX />,
      className: 'notification'
    });

  }

  const restart = () => {
    setTotalCorrect(0)
    setTotalAsked(0)
    setCountries({ all: [...countries.all], unused: [...countries.all] })
  }

  return (
    <Box id="root">
      <Flex id="content" direction="column">
        <Header restart={restart} />
        <Box  pos="relative">
          <Stack 
            pos="absolute" 
            right={0} 
            gap="sm" 
            m={LAYOUT_SPACING} 
            style={{ zIndex: 99 }}
            align="end"
          >
            <Card
              p="xs"
              py={5}
              withBorder
            >
              <Flex gap="xs" align="center">

                <Text  truncate lh='sm' size="lg" m={0}>{totalCorrect} / {totalAsked}</Text>
                <ThemeIcon color="green" radius="lg" size="xs" aria-label="correct">
                  <IconCheck style={ICON_STYLE} />
                </ThemeIcon>
              </Flex>
            </Card>

            <ActionIcon size="lg" aria-label="Re-center" me="0" 
              onClick={() => highlightCountry(geoJson, mapRef.current!, country!)}>
              <IconWorldPin style={ICON_STYLE} />
            </ActionIcon>
          </Stack>
        </Box>
        
        <Group w="100%">
          {country && 
            <CountryMap country={country} geoJson={geoJson} mapRef={mapRef} />
          }
        </Group>
      </Flex>

      <CountryInput 
        ALL_COUNTRIES={countries.all} 
        onSubmit={submit} 
        enabled={inputEnabled}
      />

      <Modal opened={completeModalOpened} onClose={closeCompleteModal} 
        title={<IconConfettiFilled size={36} aria-label="Finished" />} 
        centered
      >
        <Stack gap="xs">
          <Text>Congratulations, you got to the end!</Text>

          <Text>You got <b>{totalCorrect} of {totalAsked}</b> correct.</Text>

          <Button onClick={() => {
            restart()
            closeCompleteModal()
          }}>
            Restart?
          </Button>
        </Stack>
      </Modal>

    </Box>
  );
}
