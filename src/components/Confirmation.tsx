import React, { useState, useEffect } from "react";
import PaymentOptions from "./PaymentOptions";

const ItemCard = ({
  name,
  label,
  size,
  price,
  handlePriceChange,
  styleCode,
}: any) => {
  return (
    <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
      <div className="md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
        <div className="w-full flex justify-between items-center">
          <div>
            <h3 className="text-xl mb-3 text-white font-semibold leading-6">
              {label}
            </h3>
            <div className="flex justify-start items-start flex-col space-y-2">
              <p className="text-sm text-white leading-none">
                <span className="text-gray-400">Style:</span> {styleCode}
              </p>
              <p className="text-sm text-white leading-none">
                <span className="text-gray-400">Size: </span> {size}
              </p>
            </div>
          </div>
          <div>
            <span className="text-2xl text-white font-semibold leading-6 mr-1">
              $
            </span>
            <input
              onChange={handlePriceChange}
              value={price}
              type="number"
              name={name}
              id={name}
              className="w-16 text-2xl bg-gray-800 text-white rounded-md py-2 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Confirmation({
  event,
  client,
  order,
  handleOrderChange,
  styleTypes,
}: any) {
  const handlePriceChange = (e: any) => {
    // change the price of the item in the state
    handleOrderChange({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  // a function that updates the total price of the items and the minimum price (20% of the total)
  const updateTotal = () => {
    const total =
      Number(order.jacketPrice) +
      Number(order.shirtPrice) +
      Number(order.pantPrice);
    const minimum = total * 0.5;
    // if minCheck is true, set amountLeft to minimum
    // if maxCheck is true, set amountLeft to 0
    // if customCheck is true, set amountLeft to total - custom
    const amountLeft = order.minCheck
      ? minimum
      : order.maxCheck
      ? 0
      : order.customCheck
      ? total - order.custom
      : total * 0.5;

    console.log("amount left", amountLeft);
    handleOrderChange({
      ...order,
      amountLeft,
      total,
      minimum,
    });
  };

  const handleOrder = (e: any) => {
    // handle custom amount
    if (e.target.name === "custom") {
      handleOrderChange({
        ...order,
        custom: e.target.value,
      });
    }

    // change the cash or card state
    if (e.target.name === "cash") {
      handleOrderChange({
        ...order,
        cash: true,
        card: false,
      });
    }

    if (e.target.name === "card") {
      handleOrderChange({
        ...order,
        cash: false,
        card: true,
      });
    }

    // if the minimum payment is checked, uncheck the other two
    if (e.target.name === "minCheck") {
      handleOrderChange({
        ...order,
        minCheck: true,
        maxCheck: false,
        customCheck: false,
      });
    } else if (e.target.name === "maxCheck") {
      // if the maximum payment is checked, uncheck the other two
      handleOrderChange({
        ...order,
        minCheck: false,
        maxCheck: true,
        customCheck: false,
      });
    }
    // if the custom payment is checked, uncheck the other two
    else if (e.target.name === "customCheck") {
      handleOrderChange({
        ...order,
        minCheck: false,
        maxCheck: false,
        customCheck: true,
      });
    }
  };

  useEffect(() => {
    console.log("running updateTotals");
    updateTotal();
  }, [
    order.jacketPrice,
    order.shirtPrice,
    order.pantPrice,
    order.custom,
    order.minCheck,
    order.maxCheck,
    order.customCheck,
  ]);

  const getStyleCode = (style: any, id: any) => {
    const styleId = Number(id);
    const styleCode = style.filter((item: any) => item.id === styleId);
    console.log("styleCode", styleCode)
    return styleCode[0]?.code;
  };

  return (
    <>
      <div className="py-4">
        <div className="flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start rounded-md bg-gray-800  px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <h3 className="text-xl text-white font-semibold leading-5">
                Rental items
              </h3>
              <ItemCard
                label={"Jacket"}
                name={"jacketPrice"}
                size={"Small"}
                price={order.jacketPrice}
                styleCode={getStyleCode(styleTypes.coatTypes, event.coatStyle)}
                handlePriceChange={handlePriceChange}
              />
              <ItemCard
                label={"Shirt"}
                name={"shirtPrice"}
                size={"Small"}
                styleCode={getStyleCode(
                  styleTypes.shirtTypes,
                  event.shirtStyle
                )}
                handlePriceChange={handlePriceChange}
                price={order.shirtPrice}
              />
              <ItemCard
                label={"Pants"}
                name={"pantPrice"}
                size={"Small"}
                styleCode={getStyleCode(styleTypes.pantTypes, event.pantStyle)}
                handlePriceChange={handlePriceChange}
                price={order.pantPrice}
              />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 xl-gap-8">
              <div className="px-4 py-6 md:p-6 xl:p-8 w-full rounded-md bg-gray-800">
                <h3 className="text-xl text-white font-semibold leading-5 mb-3">
                  Payment options
                </h3>
                <PaymentOptions
                  paymentState={order}
                  handlePaymentState={handleOrder}
                />
              </div>
              <div className="px-4 py-6 md:p-6 xl:p-8 w-full rounded-md bg-gray-800 space-y-6">
                <h3 className="text-xl text-white font-semibold leading-5">
                  Payment details
                </h3>
                <div>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col">
                    <div className="flex justify-between w-full">
                      <p className="text-base text-white leading-4">
                        Order total
                      </p>
                      <p className="text-base text-gray-300 leading-4">
                        ${order.total}
                      </p>
                    </div>
                    <div className="flex justify-between items-center w-full border-gray-200 border-b pb-4">
                      <p className="text-base text-white leading-4">
                        Minimum deposit (50%)
                      </p>
                      <p className="text-base text-gray-300 leading-4">
                        ${(order.total * 0.5).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base text-white font-semibold leading-4">
                        Amount today
                      </p>
                      <p className="text-base text-gray-300 font-semibold leading-4">
                        $
                        {
                          // if the minimum payment is checked, show the minimum payment
                          order.minCheck
                            ? (order.total * 0.5).toFixed(2)
                            : // if the maximum payment is checked, show the maximum payment
                            order.maxCheck
                            ? order.total.toFixed(2)
                            : // if the custom payment is checked, show the custom payment
                            order.customCheck
                            ? order.custom
                            : // if none of the above, show the minimum payment
                              (order.total * 0.5).toFixed(2)
                        }
                      </p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base text-white leading-4">
                        Remaining
                      </p>
                      <p className="text-base text-gray-300 leading-4">
                        ${order.amountLeft.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-md bg-gray-800 w-full xl:w-96 flex items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl text-white font-semibold leading-5">
              Customer details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 w-full md:gap-8 xl:gap-0 py-6">
              <div className="flex flex-col justify-start items-start gap-4">
                <div className="flex w-full justify-start items-center space-x-4">
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base text-white font-semibold leading-4 text-left">
                      {client.firstName} {client.lastName}
                    </p>
                    <p className="text-sm text-gray-300 leading-5">
                      {client.mobileNumber}
                    </p>
                  </div>
                </div>

                <div className="flex justify-start text-white items-center space-x-4 py-4 border-b border-t border-gray-200 w-full">
                  <p className="cursor-pointer flex items-center text-sm leading-5 ">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 7L12 13L21 7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {client.emailAddress}
                  </p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row md:items-start">
                  <div className="flex justify-start md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base text-white font-semibold leading-4 md:text-left">
                      Address
                    </p>
                    <p className="w-48 lg:w-full text-gray-300 xl:w-48 md:text-left text-sm leading-5">
                      {client.physicalAddress.addressLine1}
                      {client.physicalAddress.addressLine2 && (
                        <>
                          <br />
                          {client.physicalAddress.addressLine2}
                        </>
                      )}
                      <br />
                      {client.physicalAddress.city},{" "}
                      {client.physicalAddress.state}{" "}
                      {client.physicalAddress.zipCode}
                      <br />
                      {client.physicalAddress.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
