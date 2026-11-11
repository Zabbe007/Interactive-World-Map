
# Interactive World Map

An Angular single-page app where clicking any country on an SVG world map displays live data about it, including its flag, capital, population, languages, and more. Country data comes from the [REST Countries API](https://restcountries.com/).

**[Live demo](https://Zabbe007.github.io/Interactive-World-Map/)**

<img width="1899" height="901" alt="interactive-world-map" src="https://github.com/user-attachments/assets/703678f6-c736-4f52-897e-a2234df90686" />

## Features

- Interactive SVG world map with click detection on every country
- Live country data fetched on click: name, capital, region, subregion, population, area, currencies, languages, government type, coordinates, flag, and a description
- Each clicked country is filled with a random color and outlined, and keeps it until the page is refreshed
- Population and area formatted with thousands separators
- Graceful handling of unrecognized clicks and API errors

## Tech Stack

- **Angular** with TypeScript
- **RxJS** (`BehaviorSubject`, `map`) for sharing state between components
- **Angular Router** and **HttpClient**
- **REST Countries API** (v5) for country data
- **GitHub Pages** for hosting, deployed with `angular-cli-ghpages`

## How It Works

1. The map is an inline SVG in the `WorldMap` component. Each country's `<path>` has an `id` equal to its two-letter country code.
2. A single click handler on the SVG uses event delegation, reading `event.target.id` to identify the clicked country.
3. `CountryService.getCountryData()` requests that country from the REST Countries API and maps the response into a typed `Country` object.
4. `WorldMap` stores the result and passes it to the service, which publishes it through a `BehaviorSubject`.
5. The root `App` component subscribes with the `async` pipe and renders the information panel whenever a new country arrives.

`WorldMap` and `App` never talk to each other directly. They share data through the service, because the map is loaded through the router outlet and can't pass data to its parent with `@Output`.

## Project Structure

```
src/app/
  app.ts, app.html, app.css    root component: header, layout, info panel
  app.config.ts                providers (router, HttpClient)
  app.routes.ts                route configuration
  country-model.ts             Country interface
  services/
    country.ts                 API calls and response mapping, shared state
  world-map/
    world-map.ts               click handling, country colors
    world-map.html             the SVG map
    world-map.css              map styling
  api-key.example.ts           template for the API key file (see below)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (current LTS)
- The Angular CLI: `npm install -g @angular/cli`
- A free API key from [REST Countries](https://restcountries.com/sign-up)

### Installation

```bash
git clone https://github.com/Zabbe007/Interactive-World-Map.git
cd Interactive-World-Map
npm install
```

### Add your API key

The key is kept out of version control. Copy the example file and add your own key:

```bash
cp src/app/api-key.example.ts src/app/api-key.ts
```

Then edit `src/app/api-key.ts`:

```ts
export const REST_COUNTRIES_KEY = 'your-key-here';
```

In your REST Countries dashboard, add `localhost` to the key's allowed origins. Requests from the browser are rejected unless the page's origin is on that list.

### Run locally

```bash
ng serve
```

Open `http://localhost:4200/` and click a country.

## Deployment

The app is deployed to GitHub Pages with `angular-cli-ghpages`:

```bash
ng deploy --base-href="/YOUR-REPO-NAME/"
```

Add your GitHub Pages hostname (`YOUR-USERNAME.github.io`) to the key's allowed origins as well, or the live site's requests will be blocked.

## A Note on the API Key

This is a client-side app, so the key is included in the JavaScript the browser downloads and can be found by anyone who inspects the page. Restricting the key to specific allowed origins limits what someone could do with it. A production version would keep the key on a small backend proxy instead.

## Possible Improvements

- Zoom and pan on the map
- A search box to select a country by name
- Highlighting the currently selected country
- Loading and error messages in the info panel
- Unit tests for the service and components

## Acknowledgments

- Country data from [REST Countries](https://restcountries.com/)
