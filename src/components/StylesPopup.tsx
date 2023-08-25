import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import StylesForm from "./StylesForm";

export default function MyModal({
  event,
  handleChange,
  styleTypes,
  handleAccessoriesChange,
  selectedAccessories,
  setSelectedAccessoriesInState,
}: any) {
  let [isOpen, setIsOpen] = useState(false);

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
        className="focus:border-[#6A64F1] focus:shadow-md mb-5 text-base flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-sky-600 bg-sky-600 text-sky-100 border duration-200 ease-in-out border-sky-600 transition"
      >
        Open styles form
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
                <Dialog.Panel className="max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold mb-5 leading-6 text-gray-900"
                  >
                    Event styles
                  </Dialog.Title>
                  <div className="mt-2">
                    <StylesForm
                      styleTypes={styleTypes}
                      event={event}
                      handleChange={handleChange}
                      handleAccessoriesChange={handleAccessoriesChange}
                      selectedAccessories={selectedAccessories}
                      setSelectedAccessoriesInState={setSelectedAccessoriesInState}
                      close={closeModal}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
