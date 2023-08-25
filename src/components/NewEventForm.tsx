import React, { useEffect, useState } from "react";
import Popup from "./StylesPopup";
import { Accessory } from "../interfaces";

const accessories = [
  "Tie",
  "Handkerchief",
  "Bowtie",
  "Ascot",
  "Vest",
  "Sash",
  "Suspenders",
  "Other",
];

export default function NewEventForm({
  event,
  handleChange,
  styleTypes,
  handleAccessoriesChange,
}: any) {
  //use this to retain the selected accessories
  const [selectedAccessories, setSelectedAccessories] = useState<Accessory[]>(
    []
  );

  useEffect(() => {
    const initialAccessories = accessories.map((item) => ({
      name: item,
      checked: false,
      note: "",
    }));
    setSelectedAccessories(initialAccessories);
  }, []);

  const setSelectedAccessoriesInState = (accessories: Accessory[]) => {
    const checkedAccessories: Accessory[] = accessories.filter(
      (accessory) => accessory.checked
    );

    setSelectedAccessories(() => accessories);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="text-gray-600">
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="organizer1"
                className="mb-3 block text-base font-semibold"
              >
                Name of organizer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="organizer1"
                id="organizer1"
                placeholder="Name of organizer"
                value={event.organizer1}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>

          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="organizer1phone"
                className="mb-3 block text-base font-semibold"
              >
                Contact number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="organizer1phone"
                id="organizer1phone"
                placeholder="Contact number 1"
                value={event.organizer1phone}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="organizer2"
                className="mb-3 block text-base font-semibold"
              >
                Name of organizer 2
              </label>
              <input
                type="text"
                name="organizer2"
                id="organizer2"
                placeholder="Name of organizer"
                value={event.organizer2}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>

          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="organizer2phone"
                className="mb-3 block text-base font-semibold"
              >
                Contact number 2
              </label>
              <input
                type="text"
                name="organizer2phone"
                id="organizer2phone"
                placeholder="Contact number 2"
                value={event.organizer2phone}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>

        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="date"
                className="mb-3 block text-base font-semibold"
              >
                Event Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={event.date}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>

          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="time"
                className="mb-3 block text-base font-semibold"
              >
                Time of event <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="time"
                id="time"
                value={event.time}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="type"
                className="mb-3 block text-base font-semibold"
              >
                Type of event
              </label>
              <div className="relative w-full">
                <select
                  name="type"
                  id="type"
                  value={event.type}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Sweet 16">Sweet 16</option>
                  <option value="Senior Prom">Senior Prom</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="guests"
                className="mb-3 block text-base font-semibold"
              >
                Event styles
              </label>
              <div className="flex">
                <Popup
                  styleTypes={styleTypes}
                  handleChange={handleChange}
                  handleAccessoriesChange={handleAccessoriesChange}
                  setSelectedAccessoriesInState={setSelectedAccessoriesInState}
                  selectedAccessories={selectedAccessories}
                  event={event}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
