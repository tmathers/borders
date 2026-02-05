import { Card, Group, Text } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import CountryMap from '../CountryMap';
import { IconCheck, IconX } from '@tabler/icons-react';
import { CountryInput } from '../CountryInput';
import { notifications } from '@mantine/notifications';
import { Feature } from 'geojson';

const DATA_URL = '/data/countries_simplified.geojson'


/**
 * TODO:
 *  - use other map option to hide labels
 *  - end game state
 *  - center on country
 *  - header
 *  - color mode
 *  - fix lint errors
 */

export function Welcome() {

  const [country, setCountry] = useState<string | null>(null)

  const [geoJson, setGeojson] = useState()

  const [ALL_COUNTRIES, setALL_COUNTRIES] = useState([])

  const [unusedCountries, setUnusedCountries] = useState<Set<string>>(new Set())

  const [totalCorrect, setTotalCorrect] = useState(0)

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
          .map((f: Feature) => f.properties?.NAME)
          .sort()

        setALL_COUNTRIES(countries)
        const set = new Set([...countries])
        pickCountry(set)
        setUnusedCountries(set)

      })
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
    });

    pickCountry(unusedCountries)
    setUnusedCountries(new Set<string>([...unusedCountries]))
  }

  return (
    <>
      <Card 
        pos="absolute" 
        right={0}
        m="lg"
        p="sm" 
        style={{ zIndex: 999 }}
        withBorder  
      >
        <Text size="lg">{totalCorrect} / {totalAsked}</Text>
      </Card>
      
      <Group h="100%" w="100%" id="map">
        {country && 
          <CountryMap country={country} geoJson={geoJson} />
        }
      </Group>

      <CountryInput ALL_COUNTRIES={ALL_COUNTRIES} onSubmit={submit} />

    </>
  );
}
