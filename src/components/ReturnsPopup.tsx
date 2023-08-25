import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ReturnsForm = ({ orderId }: any) => {
  //convert orderId to number
  orderId = Number(orderId);

  const [returnsForm, setReturnsForm] = useState({
    shirt: false,
    shirtOption: "Good",
    coat: false,
    coatOption: "Good",
    pants: false,
    pantsOption: "Good",
  });

  const updateReturnsForm = (e: any) => {
    // if option is checkbox then set to true or false
    if (e.target.type === "checkbox") {
      setReturnsForm({
        ...returnsForm,
        [e.target.name]: e.target.checked,
      });
    } else {
      setReturnsForm({
        ...returnsForm,
        [e.target.name]: e.target.value,
      });
    }
  };

  console.log("returns", returnsForm);

  return (
    <div className="mt-2">
      <div className="flex flex-col">
        <div className="flex flex-row items-center space-x-3 mb-5 justify-between">
          <div>
            <input
              type="checkbox"
              name="shirt"
              id="shirt"
              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
              onChange={updateReturnsForm}
            />
            <label htmlFor="shirt" className="text-lg ml-4">
              Shirt
            </label>
          </div>
          <div className="flex space-x-2 items-center w-1/2">
            <select
              name="shirtOption"
              id="shirtOption"
              onChange={updateReturnsForm}
              disabled={!returnsForm.shirt}
              className={`w-full rounded-md border border-[#c7c7c7] bg-white py-2 px-3 text-base font-thin text-gray-600 outline-none ${
                !returnsForm.shirt ? "bg-gray-200" : ""
              }`}
            >
              <option value="Good">Good</option>
              <option value="Missing">Missing</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-3 mb-5 justify-between">
          <div>
            <input
              type="checkbox"
              name="coat"
              id="coat"
              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
              onChange={updateReturnsForm}
            />
            <label htmlFor="coat" className="text-lg ml-4">
              Coat
            </label>
          </div>
          <div className="flex space-x-2 items-center w-1/2">
            <select
              name="coatOption"
              id="coatOption"
              onChange={updateReturnsForm}
              disabled={!returnsForm.coat}
              className={`w-full rounded-md border border-[#c7c7c7] bg-white py-2 px-3 text-base font-thin text-gray-600 outline-none ${
                !returnsForm.coat ? "bg-gray-200" : ""
              }`}
            >
              <option value="Good">Good</option>
              <option value="Missing">Missing</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-3 mb-5 justify-between">
          <div>
            <input
              type="checkbox"
              name="pants"
              id="pants"
              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
              onChange={updateReturnsForm}
            />
            <label htmlFor="pants" className="text-lg ml-4">
              Pants
            </label>
          </div>
          <div className="flex space-x-2 items-center w-1/2">
            <select
              name="pantsOption"
              id="pantsOption"
              onChange={updateReturnsForm}
              disabled={!returnsForm.pants}
              className={`w-full rounded-md border border-[#c7c7c7] bg-white py-2 px-3 text-base font-thin text-gray-600 outline-none ${
                !returnsForm.pants ? "bg-gray-200" : ""
              }`}
            >
              <option value="Good">Good</option>
              <option value="Missing">Missing</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-end space-x-3">
        <button
          type="button"
          className="mt-5 text-base flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-sky-700 bg-sky-600 text-white border-0"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const ReturnsPopup = ({ orderId }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        onClick={openModal}
        className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Return Order
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full mx-auto items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold mb-5 leading-6 text-gray-900"
                  >
                    Returning order #{orderId}
                  </Dialog.Title>
                  <ReturnsForm orderId={orderId} closeModal={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ReturnsPopup;
