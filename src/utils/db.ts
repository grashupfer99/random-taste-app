import __placesJSON from "data/places.json";
import { CATEGORIES, DISTANCE } from "config";
import { Place, CategoryTypes } from "types";
import { getDistanceInMeters } from ".";
/* -------------------------------------------------------------------------- */

export class LocalDB {
  private placesJSON = __placesJSON;

  private groupBy<T>(
    list: T[],
    keyGetter: (item: T) => string
  ): Record<string, number> {
    const result: Record<string, number> = {};

    list.forEach((item) => {
      const key = keyGetter(item);
      result[key] = (result[key] || 0) + 1;
    });

    return result;
  }

  places = {
    findAll: (): Place[] => {
      return this.placesJSON
        .map((place) => ({
          ...place,
          distance: getDistanceInMeters(
            Number(place.coords.lat),
            Number(place.coords.lng)
          ),
        }))
        .sort((a, b) => {
          if (a.distance > b.distance) return 1;
          else return -1;
        });
    },
    getRandomPlace: ({
      distance,
      category,
    }: {
      distance: number;
      category: CategoryTypes;
    }): Place => {
      const categoryVal = category || "ALL";
      const distanceVal = distance || DISTANCE[0].value;
      // input validation
      if (
        !Object.keys(CATEGORIES).includes(categoryVal) ||
        !DISTANCE.map((d) => d.value).includes(Number(distanceVal))
      ) {
        return {} as Place;
      }

      let _places = this.places.findAll();
      // 1. conditionally filter by category
      if (categoryVal && categoryVal !== "ALL") {
        _places = _places.filter((place) => place.category === categoryVal);
      }

      // 2. find rearby places
      const nearbyPlaces = _places.filter(
        (place) => place.distance <= Number(distanceVal)
      );
      // 3. pick a random place from the nearby places
      const cryptoRandomArray = new Uint32Array(1);
      crypto.getRandomValues(cryptoRandomArray);
      const randomIndex = cryptoRandomArray[0] % nearbyPlaces.length;
      return nearbyPlaces[randomIndex];
    },
    groupByCategories: () => {
      return this.groupBy(this.placesJSON, (place) => place.category);
    },
  };

  getStats() {
    const places = this.places.findAll();
    const stats = [];
    stats.push({ name: "Total Places", total: places.length });
    const categories = this.places.groupByCategories();
    Object.keys(categories).map((category) => {
      stats.push({
        name: CATEGORIES[category as CategoryTypes].label,
        total: categories[category],
      });
    });
    stats.sort((a, b) => {
      if (a.total > b.total) return -1;
      else return 1;
    });
    return stats;
  }
}
