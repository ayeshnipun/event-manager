import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import type { Order } from "../../interfaces";
import PaymentPopup from "../../components/PaymentPopup";
import BackButton from "../../components/BackButton";
import ReturnsPopup from "../../components/ReturnsPopup";
import { getOrder, getCustomer, getPaymentsByOrder } from "../../hooks";

interface Props {
  orderId?: string;
}

const OrderPage: NextPage = ({ orderId }: Props) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [paymentsLoaded, setPaymentsLoaded] = useState(false);
  const [payments, setPayments] = useState<any>([]);
  const [amountLeft, setAmountLeft] = useState(0);
  const [customer, setCustomer] = useState<any>([]);
  const [customerLoaded, setCustomerLoaded] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    getOrder(orderId).then((data) => {
      setOrder(data);
      fetchCustomer(data.customerId);
      getPayments(orderId);
    });
  }, []);

  const fetchCustomer = async (customerId: any) => {
    const customers = await getCustomer(customerId);
    setCustomer(customers);
    setCustomerLoaded(true);
  };

  const refreshPayments = () => {
    setPaymentsLoaded(false);
    getPayments(orderId);
  };

  const getPayments = (orderId: any) => {
    getPaymentsByOrder(orderId).then((data) => {
      // order payments by highest id first
      data.sort((a: any, b: any) => b.id - a.id);
      // set amount left to the first payment
      setAmountLeft(data[0]?.amountLeft);
      setPayments(data);
      setPaymentsLoaded(true);
    });
  };

  const fixDate = (date: string) => {
    return date.split("T")[0];
  };

  if (order) {
    return (
      <>
        <Head>
          <title>Order #{orderId}</title>
        </Head>
        <header className="bg-white shadow">
          <div className="flex mx-auto max-w-7xl items-center p-4 justify-between px-6 lg:px-8">
            <h1 className="text-2xl font-medium text-gray-600">
              Order #{orderId}
            </h1>
            <ReturnsPopup orderId={orderId} />
          </div>
        </header>
        <BackButton />
        <main className="max-w-5xl mx-auto px-3 sm:px-6 p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Order Details
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Order details and information.
                  </p>
                </div>
                <div className="flex items-center">
                  {paymentsLoaded && amountLeft == 0 ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Paid
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Unpaid
                    </span>
                  )}
                </div>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Order ID
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {orderId}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Customer ID
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {order?.customerId}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Event ID
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {order?.eventId}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      ${order?.price}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Pick Up Date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {fixDate(order.pickUpDate)}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Return Date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {fixDate(order.returnDate)}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Pick Up Location
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {order?.storeId}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Order Date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {fixDate(order.orderDate)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Customer Details
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Customer details and information.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200">
                {
                  // if customerloaded is false display loading
                  !customerLoaded ? (
                    <div className="flex justify-center pt-10">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                    </div>
                  ) : (
                    <dl>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {customer.firstName} {customer.lastName}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {customer.emailAddress}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Phone Number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {customer.mobileNumber}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          License Number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {customer.licenseNumber}
                        </dd>
                      </div>
                    </dl>
                  )
                }
              </div>
            </div>
          </div>
          <div className="bg-white mt-4 shadow overflow-hidden rounded-lg md:col-span-2">
            <div className="px-4 py-5 sm:px-6 flex justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Payments
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Payment made.
                </p>
              </div>
              <div className="flex items-center">
                {customerLoaded && amountLeft > 0 ? (
                  <PaymentPopup
                    customerName={customer.firstName}
                    amountLeft={amountLeft}
                    orderId={orderId}
                    refreshPayments={refreshPayments}
                  />
                ) : paymentsLoaded && payments.length === 0 ? (
                  <PaymentPopup
                    customerName={customer.firstName}
                    amountLeft={order.price}
                    orderId={orderId}
                    refreshPayments={refreshPayments}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5">
              <div className=" flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    {!paymentsLoaded ? (
                      <div className="flex justify-center px-5">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                      </div>
                    ) : (
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Payment ID
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Payment Date
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Payment Amount
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Amount Left
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Customer Name
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {
                              // if orders are not empty
                              payments.length > 0 ? (
                                payments.map((payment: any) => (
                                  <tr key={payment.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">
                                        {payment.id}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">
                                        {fixDate(payment.paymentDate)}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">
                                        ${payment.paymentAmount}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">
                                        ${payment.amountLeft}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">
                                        {payment.customerName}
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      No payments made
                                    </div>
                                  </td>
                                </tr>
                              )
                            }
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Order #</title>
        </Head>
        <div>No order found</div>
      </>
    );
  }
};

export default OrderPage;

OrderPage.getInitialProps = async (ctx) => {
  const { orderId } = ctx.query;
  return { orderId: orderId };
};
