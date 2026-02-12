# Country Guesser

## Geo Data Notes
Country data is in `/data`, downloaded from (Natural Earth Data)[https://www.naturalearthdata.com/downloads/10m-cultural-vectors/].

Simplified version created using:
```
ogr2ogr -f GeoJSON countries_simplified.geojson countries.geojson -simplify 0.1
```
where `0.1` equals 10km, AKA the resolution of the polygon features. 

`ogr2ogr` installed using:
```https://react-leaflet.js.org/
sudo apt install -y gdal-bin libgdal-dev
```
## MapLibre Docs
https://maplibre.org/maplibre-gl-js/docs/



## Deploying to GH Pages
Make sure changes are pushed, and run `npm run deploy`.

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier

## Template Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)
