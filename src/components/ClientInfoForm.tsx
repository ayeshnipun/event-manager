import { useEffect, useState } from "react";
import type { Client, Address } from "../interfaces";

const Address = ({
  address,
  handleChange,
  disabled,
}: {
  address: Address;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}) => {
  return (
    <>
      <input
        disabled={disabled}
        type="text"
        name="addressLine1"
        id="addressLine1"
        value={address.addressLine1}
        onChange={handleChange}
        placeholder="Street address or P.O. box"
        className={`w-full mb-2 rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
          disabled ? "cursor-not-allowed bg-gray-50" : ""
        }
            
          `}
      />
      <input
        disabled={disabled}
        type="text"
        name="addressLine2"
        id="addressLine2"
        value={address.addressLine2}
        onChange={handleChange}
        placeholder="Apt, suite, unit, building, floor, etc."
        className={`w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
          disabled ? "cursor-not-allowed bg-gray-50" : ""
        }
            
          `}
      />
      <div className="w-full mt-2">
        <div className="grid grid-cols-2 gap-2">
          <input
            disabled={disabled}
            type="text"
            name="city"
            id="city"
            value={address.city}
            onChange={handleChange}
            placeholder="City"
            className={`w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
              disabled ? "cursor-not-allowed bg-gray-50" : ""
            }
                
              `}
          />
          <input
            disabled={disabled}
            type="text"
            name="state"
            id="state"
            value={address.state}
            onChange={handleChange}
            placeholder="State"
            className={`w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
              disabled ? "cursor-not-allowed bg-gray-50" : ""
            }
                
              `}
          />
        </div>
      </div>
      <div className="w-full mt-2">
        <div className="mb-5 grid grid-cols-2 gap-2">
          <input
            disabled={disabled}
            type="text"
            name="zipCode"
            id="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            placeholder="Zip code"
            className={`w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
              disabled ? "cursor-not-allowed bg-gray-50" : ""
            }
                
              `}
          />
          <input
            disabled={disabled}
            type="text"
            name="country"
            id="country"
            value={address.country}
            onChange={handleChange}
            placeholder="Country"
            className={`w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
              disabled ? "cursor-not-allowed bg-gray-50" : ""
            }
                
              `}
          />
        </div>
      </div>
    </>
  );
};

export interface ClientInfoProps {
  client: Client;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClientPhysicalAddressChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleClientPostalAddressChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function ClientInfo({
  client,
  handleChange,
  handleClientPhysicalAddressChange,
  handleClientPostalAddressChange,
}: ClientInfoProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [sameAsPhysicalAddress, setSameAsPhysicalAddress] = useState(false);

  const handleSameAsPhysicalAddressChange = () => {
    setSameAsPhysicalAddress(!sameAsPhysicalAddress);
    // copy physical address to postal address
    if (!sameAsPhysicalAddress) {
      client.postalAddress.addressLine1 = client.physicalAddress.addressLine1;
      client.postalAddress.addressLine2 = client.physicalAddress.addressLine2;
      client.postalAddress.city = client.physicalAddress.city;
      client.postalAddress.state = client.physicalAddress.state;
      client.postalAddress.zipCode = client.physicalAddress.zipCode;
      client.postalAddress.country = client.physicalAddress.country;
    } else {
      client.postalAddress.addressLine1 = "";
      client.postalAddress.addressLine2 = "";
      client.postalAddress.city = "";
      client.postalAddress.state = "";
      client.postalAddress.zipCode = "";
      client.postalAddress.country = "";
    }
  };

  return (
    <>
      <form className="text-gray-600">
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="firstName"
                className="mb-3 block text-base font-semibold"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={client.firstName}
                onChange={handleChange}
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
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={client.lastName}
                onChange={handleChange}
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
                value={client.secondLastName}
                onChange={handleChange}
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
                Contact number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                value={client.mobileNumber}
                onChange={handleChange}
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
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="emailAddress"
                id="emailAddress"
                value={client.emailAddress}
                onChange={handleChange}
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
                License number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="licenseNumber"
                id="licenseNumber"
                value={client.licenseNumber}
                onChange={handleChange}
                placeholder="License number"
                className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-3 sm:w-1/2">
            <label className="mb-3 block text-base font-semibold">
              Physical Address <span className="text-red-500">*</span>
            </label>
            <Address
              disabled={false}
              address={client.physicalAddress}
              handleChange={handleClientPhysicalAddressChange}
            />
          </div>
          <div className="w-full px-3 sm:w-1/2">
            <div className="flex items-center justify-between mb-3">
              <label className=" block text-base font-semibold">
                Postal Address
              </label>
              <div className="ml-3">
                <input
                  type="checkbox"
                  name="sameAsPhysicalAddress"
                  id="sameAsPhysicalAddress"
                  checked={sameAsPhysicalAddress}
                  onChange={handleSameAsPhysicalAddressChange}
                  className="mr-3"
                />
                <label htmlFor="sameAsPhysicalAddress">
                  Same as physical address
                </label>
              </div>
            </div>
            <Address
              disabled={sameAsPhysicalAddress}
              address={client.postalAddress}
              handleChange={handleClientPostalAddressChange}
            />
          </div>
        </div>
      </form>
    </>
  );
}
