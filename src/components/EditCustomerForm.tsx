import React, { useState, useEffect } from "react";
import type { Client } from "../interfaces";
import { updateCustomer } from "../hooks";

const EventForm: React.FC<{
  client: Client;
  closeModal: any;
  refresh: any;
}> = ({ client, closeModal, refresh }) => {
  const [eventState, setEventState] = useState(client);
  const [buttonDisable, setButtonDisable] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventState({ ...eventState, [name]: value });
  };

  const handlePhysicalAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEventState({
      ...eventState,
      physicalAddress: { ...eventState.physicalAddress, [name]: value },
    });
  };

  const handleClientPostalAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEventState({
      ...eventState,
      postalAddress: { ...eventState.postalAddress, [name]: value },
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventState({ ...eventState, [name]: value });
  };

  // function that posts the new event to the server
  const handleFormSubmit = () => {
    //make a patch json request to the server
    updateCustomer(eventState).then((response) => {
      console.log(response);
      closeModal();
      refresh();
    });
  };

  console.log(eventState);

  return (
    <>
      <div className="text-gray-600">
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="firstName"
                className="mb-3 block text-base font-semibold"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={eventState.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="lastName"
                className="mb-3 block text-base font-semibold"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={eventState.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="secondLastName"
                className="mb-3 block text-base font-semibold"
              >
                Second Last Name
              </label>
              <input
                type="text"
                name="secondLastName"
                id="secondLastName"
                value={eventState.secondLastName}
                onChange={handleInputChange}
                placeholder="Second Last Name"
                className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="mobileNumber"
                className="mb-3 block text-base font-semibold"
              >
                Contact number
              </label>
              <input
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                value={eventState.mobileNumber}
                onChange={handleInputChange}
                placeholder="Contact number"
                className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="emailAddress"
                className="mb-3 block text-base font-semibold"
              >
                Email
              </label>
              <input
                type="text"
                name="emailAddress"
                id="emailAddress"
                value={eventState.emailAddress}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="licenseNumber"
                className="mb-3 block text-base font-semibold"
              >
                License number
              </label>
              <input
                type="text"
                name="licenseNumber"
                id="licenseNumber"
                value={eventState.licenseNumber}
                onChange={handleInputChange}
                placeholder="License number"
                className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-3 sm:w-1/2">
            <label
              htmlFor="addressLine1"
              className="mb-3 block text-base font-semibold"
            >
              Physical Address
            </label>
            <input
              type="text"
              name="addressLine1"
              id="addressLine1"
              onChange={handlePhysicalAddressChange}
              value={eventState.physicalAddress.addressLine1}
              placeholder="Street address or P.O. box"
              className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <input
              type="text"
              name="addressLine2"
              id="addressLine2"
              onChange={handlePhysicalAddressChange}
              value={eventState.physicalAddress.addressLine2}
              placeholder="Apt, suite, unit, building, floor, etc."
              className="mt-2 w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <div className="w-full mt-2 flex space-x-2 ">
              <div className="sm:w-1/2 grid">
                <input
                  type="text"
                  name="city"
                  id="city"
                  onChange={handlePhysicalAddressChange}
                  value={eventState.physicalAddress.city}
                  placeholder="City"
                  className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="sm:w-1/2 grid">
                <input
                  type="text"
                  name="state"
                  onChange={handlePhysicalAddressChange}
                  value={eventState.physicalAddress.state}
                  id="state"
                  placeholder="State"
                  className=" w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full mt-2 flex space-x-2 ">
              <div className="mb-5 sm:w-1/2 grid">
                <input
                  type="text"
                  name="zipCode"
                  value={eventState.physicalAddress.zipCode}
                  onChange={handlePhysicalAddressChange}
                  id="zipCode"
                  placeholder="Zip"
                  className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5 sm:w-1/2 grid">
                <input
                  type="text"
                  name="country"
                  onChange={handlePhysicalAddressChange}
                  value={eventState.physicalAddress.country}
                  id="country"
                  placeholder="Country"
                  className=" w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="w-full px-3 sm:w-1/2">
            <label
              htmlFor="addressLine1"
              className="mb-3 block text-base font-semibold"
            >
              Postal Address
            </label>
            <input
              type="text"
              name="addressLine1"
              id="addressLine1"
              onChange={handleClientPostalAddressChange}
              value={eventState.postalAddress.addressLine1}
              placeholder="Street address or P.O. box"
              className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <input
              type="text"
              name="addressLine2"
              id="addressLine2"
              onChange={handleClientPostalAddressChange}
              value={eventState.postalAddress.addressLine2}
              placeholder="Apt, suite, unit, building, floor, etc."
              className="mt-2 w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <div className="w-full mt-2 flex space-x-2 ">
              <div className="sm:w-1/2 grid">
                <input
                  type="text"
                  name="city"
                  id="city"
                  onChange={handleClientPostalAddressChange}
                  value={eventState.postalAddress.city}
                  placeholder="City"
                  className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="sm:w-1/2 grid">
                <input
                  type="text"
                  name="state"
                  onChange={handleClientPostalAddressChange}
                  value={eventState.postalAddress.state}
                  id="state"
                  placeholder="State"
                  className=" w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full mt-2 flex space-x-2 ">
              <div className="mb-5 sm:w-1/2 grid">
                <input
                  type="text"
                  name="zipCode"
                  value={eventState.postalAddress.zipCode}
                  onChange={handleClientPostalAddressChange}
                  id="zipCode"
                  placeholder="Zip"
                  className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5 sm:w-1/2 grid">
                <input
                  type="text"
                  name="country"
                  onChange={handleClientPostalAddressChange}
                  value={eventState.postalAddress.country}
                  id="country"
                  placeholder="Country"
                  className=" w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className="w-full bg-[#6A64F1] text-white py-3 px-6 text-base font-semibold rounded-md hover:bg-[#5B55E0] focus:outline-none focus:ring-2 focus:ring-[#6A64F1] focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50"
          disabled={buttonDisable}
          onClick={() => {
            // render button disabled
            setButtonDisable(true);
            handleFormSubmit();
          }}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default EventForm;
