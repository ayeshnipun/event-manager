import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import type { Payment } from "../interfaces";
import { postPayment } from "../hooks";

const PaymentForm = ({
  orderId,
  refreshPayments,
  closeModal,
  toBePaid,
  customerName,
}: any) => {
  // state for form options
  const [paymentState, setPaymentState] = useState({
    cash: false,
    card: false,
  });

  const [remainingClicked, setRemainingClicked] = useState(false);

  //convert orderId to number
  orderId = Number(orderId);

  const [payment, setPayment] = useState<Payment>({
    orderId,
    customerName,
    paymentAmount: toBePaid,
    amountLeft: 0,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // if payment amount is 0 then return
    if (payment.paymentAmount === 0) {
      alert("Payment cannot be 0");
      return;
    }
    // if amountLeft is less than 0 then return
    else if (payment.amountLeft < 0) {
      alert("Payment amount cannot be greater than amount left");
      return;
    } else {
      postPayment(payment).then((res) => {
        closeModal();
        refreshPayments();
      });
    }
  };

  console.log("payment", payment);

  return (
    <div className="mt-2 ">
      <div className="flex flex-col">
        <div className="">
          <div className="flex flex-row items-center justify-between space-x-3 mb-5">
            <span className="text-sm font-medium">Payment method:</span>
            <div className="flex space-x-2 items-center">
              <input
                checked={paymentState.cash}
                onChange={(e) =>
                  setPaymentState({
                    ...paymentState,
                    cash: e.target.checked,
                    card: false,
                  })
                }
                type="checkbox"
                name="cash"
                id="cash"
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
              />

              <label htmlFor="cash" className="ml-3 block text-sm">
                Cash
              </label>
              <input
                checked={paymentState.card}
                onChange={(e) =>
                  setPaymentState({
                    ...paymentState,
                    card: e.target.checked,
                    cash: false,
                  })
                }
                type="checkbox"
                name="card"
                id="card"
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
              />

              <label htmlFor="card" className="ml-3 block text-sm">
                Card
              </label>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center space-x-3 mb-5">
            <label htmlFor="amount" className="text-sm font-medium">
              Payment amount:
            </label>
            <div className="flex items-center gap-6 justify-end">
              <input
                type="text"
                value={payment.paymentAmount}
                name="amount"
                id="amount"
                disabled={remainingClicked}
                onChange={(e) =>
                  setPayment({
                    ...payment,
                    // change amountLeft to paymentAmount - amountLeft
                    amountLeft: toBePaid - Number(e.target.value),
                    paymentAmount: Number(e.target.value),
                  })
                }
                className={`w-1/2 border border-[#c7c7c7] rounded-md px-3 text-right ${
                  remainingClicked ? "bg-gray-300" : ""
                }`}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end items-center space-x-3">
            <div className="flex items-end gap-6 justify-end">
              <label htmlFor="payoff" className="ml-3 block text-sm">
                Pay off remaining
              </label>
              <input
                type="checkbox"
                name="payoff"
                id="payoff"
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                onChange={(e) => {
                  setRemainingClicked(e.target.checked);
                  setPayment({
                    ...payment,
                    amountLeft: 0,
                    paymentAmount: toBePaid,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end space-x-3">
          <button
            onClick={handleSubmit}
            type="button"
            className="mt-5 text-base flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-sky-700 bg-sky-600 text-white border-0"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentPopup = ({
  orderId,
  refreshPayments,
  amountLeft,
  customerName,
}: any) => {
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
        New payment
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
                    Make a new payment for order #{orderId}
                  </Dialog.Title>
                  <PaymentForm
                    toBePaid={amountLeft}
                    customerName={customerName}
                    orderId={orderId}
                    refreshPayments={refreshPayments}
                    closeModal={closeModal}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PaymentPopup;
