import { useState, FormEvent } from "react";
import { MAIN_COORDS, CATEGORIES, DEFAULT_DISTANCE } from "./config";
import PLACES from "./data/places.json";

/* -------------------------------------------------------------------------- */

type CategoryTypes = keyof typeof CATEGORIES;

interface CustomElements extends HTMLFormControlsCollection {
  category: HTMLSelectElement;
  distance: HTMLSelectElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

function getDistanceInMeters(lat: number, lng: number) {
  const earthRadius = 6371 * 1000; // Haversine formula in meters
  const dLat = deg2rad(lat - MAIN_COORDS.LAT); // Convert degrees to radians
  const dLon = deg2rad(lng - MAIN_COORDS.LNG); // Convert degrees to radians
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(MAIN_COORDS.LAT)) *
      Math.cos(deg2rad(lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2); // Calc intermediate result based on lat & lng between the two points
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Calc angular distance
  return earthRadius * c; // return distance in meters
}

function App() {
  const [place, setPlace] = useState<PlaceType | null>(null);

  function handleSubmit(e: FormEvent<CustomForm>) {
    e.preventDefault();
    const target = e.currentTarget.elements;
    const categoryVal = target?.category?.value as CategoryTypes;
    const distanceVal = target?.distance?.value;

    let places = PLACES;
    if (categoryVal && categoryVal !== "ALL") {
      places = places.filter((place) => place.category === categoryVal);
    }
    const nearbyPlaces = places.filter((place) => {
      const distance = getDistanceInMeters(
        Number(place.coords.lat),
        Number(place.coords.lng)
      );
      return distance <= Number(distanceVal || DEFAULT_DISTANCE);
    });
    const randomIndex = Math.floor(Math.random() * nearbyPlaces.length);
    const randomItem = nearbyPlaces[randomIndex];
    console.log(randomItem);
    if (randomItem) setPlace(randomItem);
  }

  return (
    <>
      {/* Header */}
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost text-xl">
            Random Taste
          </a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <svg
                  height="32px"
                  width="32px"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512.002 512.002"
                  xmlSpace="preserve"
                  fill="#000000"
                >
                  <g>
                    <path
                      style={{ fill: "#CFF09E" }}
                      d="M143.285,309.118l15.038,187.854h60.104v-62.121h62.121v62.121h133.246l15.038-187.854H143.285z M329.896,418.672l-43.926-43.928l43.926-43.926l43.926,43.926L329.896,418.672z"
                    ></path>
                    <path
                      style={{ fill: "#507C5C" }}
                      d="M454.917,111.07c-2.845-3.083-6.849-4.835-11.044-4.835H301.089V15.029 C301.089,6.73,294.361,0,286.06,0s-15.029,6.73-15.029,15.029v279.06h-113.87l-13.932-174.022 c-0.661-8.274-7.89-14.451-16.181-13.782c-8.274,0.661-14.445,7.907-13.782,16.181l3.392,42.371 c-19.263-5.128-33.499-22.715-33.499-43.57c0-24.862,20.227-45.088,45.088-45.088s45.088,20.227,45.088,45.088 c0,8.299,6.729,15.029,15.029,15.029c8.301,0,15.029-6.73,15.029-15.029c0-41.436-33.711-75.147-75.147-75.147 S53.1,79.83,53.1,121.266c0,38.352,28.885,70.064,66.039,74.576l24.203,302.33c0.625,7.811,7.146,13.83,14.981,13.83h60.104h62.121 h133.246c7.835,0,14.356-6.019,14.981-13.83l15.038-187.852v-0.008l15.038-187.845C459.19,118.283,457.762,114.153,454.917,111.07z M427.592,136.295L414.96,294.089h-113.87V136.295H427.592z M265.519,481.941h-32.062v-32.062h32.062L265.519,481.941 L265.519,481.941z M295.578,481.941V434.85c0-8.299-6.729-15.029-15.029-15.029h-62.121c-8.301,0-15.029,6.73-15.029,15.029v47.092 h-31.2l-12.632-157.793h155.745l-39.969,39.969c-2.818,2.818-4.402,6.641-4.402,10.627s1.584,7.808,4.402,10.627l43.926,43.928 c2.818,2.818,6.642,4.402,10.627,4.402s7.809-1.584,10.627-4.402l43.926-43.928c2.818-2.82,4.402-6.642,4.402-10.627 s-1.584-7.809-4.402-10.627l-39.969-39.969h68.074l-12.632,157.793H295.578z M329.895,352.072l22.672,22.672l-22.672,22.672 l-22.672-22.672L329.895,352.072z"
                    ></path>
                  </g>
                </svg>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Main  */}
      <div>
        <div className="text-center my-2">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total places in the area </div>
              <div className="stat-value">{PLACES.length}</div>
              <div className="stat-desc">
                Use preferences below to pick a random place
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="form flex flex-col items-center"
        >
          {/* Select Categories */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Select category</span>
            </label>
            <select name="category" className="select select-bordered">
              {Object.keys(CATEGORIES).map((category) => (
                <option key={category} value={category}>
                  {CATEGORIES[category as CategoryTypes]}
                </option>
              ))}
            </select>
          </div>
          {/* Select Distance */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Select distance</span>
            </label>
            <select name="distance" className="select select-bordered">
              <option value={500}>500m</option>
              <option value={1000}>1km</option>
              <option value={2000}>2km or more</option>
            </select>
          </div>

          <div className="form-control w-full max-w-xs mt-6">
            <button type="submit" className="btn btn-outline w-full">
              🍋 Get Random Taste
            </button>
          </div>

          {/* Randomly Selected Place */}
          {place && (
            <div className="card w-96 bg-base-100 mt-6 border-2">
              <div className="card-body">
                <h2 className="card-title">{place?.name}</h2>
                <div className="card-actions justify-start">
                  <div className="badge badge-outline badge-lg">
                    {CATEGORIES[place?.category as CategoryTypes]}
                  </div>
                  <a
                    href={`tel:${place?.tel}`}
                    className="badge badge-lg badge-info badge-lg"
                  >
                    {place?.tel}
                  </a>
                </div>
                <p>{place?.address}</p>
                <a
                  className="btn btn-info"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={place?.naverMapLink}
                >
                  View on Naver Map
                </a>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default App;
