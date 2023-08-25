import React, { useState } from "react";
import StylesDropdown from "./StylesDropdown";
import { Accessory } from "../interfaces";

export default function StylesForm({
  event,
  handleChange,
  close,
  styleTypes,
  handleAccessoriesChange,
  selectedAccessories,
  setSelectedAccessoriesInState,
}: any) {
  const [accessoryState, setAccessoryState] =
    useState<Accessory[]>(selectedAccessories);

  const handleAccessoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccessoryState(
      accessoryState.map((item) =>
        item.name === name ? { ...item, note: value } : item
      )
    );
  };

  const handleAccessoryCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAccessoryState(
      accessoryState.map((item) =>
        item.name === name ? { ...item, checked } : item
      )
    );
  };

  const handleOnSave = () => {
    handleAccessoriesChange(accessoryState);
    setSelectedAccessoriesInState(accessoryState);
    //call prop func to set the selcted accs to the event object
    close();
  };

  return (
    <div className="grid grid-cols-3 gap-5">
      <StylesDropdown
        label="Pants style"
        name="pantStyle"
        value={event.pantStyle}
        onChange={handleChange}
        styles={styleTypes.pantTypes}
      />
      <StylesDropdown
        label="Coat style"
        name="coatStyle"
        value={event.coatStyle}
        onChange={handleChange}
        styles={styleTypes.coatTypes}
      />
      <StylesDropdown
        label="Shirt style"
        name="shirtStyle"
        value={event.shirtStyle}
        onChange={handleChange}
        styles={styleTypes.shirtTypes}
      />
      <div className="col-span-3">
        <div className="mb-5 font-semibold block text-gray-600">
          Accessories
        </div>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
          {accessoryState.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-3 items-center w-full"
            >
              <div className="flex h-full items-center">
                <input
                  type="checkbox"
                  name={item.name}
                  id={item.name}
                  checked={item.checked}
                  onChange={handleAccessoryCheck}
                  className="ml-3 h-full flex items-center hover:cursor-pointer"
                />
                <label
                  htmlFor={item.name}
                  className="pl-3 w-full text-gray-600 h-full flex items-center hover:cursor-pointer"
                >
                  {item.name}
                </label>
              </div>
              <input
                type="text"
                name={item.name}
                id={item.name}
                value={item.note}
                placeholder={"Note"}
                onChange={handleAccessoryChange}
                className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-3 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 w-full px-4 flex justify-end">
          <button
            onClick={handleOnSave}
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
