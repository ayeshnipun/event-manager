import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function MyModal({
  event,
  client,
  checkOrder,
  order,
  submit,
  handleChange,
  handleOrderChange,
}: any) {
  let [isOpen, setIsOpen] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const padRef = useRef({}) as React.MutableRefObject<any>;
  const [canvas, setCanvas] = useState<string | undefined>(undefined);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const clickedSubmit = () => {
    setSubmitClicked(true);
    submit();
  };

  const formatIntoPng = () => {
    if (padRef.current) {
      const dataURL = padRef.current.toDataURL();
      return dataURL;
    }
  };

  const clear = () => {
    padRef.current?.clear();
  };

  console.log("canvas", canvas);

  return (
    <>
      <button
        onClick={() => checkOrder(order) && openModal()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center outline-none focus:border-[#6A64F1]"
      >
        Confirm Order
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
                    Terms of service
                  </Dialog.Title>
                  <div className="mt-2">
                    Por favor, leer cuidadosamente: PARA SU BENEFICIO, PRUÉBESE
                    LA ROPA ANTES DE SALIR DE LA TIENDA. DE LO CONTRARIO, NO
                    SOMOS RESPONSABLES POR RECLAMACIONES. Todo artículo sucio o
                    extremadamente sucio perderá el depósito de uso totalmente.
                    Todo artículo que fuera perdido o dañado deberá ser pagado
                    por el cliente. En caso de cancelación del contrato, se
                    perderá el dinero depositado y NO será transferible a
                    ninguna otra persona. Todo cambio y/o retraso en la entrega
                    de ropa tiene un cargo de $30.00 diario. NOS RESERVAMOS EL
                    DERECHO DE CANCELACIÓN EN CASO DE QUE CREAMOS PERTINENTE.
                    ¡DIOS LE BENDIGA!
                  </div>
                  <div className="flex justify-center items-center mt-4 text-sm italic">
                    Please sign below:
                  </div>
                  <div className="flex justify-center bg-grey">
                    <SignatureCanvas
                      ref={padRef}
                      penColor="black"
                      onEnd={() => setCanvas(formatIntoPng())}
                      canvasProps={{
                        width: 400,
                        height: 150,
                        className: "sigCanvas rounded-lg bg-gray-100",
                      }}
                    />
                  </div>
                  <div className="flex justify-center items-center mt-2">
                    <button
                      className="inline-flex justify-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={clear}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex justify-center mt-4">
                    <div className="flex items-center">
                      <label className="text-sm font-bold text-gray-500 mr-2">
                        Pickup Date:
                      </label>
                      <input
                        type="date"
                        className="border border-gray-300 rounded-md p-2"
                        name="pickUpDate"
                        value={order.pickUpDate}
                        onChange={handleOrderChange}
                      />

                      <label className="text-sm font-bold text-gray-500 m-2">
                        Return Date:
                      </label>
                      <input
                        type="date"
                        className="border border-gray-300 rounded-md p-2"
                        name="returnDate"
                        value={order.returnDate}
                        onChange={handleOrderChange}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={clickedSubmit}
                    >
                      {submitClicked ? (
                        <div
                          role="status"
                          className="
                  flex items-center justify-center text-gray-200
                "
                        >
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 mr-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                          Submitting
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </button>
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
