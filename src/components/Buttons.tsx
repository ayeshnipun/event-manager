import React, { useState } from "react";
import { useRouter } from "next/router";
import TOSPopup from "./TOSPopup";

const Buttons = ({
  step,
  setStep,
  submit,
  checkEvent,
  checkClient,
  event,
  client,
  order,
  checkOrder,
  handleOrderChange,
  setValid,
}: any) => {
  const [submitClicked, setSubmitClicked] = useState(false);

  const router = useRouter();

  return (
    <div className="flex mt-6">
      <button
        disabled={submitClicked}
        onClick={() => (step === 1 ? router.back() : setStep(step - 1))}
        className="text-base flex justify-center px-4 py-2 rounded font-bold bg-gray-100 text-gray-700 border border-gray-600 outline-none hover:bg-gray-200 cursor-pointer"
      >
        Back
      </button>
      <div className="flex-auto flex flex-row-reverse">
        {step === 1 ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center outline-none focus:border-[#6A64F1]"
            onClick={() => {
              checkEvent(event, setValid) ? setStep(step + 1) : "";
            }}
          >
            Next
          </button>
        ) : step === 2 ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center outline-none focus:border-[#6A64F1]"
            onClick={() => {
              checkClient(client, setValid) ? setStep(step + 1) : "";
            }}
          >
            Next
          </button>
        ) : step === 3 ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center outline-none focus:border-[#6A64F1]"
            onClick={() => {
              setStep(step + 1);
            }}
          >
            Next
          </button>
        ) : step === 4 ? (
          <TOSPopup
            event={event}
            client={client}
            order={order}
            checkOrder={checkOrder}
            handleOrderChange={handleOrderChange}
            submit={submit}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Buttons;
