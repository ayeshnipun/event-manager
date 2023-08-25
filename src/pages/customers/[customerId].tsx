import { useState, useEffect } from "react";
import type { NextPage } from "next";
import type { Client, Order } from "../../interfaces";
import Head from "next/head";
import Link from "next/link";
import { getCustomer, getCustomerOrders } from "../../hooks";
import EditCustomerModal from "../../components/EditCustomerModal";
import BackButton from "../../components/BackButton";

interface Props {
  customerId?: string;
}

const CustomerPage: NextPage = ({ customerId }: Props) => {
  const [customer, setCustomer] = useState<Client>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  const refresh = () => {
    setLoaded(false);
  };

  const fixDate = (date: string) => {
    return date.split("T")[0];
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!customerId) return;
      const orders = await getCustomerOrders(customerId);
      setOrders(orders);
    };
    if (!loaded) {
      fetchOrders();
    }
  }, [customerId, loaded]);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!customerId) return;
      const customers = await getCustomer(customerId);
      setCustomer(customers);
      setLoaded(true);
    };
    if (!loaded) {
      fetchCustomers();
    }
  }, [customerId, loaded]);

  return (
    <div>
      <Head>
        <title>{`Customer #${customerId}`}</title>
      </Head>
      <header className="bg-white shadow">
        <div className="flex mx-auto max-w-7xl items-center p-4 justify-between px-6 lg:px-8">
          <h1 className="text-2xl font-medium text-gray-600">
            Customer #{customerId}
          </h1>
        </div>
      </header>
      <BackButton />
      {!loaded ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : customer ? (
        <>
          <main className="max-w-5xl mx-auto px-3 sm:px-6 p-4">
            <div className="grid md:grid-cols-2 gap-4">
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
                  <EditCustomerModal client={customer} refresh={refresh} />
                </div>
                <div className="border-t border-gray-200">
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
                        Mobile
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {customer.mobileNumber}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {customer.emailAddress}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        License
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {customer.licenseNumber}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Physical Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {customer.physicalAddress.addressLine1}
                        <br />
                        {customer.physicalAddress.addressLine2}
                        <br />
                        {customer.physicalAddress.city},{" "}
                        {customer.physicalAddress.state}{" "}
                        {customer.physicalAddress.zipCode}
                        <br />
                        {customer.physicalAddress.country}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Postal Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {customer.postalAddress.addressLine1}
                        <br />
                        {customer.postalAddress.addressLine2}
                        <br />
                        {customer.postalAddress.city},{" "}
                        {customer.postalAddress.state}{" "}
                        {customer.postalAddress.zipCode}
                        <br />
                        {customer.postalAddress.country}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  {
                    // display the customer measurements according the the customer measurements model
                  }
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Measurements
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Customer measurements.
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Chest Size
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {customer.customerMeasurement.chestSize}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Coat Sleeve
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {customer.customerMeasurement.coatSleeveSize}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Pant Size
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {
                          // if the pantsizeid is 1 then display small, if 2 then display medium and if 3 then display large
                          customer.customerMeasurement.pantSizeId == 1
                            ? "Small"
                            : customer.customerMeasurement.pantSizeId == 2
                            ? "Medium"
                            : "Large"
                        }
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Waist Size
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {customer.customerMeasurement.waistSize}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Outseam
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {customer.customerMeasurement.outseam}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Pant Additional
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {customer.customerMeasurement.pantAdditional}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Shirt Size
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {customer.customerMeasurement.shirtSizeId == 1
                          ? "Small"
                          : customer.customerMeasurement.shirtSizeId == 2
                          ? "Medium"
                          : "Large"}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Shirt Sleeve Size
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {customer.customerMeasurement.shirtSleeveSize}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Coat Additional
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {customer.customerMeasurement.coatAdditionalInfo}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Coat Size
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {customer.customerMeasurement.coatSizeId == 1
                          ? "Small"
                          : customer.customerMeasurement.coatSizeId == 2
                          ? "Medium"
                          : "Large"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              {
                // display the orders
              }
              <div className="bg-white shadow overflow-hidden rounded-lg md:col-span-2">
                <div className="px-4 py-5 sm:px-6 flex justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Orders
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Customer orders.
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
                                  ID
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Event ID
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
                                        <Link href={`/events/${order.eventId}`}>
                                          {order.eventId}
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
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center p-6">
            <div className="text-2xl font-bold text-gray-700 mb-2">
              Customer not found
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CustomerPage.getInitialProps = async (ctx) => {
  const { customerId } = ctx.query;

  return { customerId: customerId };
};

export default CustomerPage;
