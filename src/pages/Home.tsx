import { useState, FormEvent, useRef } from "react";
import MainLayout from "layouts/Main";
import { usePageTitle } from "hooks";
import { CategoryTypes, ColorMapTypes, Place } from "types";
import { localDB, logger, generateMapLink } from "utils";
import { CATEGORIES, DISTANCE, COLOR_MAPS } from "config";
import classnames from "classnames";
/* -------------------------------------------------------------------------- */

interface CustomElements extends HTMLFormControlsCollection {
  category: HTMLSelectElement;
  distance: HTMLSelectElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

const STATS = localDB.getStats();

export default function Home() {
  usePageTitle("Home");
  const [place, setPlace] = useState<Place | null>(null);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  async function handleSubmit(e: FormEvent<CustomForm>) {
    e.preventDefault();
    const target = e.currentTarget.elements;
    const categoryVal = target?.category?.value as CategoryTypes;
    const distanceVal = target?.distance?.value;

    const randomPlace = localDB.places.getRandomPlace({
      distance: Number(distanceVal),
      category: categoryVal,
    });
    logger.debug(randomPlace);
    const modal = modalRef.current;
    if (randomPlace && modal) {
      setPlace(randomPlace);
      modal?.showModal();
    }
  }

  return (
    <MainLayout>
      <>
        {/* Dialog  */}
        <dialog ref={modalRef} id="random-place" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            {place && (
              <div className="mt-3">
                <div className="stats stats-vertical w-full text-center">
                  <div className="stat mx-0 px-0">
                    <div className="stat-title font-bold whitespace-break-spaces">
                      {place.name}
                    </div>
                    <div className="stat-actions my-2">
                      <div
                        className={classnames(
                          "badge",
                          "badge-lg",
                          COLOR_MAPS[
                            CATEGORIES[place.category as CategoryTypes]
                              .color as ColorMapTypes
                          ]
                        )}
                      >
                        {CATEGORIES[place?.category as CategoryTypes].label}
                      </div>
                    </div>
                    <div className="stat-title">
                      Distance: {place?.distance.toFixed(0)}m
                    </div>
                    <div className="stat-title whitespace-break-spaces my-2">
                      {place.address}
                    </div>
                    <div className="stat-actions w-full">
                      <a
                        className="btn btn-sm w-full"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={generateMapLink(place)}
                      >
                        View Map
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </dialog>

        <div>
          {/* Stats */}
          <div className="text-center my-2">
            <div className="h-48 carousel carousel-vertical rounded-box shadow ">
              {STATS.map(({ name, total }) => (
                <div key={name} className="carousel-item h-full">
                  <div className="stat mx-16">
                    <div className="stat-title">{name}</div>
                    <div className="stat-value">{total}</div>
                    <div className="stat-desc">
                      <svg
                        width="12px"
                        height="12px"
                        className="ml-2 h-3 w-3 fill-current inline-block"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 2048 2048"
                      >
                        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Form */}
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
              <select name="distance" className="select select-bordered">
                {DISTANCE.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full max-w-xs mt-6">
              <button type="submit" className="btn btn-outline w-full">
                🍋 Get Random Taste
              </button>
            </div>
          </form>
        </div>
      </>
    </MainLayout>
  );
}
