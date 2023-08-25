import Head from "next/head";
import type { NextPage } from "next";
import type { Event, Client, Order } from "../../interfaces";
import { useState, useEffect } from "react";
import { getEvent, getEventCustomers, getEventOrders } from "../../hooks";
import CustomerSearch from "../../components/CustomerSearch";
import EditEventModal from "../../components/EditEventModal";
import SmallCustomerCard from "../../components/SmallCustomerCard";
import Link from "next/link";
import BackButton from "../../components/BackButton";

interface Props {
  eventId?: string;
}

const EventPage: NextPage = ({ eventId }: Props) => {
  const [event, setEvent] = useState<Event>();
  const [customers, setCustomers] = useState([] as Client[]);
  const [customersLoaded, setCustomersLoaded] = useState(false);
  const [orders, setOrders] = useState([] as Order[]);

  useEffect(() => {
    if (eventId) {
      getEvent(eventId)
        .then((data) => {
          setEvent(data);
        })
        .catch((err) => {
          console.log(err);
        });
      getEventCustomers(eventId).then((data) => {
        setCustomers(data);
        setCustomersLoaded(true);
      });
      getEventOrders(eventId).then((data) => {
        setOrders(data);
      });
    }
  }, [eventId]);

  const refresh = () => {
    if (eventId) {
      getEvent(eventId)
        .then((data) => {
          setEvent(data);
        })
        .catch((err) => {
          console.log(err);
        });
      getEventCustomers(eventId).then((data) => {
        setCustomers(data);
        setCustomersLoaded(true);
      });
    }
  };

  const fixDate = (date: string) => {
    return date.split("T")[0];
  };

  console.log(orders);

  return (
    <>
      <Head>
        <title>{`Event #${eventId}`}</title>
      </Head>
      <header className="bg-white shadow">
        <div className="flex mx-auto max-w-7xl items-center p-4 justify-between px-6 lg:px-8">
          <h1 className="text-2xl font-medium text-gray-600">
            Event #{eventId}
          </h1>
          <div className="flex">
            <CustomerSearch eventId={Number(eventId)} />
            <Link
              href={`/flow/${eventId}`}
              className="ml-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center"
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                />
              </svg>
              New customer
            </Link>
          </div>
        </div>
      </header>
      <BackButton />
      {event ? (
        <>
          <main className="max-w-5xl mx-auto px-3 sm:px-6 p-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Event Details
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Event details and information.
                    </p>
                  </div>
                  <EditEventModal event={event} refresh={refresh} />
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {event.date} {event.time}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Organizer 1
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {event.organizer1}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Organizer 1 Phone
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {event.organizer1phone}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Organizer 2
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {event.organizer2}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Organizer 2 Phone
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {event.organizer2phone}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Pants Style ID
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {event.pantStyle}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Coat Style ID
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {event.coatStyle}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Shirt Style ID
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {event.shirtStyle}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Customers
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Customers hiring for the event.
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200">
                  <div className="p-3">
                    {
                      // if customersLoaded is false, display loading message
                      // else display the customers
                      // if customers is 0 display no customers message
                      !customersLoaded ? (
                        <div className="flex justify-center pt-10">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                        </div>
                      ) : customers.length === 0 ? (
                        <div className="text-center">
                          <p className="text-gray-500">No customers yet.</p>
                        </div>
                      ) : (
                        customers.map((customer) => (
                          <SmallCustomerCard
                            key={customer.id}
                            customer={customer}
                          ></SmallCustomerCard>
                        ))
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="bg-white shadow overflow-hidden rounded-lg md:col-span-2">
                <div className="px-4 py-5 sm:px-6 flex justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Orders
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Event orders.
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-5">
                  <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Order ID
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Customer ID
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Order Date
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Pickup
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Return
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Store
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Price
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {
                                // if orders are not empty
                                orders.length > 0 ? (
                                  orders.map((order) => (
                                    <tr key={order.id}>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                          <Link href={`/orders/${order.id}`}>
                                            {order.id}
                                          </Link>
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <Link
                                          href={`/customers/${order.customerId}`}
                                        >
                                          {order.customerId}
                                        </Link>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                          {fixDate(order.orderDate)}
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {fixDate(order.pickUpDate)}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {fixDate(order.returnDate)}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.storeId}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${order.price}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">
                                        No orders found
                                      </div>
                                    </td>
                                  </tr>
                                )
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
            {" "}
          </div>
        </div>
      )}
    </>
  );
};

EventPage.getInitialProps = async (ctx) => {
  const { eventId } = ctx.query;
  return { eventId: eventId };
};

export default EventPage;
