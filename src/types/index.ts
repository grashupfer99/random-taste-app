import { CATEGORIES, COLOR_MAPS } from "config";
/* -------------------------------------------------------------------------- */

export type CategoryTypes = keyof typeof CATEGORIES;
export type ColorMapTypes = keyof typeof COLOR_MAPS;

export type Place = {
  name: string;
  category: string;
  tel: string;
  distance: number;
  coords: {
    lat: string;
    lng: string;
  };
  address: string;
  naverMapLink: string;
};
