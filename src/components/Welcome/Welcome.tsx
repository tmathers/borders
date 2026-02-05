import { Group, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';
import { useEffect, useState } from 'react';
import CountryMap from '../CountryMap';

const DATA_URL = '/data/countries_simplified.geojson'


export function Welcome() {

  const [country, setCountry] = useState<string | null>(null)

  const [geoJson, setGeojson] = useState()

  const [ALL_COUNTRIES, setALL_COUNTRIES] = useState()

  const [unusedCountries, setUnusedCountries] = useState<Set<string>>(new Set())

  const pickCountry = (countries: Set<string>) => {
    const idx = Math.floor(Math.random() * countries.size)
    const pick = [...countries][idx]
    setCountry(pick)
    unusedCountries.delete(pick)

    console.log(unusedCountries, idx, pick)
  }

  useEffect(() => {
    fetch(DATA_URL)
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then(data => {
        setGeojson(data)

        const countries = data.features.map((c: unknown) => c.properties.NAME)

        setALL_COUNTRIES(countries)

        const set = new Set([...countries])

        pickCountry(set)

        setUnusedCountries(set)


      })
      .catch(e => console.error('load error', e));

  }, [DATA_URL]);

  useState(() => {

    pickCountry(unusedCountries)
  }, [])



  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Mantine
        </Text>
      </Title>

      <Group h="20rem" w="100%" id="map">
        {country && 
          <CountryMap country={country} geoJson={geoJson} />
        }
      </Group>

    </>
  );
}
