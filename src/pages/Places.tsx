import { useState, useMemo, useRef } from "react";
import MainLayout from "layouts/Main";
import { usePageTitle } from "hooks";
import { localDB, generateMapLink, getFilteredArray } from "utils";
import classnames from "classnames";
import { CATEGORIES, COLOR_MAPS, DISTANCE } from "config";
import { CategoryTypes, ColorMapTypes } from "types";

/* -------------------------------------------------------------------------- */

export default function Places() {
  usePageTitle("Places");
  const [places] = useState(() => localDB.places.findAll());
  const [search, setSearch] = useState<string>("");
  const [distance, setDistance] = useState(DISTANCE[0].value);
  const [category, setCategory] = useState<CategoryTypes>("ALL");
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const filteredPlaces = useMemo(() => {
    let _places = places;
    if (search) {
      _places = getFilteredArray(_places, search);
    }
    if (category !== "ALL") {
      _places = _places.filter((p) => p.category === category);
    }
    if (distance) {
      _places = _places.filter((p) => p.distance <= distance);
    }
    return _places;
  }, [search, places, category, distance]);

  return (
    <MainLayout>
      {/* Dialog  */}
      <dialog ref={modalRef} id="random-place" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="form flex flex-col items-center">
            {/* Select Categories */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Select category</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryTypes)}
                name="category"
                className="select select-bordered"
              >
                {Object.keys(CATEGORIES).map((category) => (
                  <option key={category} value={category}>
                    {CATEGORIES[category as CategoryTypes].label}
                  </option>
                ))}
              </select>
            </div>
            {/* Select Distance */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Select distance</span>
              </label>
              <select
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                name="distance"
                className="select select-bordered"
              >
                {DISTANCE.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <form method="dialog">
            <button className="mt-4 btn w-full btn">close</button>
          </form>
        </div>
      </dialog>
      <div className="mx-2 mb-20">
        <div className="py-3 flex sticky top-0">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search..."
            className="input input-bordered input-md w-full"
          />
          <button
            className="btn ml-2"
            onClick={() => modalRef?.current?.showModal()}
          >
            filters
          </button>
        </div>

        {filteredPlaces.map((place, key) => (
          <div key={key} className="alert mb-6">
            <div
              className={classnames(
                "badge",
                COLOR_MAPS[
                  CATEGORIES[place.category as CategoryTypes]
                    .color as ColorMapTypes
                ]
              )}
            >
              {CATEGORIES[place.category as CategoryTypes].label}
            </div>
            <div>
              <h3 className="font-bold">{place.name}</h3>
              <div className="text-xs">
                Distance: {place.distance.toFixed(0)}m
              </div>
              <div className="text-xs">{place.address}</div>
            </div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={generateMapLink(place)}
              className="btn btn-sm"
            >
              View Map
            </a>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
