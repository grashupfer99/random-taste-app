# 🍋🍋 Random Taste App 🍋🍋

This app picks a random restaurant or café from nearby options around the office in Gangnam area, near the Sinnonhyeon subway station in Seoul. Custom filter option are available for selecting a restaurant's type and distance.

Because the office location is fixed, its coordinates remain constant. The [Haversine formula](https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api) to figure out where the office is and measure how far each restaurant is from there. Additionally, selected filter options, e.g.: place category and distance are applied too if selected.

## Development

The project was bootstrapped with [Vite](https://vitejs.dev/).
\
Package Manager: [Pnpm](https://pnpm.io/)

- Installation
  - run `pnpm install`
- Local Development
  - run `pnpm dev`
