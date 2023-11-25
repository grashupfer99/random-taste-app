import { DevLogger, ProdLogger, AppLogger } from "./logger";
import { LocalDB } from "./db";
import { Place } from "types";
import { OFFICE_COORDS, MAP_QUERY } from "config";
import _forEach from "lodash/forEach";
import _filter from "lodash/filter";
import _toLower from "lodash/toLower";
/* -------------------------------------------------------------------------- */

class Factory {
  static getLogger(): AppLogger {
    return new (import.meta.env.DEV ? DevLogger : ProdLogger)();
  }
  static getLocalDb() {
    return new LocalDB();
  }
}

export const logger = Factory.getLogger();
export const localDB = Factory.getLocalDb();

export const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

export const generateMapLink = (place: Place) => {
  if (isMobile()) {
    if (place.naverMapLink.includes("p/search")) {
      return place.naverMapLink.replace(MAP_QUERY.NAVER, MAP_QUERY.GOOGLE);
    } else {
      return place.naverMapLink;
    }
  } else {
    return place.naverMapLink;
  }
};

export function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
export function getDistanceInMeters(lat: number, lng: number) {
  const earthRadius = 6371 * 1000; // Earth radius in meters
  const dLat = deg2rad(lat - OFFICE_COORDS.LAT); // Convert degrees to radians
  const dLon = deg2rad(lng - OFFICE_COORDS.LNG); // Convert degrees to radians
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(OFFICE_COORDS.LAT)) *
      Math.cos(deg2rad(lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2); // Calc intermediate result based on lat & lng between the two points
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Calc angular distance
  return earthRadius * c; // return distance in meters
}

export function getFilteredArray<T>(arr: Array<T>, search: string) {
  if (search.length === 0) {
    return arr;
  }
  return filterArrayByString(arr, search);
}

export function filterArrayByString<T>(mainArr: Array<T>, searchText: string) {
  if (searchText === "") {
    return mainArr;
  }

  searchText = _toLower(searchText);

  return _filter(mainArr, (itemObj) => searchInObj(itemObj, searchText));
}

export function searchInObj<T>(itemObj: T, searchText: string) {
  if (!itemObj) {
    return false;
  }

  const propArray = Object.keys(itemObj);

  for (let i = 0; i < propArray.length; i += 1) {
    const prop = propArray[i];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = itemObj[prop];

    if (typeof value === "string") {
      if (searchInString(value, searchText)) {
        return true;
      }
    } else if (Array.isArray(value)) {
      if (searchInArray(value, searchText)) {
        return true;
      }
    }

    if (typeof value === "object") {
      if (searchInObj(value, searchText)) {
        return true;
      }
    }
  }
  return false;
}

export function searchInString(value: string, searchText: string) {
  return _toLower(value).includes(searchText);
}

export function searchInArray<T>(arr: Array<T>, searchText: string) {
  _forEach(arr, (value) => {
    if (typeof value === "string") {
      if (searchInString(value, searchText)) {
        return true;
      }
    }

    if (typeof value === "object") {
      if (searchInObj(value, searchText)) {
        return true;
      }
    }

    return false;
  });

  return false;
}
