import { ActionIcon, Card, Flex, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { useEffect, useMemo, useRef, useState } from 'react';
import CountryMap from '../components/CountryMap';
import { IconCheck, IconWorldPin, IconX } from '@tabler/icons-react';
import { CountryInput } from '../components/CountryInput';
import { notifications } from '@mantine/notifications';
import { Feature, FeatureCollection } from 'geojson';
import { highlightCountry } from '@/util/map';
import { Header } from '@/components/Header';

const DATA_URL = new URL('../data/countries.geojson', import.meta.url).href

export const LAYOUT_SPACING = "md"


/**
 * TODO:
 *  - end game state
 *  - make PWA
 *  - add settings
 *  - fix mobile scroll
 */

export function HomePage() {

  const [country, setCountry] = useState<string | null>(null)
  const [geoJson, setGeojson] = useState<FeatureCollection>()
  const [ALL_COUNTRIES, setALL_COUNTRIES] = useState<string[]>([])
  const [unusedCountries, setUnusedCountries] = useState<Set<string>>(new Set())
  const [totalCorrect, setTotalCorrect] = useState(0)
  const mapRef = useRef<maplibregl.Map | null>(null)

  const totalAsked = useMemo(() => ALL_COUNTRIES.length - unusedCountries.size, [ALL_COUNTRIES, unusedCountries])


  const pickCountry = (countries: Set<string>) => {
    const idx = Math.floor(Math.random() * countries.size)
    const pick = [...countries][idx]
    setCountry(pick)
    unusedCountries.delete(pick)
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

        setALL_COUNTRIES(countries)
        const set = new Set([...countries])
        pickCountry(set)
        setUnusedCountries(set)

      })
      // eslint-disable-next-line no-console
      .catch(e => console.error('load error', e));

  }, [DATA_URL]);

  const submit = (selectedCountry: string) => {

    const correct = selectedCountry === country

    if (correct) {
      setTotalCorrect(totalCorrect + 1)
    }

    notifications.show({
      position: 'top-center',
      withCloseButton: true,
      withBorder: true,
      autoClose: 5000,
      title: <b>{correct ? 'Correct!' : 'Incorrect!'}</b>,
      message: <>The country was <b>{country}</b>.</>,
      color: correct ? 'green' : 'red',
      icon: correct ? <IconCheck /> : <IconX />,
      className: 'notification'
    });

    pickCountry(unusedCountries)
    setUnusedCountries(new Set<string>([...unusedCountries]))
  }

  return (
    <>
      <Header />
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
              <IconCheck style={{ width: '70%', height: '70%' }} />
            </ThemeIcon>
          </Flex>
        </Card>

        <ActionIcon size="lg" aria-label="Re-center" me="0" 
          onClick={() => highlightCountry(geoJson, mapRef.current!, country!)}>
          <IconWorldPin style={{ width: '70%', height: '70%' }} />
        </ActionIcon>
      </Stack>
      
      <Group w="100%">
        {country && 
          <CountryMap country={country} geoJson={geoJson} mapRef={mapRef} />
        }
      </Group>

      <CountryInput ALL_COUNTRIES={ALL_COUNTRIES} onSubmit={submit} />

    </>
  );
}
