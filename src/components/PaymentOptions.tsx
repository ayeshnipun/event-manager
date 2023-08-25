import React, { useState } from "react";

const PaymentForm = ({ paymentState, handlePaymentState }: any) => {
  return (
    <div className="text-white">
      <div className="flex flex-row items-center mb-1 space-x-6 py-2">
        <div className="flex items-center">
          <input
            checked={paymentState.cash}
            onChange={handlePaymentState}
            type="checkbox"
            name="cash"
            id="cash"
            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
          />
          <label htmlFor="cash" className="ml-3 block text-sm text-white">
            Cash
          </label>
        </div>
        <div className="flex items-center">
          <input
            checked={paymentState.card}
            onChange={handlePaymentState}
            type="checkbox"
            name="card"
            id="card"
            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
          />
          <label htmlFor="card" className="ml-3 block text-sm text-white">
            Card
          </label>
        </div>
      </div>
      <div className="">
        <span className="font-medium">Payment amount:</span>
        <div className="grid grid-cols-1 gap-4 mt-3 w-1/2 md:w-full">
          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                checked={paymentState.minCheck}
                onChange={handlePaymentState}
                type="checkbox"
                name="minCheck"
                id="minCheck"
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
              />
              <label
                htmlFor="minCheck"
                className="ml-3 block text-sm text-white"
              >
                Minimum
              </label>
            </div>
            <div className="flex items-center">
              <input
                checked={paymentState.maxCheck}
                onChange={handlePaymentState}
                type="checkbox"
                name="maxCheck"
                id="maxCheck"
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
              />
              <label
                htmlFor="maxCheck"
                className="ml-3 block text-sm text-white"
              >
                Full
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="flex flex-row items-center justify-between space-x-3">
              <div className="flex items-center">
                <input
                  checked={paymentState.customCheck}
                  onChange={handlePaymentState}
                  type="checkbox"
                  name="customCheck"
                  id="customCheck"
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                />
                <label
                  htmlFor="customCheck"
                  className="ml-3 text-sm text-white"
                >
                  Custom amount
                </label>
              </div>
              <input
                disabled={!paymentState.customCheck}
                value={paymentState.custom}
                onChange={handlePaymentState}
                type="number"
                name="custom"
                id="custom"
                className="w-1/4 text-black rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
