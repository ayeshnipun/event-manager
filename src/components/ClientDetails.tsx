import { useEffect, useState } from "react";
import { Address } from "../interfaces";

let address: Address = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
};

const Address = ({ addressType }: any) => {
  return (
    <>
      <div className="w-full px-3 sm:w-1/2">
        <label
          htmlFor="addressLine1"
          className="mb-3 block text-base font-semibold"
        >
          {addressType} Address
        </label>
        <input
          type="text"
          name="addressLine1"
          id="addressLine1"
          placeholder="Street address or P.O. box"
          className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
        <input
          type="text"
          name="addressLine2"
          id="addressLine2"
          placeholder="Apt, suite, unit, building, floor, etc."
          className="mt-2 w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
        <div className="w-full mt-2 flex space-x-2 ">
          <div className="sm:w-1/2 grid">
            <input
              type="text"
              name="city"
              id="city"
              placeholder="City"
              className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="sm:w-1/2 grid">
            <input
              type="text"
              name="state"
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
              name="zip"
              id="zip"
              placeholder="Zip"
              className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5 sm:w-1/2 grid">
            <input
              type="text"
              name="country"
              id="country"
              placeholder="Country"
              className=" w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-light text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default function ClientInfo() {
  const [client, setClient] = useState({
    firstName: "",
    lastName: "",
    secondLastName: "",
    mobileNumber: "",
    licenseNumber: "",
    email: "",
    phone: "",
    address: address,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                First Name*
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
                Last Name*
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
                Contact number*
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
                htmlFor="email"
                className="mb-3 block text-base font-semibold"
              >
                Email*
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={client.email}
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
                License number*
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
          <Address addressType="Residential" />
          <Address addressType="Postal" />
        </div>
      </form>
    </>
  );
}
