import { useEffect, useState } from "react";
import Image from "next/image";
import measurementImage from "../../public/measurements.png";
import type { CustomerMeasurement } from "../interfaces";

type ShirtSize = {
  id: number;
  name: string;
  type: number;
};

const DropDown = ({ label, options, onChange, name, value }: any) => {
  return (
    <div className="grid grid-cols-3 gap-3 mb-2 justify-center">
      <div className="w-full justify-end flex items-center">
        <label htmlFor={name} className="block text-gray-600">
          {label}:
        </label>
      </div>
      <select
        name={name}
        id={label}
        value={value}
        onChange={onChange}
        className="col-span-2 rounded-md border border-[#c7c7c7] bg-white p-3 text-gray-600 font-thin text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      >
        {options.map((item: any, index: number) => (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const FreeText = ({ label, onChange, name, value }: any) => {
  return (
    <div className="grid grid-cols-3 gap-3 justify-center mb-2">
      <div className="w-full justify-end flex items-center">
        <label htmlFor={label} className="block text-gray-600">
          {label}:
        </label>
      </div>
      <input
        type="text"
        name={name}
        id={name}
        onChange={onChange}
        placeholder={label}
        value={value}
        className="rounded-md col-span-2 border border-[#c7c7c7] bg-white p-3 text-gray-600 font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
    </div>
  );
};

const NumberInput = ({ label, onChange, name, value }: any) => {
  return (
    <div className="grid grid-cols-3 gap-3 justify-center mb-2">
      <div className="w-full justify-end flex items-center">
        <label htmlFor={label} className="block text-gray-600">
          {label}:
        </label>
      </div>
      <input
        type="number"
        name={name}
        id={name}
        onChange={onChange}
        placeholder={label}
        value={value}
        className="rounded-md col-span-2 border border-[#c7c7c7] bg-white p-3 text-gray-600 font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
    </div>
  );
};

export default function MeasurementForm({
  measurements,
  handleChange,
}: {
  measurements: CustomerMeasurement;
  handleChange: any;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shirtSizes: ShirtSize[] = [
    {
      id: 1,
      name: "10-10.5 BX Small",
      type: 1,
    },
    {
      id: 2,
      name: "11-11.5 B Small",
      type: 1,
    },
    {
      id: 3,
      name: "12-12.5 B Medium",
      type: 1,
    },
    {
      id: 4,
      name: "13-13.5 B Large",
      type: 1,
    },
    {
      id: 5,
      name: "14-14.5 Small",
      type: 2,
    },
    {
      id: 6,
      name: "15-15.5 Medium",
      type: 2,
    },
    {
      id: 7,
      name: "16-16.5 Large",
      type: 2,
    },
    {
      id: 8,
      name: "17-17.5 XLarge",
      type: 2,
    },
    {
      id: 9,
      name: "18-18.5 XXLarge",
      type: 2,
    },
  ];

  const sizes = [
    {
      id: 1,
      name: "S",
    },
    {
      id: 2,
      name: "M",
    },
    {
      id: 3,
      name: "L",
    },
  ];

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="w-full px-3">
        <div className="mb-5">
          <div className="mb-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-center">
              <div className="h-full">
                <span className="flex content-center mb-3 block text-gray-600 font-semibold">
                  Coat measurements
                </span>
                <DropDown
                  label="Size"
                  name="coatSizeId"
                  onChange={handleChange}
                  value={measurements.coatSizeId}
                  options={sizes}
                />
                <NumberInput
                  label="Chest"
                  name="chestSize"
                  value={measurements.chestSize}
                  onChange={handleChange}
                />
                <FreeText
                  label="Sleeve"
                  name="coatSleeveSize"
                  value={measurements.coatSleeveSize}
                  onChange={handleChange}
                />
                <FreeText
                  label="Comment"
                  name="coatAdditionalInfo"
                  value={measurements.coatAdditionalInfo}
                  onChange={handleChange}
                />
              </div>

              <div className="h-full">
                <span className="flex content-center mb-3 block text-gray-600 font-semibold">
                  Pant measurements
                </span>
                <DropDown
                  label="Size"
                  name="pantSizeId"
                  onChange={handleChange}
                  options={sizes}
                  value={measurements.pantSizeId}
                />
                <FreeText
                  label="Waist"
                  name="waistSize"
                  value={measurements.waistSize}
                  onChange={handleChange}
                />
                <FreeText
                  label="Outseam"
                  name="outseam"
                  value={measurements.outseam}
                  onChange={handleChange}
                />
                <FreeText
                  label="Comment"
                  name="pantAdditional"
                  value={measurements.pantAdditional}
                  onChange={handleChange}
                />
              </div>

              <div className="h-full">
                <span className="flex content-center mb-3 block text-gray-600 font-semibold">
                  Shirt measurements
                </span>
                <DropDown
                  label="Size"
                  name="shirtSizeId"
                  onChange={handleChange}
                  options={shirtSizes}
                  value={measurements.shirtSizeId}
                />
                <FreeText
                  label="Sleeve"
                  name="shirtSleeveSize"
                  onChange={handleChange}
                  value={measurements.shirtSleeveSize}
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <span className="flex content-center mb-3 block text-gray-600 font-semibold">
              How to measure:
            </span>
            <Image src={measurementImage} alt="measurement" />
          </div>
        </div>
      </div>
    </div>
  );
}
