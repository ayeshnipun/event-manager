import type { Event, Payment, Order, Client } from "./interfaces";

const baseUrl = "https://angelostuxedosapi.azurewebsites.net/api";

export const getAllEvents = async () => {
  const res = await fetch(baseUrl + "/events");
  const data = await res.json();
  return data;
};

export const getEvent = async (eventId: string) => {
  const res = await fetch(baseUrl + "/events/" + eventId);
  const data = await res.json();

  const date = new Date(data.date);
  const dateStr = date.toISOString().split("T")[0];
  const timeStr = date
    .toISOString()
    .split("T")[1]
    .split(":")
    .slice(0, 2)
    .join(":");

  return { ...data, date: dateStr, time: timeStr };
};

export const getEventCustomers = async (eventId: string) => {
  const res = await fetch(baseUrl + "/events/" + eventId + "/customers");
  const data = await res.json();
  return data;
};

export const getCustomer = async (customerId: string) => {
  const res = await fetch(baseUrl + "/customer/" + customerId);
  const data = await res.json();
  return data;
};

export const filterEventsByDate = (events: Event[]) => {
  const filteredEvents = events.filter((e: any) => {
    const eventDate = new Date(e.date);
    const today = new Date();
    return eventDate > today;
  });

  // order the events by date, most recent first
  filteredEvents.sort((a: any, b: any) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA < dateB ? -1 : 1;
  });

  return filteredEvents;
};

// function to post a new event to the API
export const postNewEvent = async (event: any) => {
  const res = await fetch(baseUrl + "/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  return res;
};

export const postEvent = async (event: Event, client: Client) => {
  const eventToPost = {
    ...event,
    pantStyle: 1,
    coatStyle: 1,
    shirtStyle: 1,
    date: `${event.date}T${event.time}:00.000Z`,
    customers: [client],
  };

  const res = await fetch(baseUrl + "/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventToPost),
  });

  return res;
};

export const addNewCustomerToEvent = async (
  eventId: number,
  client: Client
) => {
  const res = await fetch(baseUrl + "/events/" + eventId + "/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ customers: [client] }),
  });

  return res;
};

export const addExistingCustomerToEvent = async (
  eventId: number,
  customerId: number
) => {
  const res = await fetch(
    baseUrl + "/events/" + eventId + "/attach-customers",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerIds: [customerId] }),
    }
  );

  return res;
};

export const updateEvent = async (event: Event) => {
  const date = new Date(event.date + "T" + event.time + ":00.000Z");

  const res = await fetch(baseUrl + "/events/" + event.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...event,
      date: date.toISOString(),
    }),
  });

  return res;
};

export const updateCustomer = async (customer: any) => {
  const res = await fetch(baseUrl + "/customer/" + customer.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  return res;
};

export const getCustomerOrders = async (customerId: string) => {
  const res = await fetch(baseUrl + "/order");
  const data = await res.json();

  //find all orders for the customer
  const customerOrders = data.filter(
    (o: any) => o.customerId === parseInt(customerId)
  );

  // order the orders by date, most recent first
  customerOrders.sort((a: any, b: any) => {
    const dateA = new Date(a.orderDate);
    const dateB = new Date(b.orderDate);
    return dateA < dateB ? -1 : 1;
  });

  return customerOrders;
};

export const getEventOrders = async (eventId: string) => {
  const res = await fetch(baseUrl + "/order");
  const data = await res.json();

  //find all orders for the event
  const eventOrders = data.filter((o: any) => o.eventId === parseInt(eventId));

  // order the orders by date, most recent first
  eventOrders.sort((a: any, b: any) => {
    const dateA = new Date(a.orderDate);
    const dateB = new Date(b.orderDate);
    return dateA < dateB ? -1 : 1;
  });

  return eventOrders;
};

export const getOrder = async (orderId: string) => {
  const res = await fetch(baseUrl + "/order/" + orderId);
  // if res.status is 404, return null
  if (res.status === 404) {
    return null;
  } else {
    const data = await res.json();
    return data;
  }
};

export const getPaymentsByOrder = async (orderId: string) => {
  const res = await fetch(baseUrl + "/payments/order/" + orderId);
  const data = await res.json();
  return data;
};

export const getStyleTypes = async () => {
  const shirtRes = await fetch(baseUrl + "/types/shirts");
  const shirts = await shirtRes.json();

  const pantRes = await fetch(baseUrl + "/types/pants");
  const pants = await pantRes.json();

  const coatRes = await fetch(baseUrl + "/types/coats");
  const coats = await coatRes.json();

  return { shirtTypes: shirts, pantTypes: pants, coatTypes: coats };
};

export const postOrderWithPayment = async (
  eventId: any,
  customerId: any,
  customerName: string,
  order: any
) => {
  const orderToPost: Order = {
    customerId,
    eventId,
    orderDate: new Date().toISOString(),
    // pickupdate convert string to date
    pickUpDate: order.pickUpDate,
    price: order.total,
    returnDate: order.returnDate,
    storeId: 1,
  };
  postOrder(orderToPost)
    .then((response) => response.json())
    .then((data) => {
      console.log("Successfully posted order:", data);
      const paymentAmount = order.total - order.amountLeft;
      const paymentData: Payment = {
        orderId: data.id,
        paymentDate: new Date(),
        paymentAmount,
        amountLeft: order.amountLeft,
        customerName,
      };
      postPayment(paymentData)
        .then((response) => response.json())
        .then((data) => {
          console.log("Success posted payment:", data);
          return data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const postPayment = async (payment: Payment) => {
  const res = await fetch(baseUrl + "/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payment),
  });

  return res;
};

export const postOrder = async (order: any) => {
  const res = fetch(baseUrl + "/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  return res;
};

// function that checks event object for required fields and returns true if all required fields are filled
export const checkEvent = (event: Event, setValid: any) => {
  if (
    event.organizer1 &&
    event.organizer1phone &&
    event.date &&
    event.time &&
    event.type &&
    event.coatStyle &&
    event.shirtStyle &&
    event.pantStyle
  ) {
    console.log("event is valid:", event);
    setValid(true);
    return true;
  } else {
    console.log("event is not valid", event);
    setValid(false);
    return false;
  }
};

// function that checks if required fields in client object are filled out in the form
export const checkClient = (client: Client, setValid: any) => {
  if (
    client.firstName &&
    client.lastName &&
    client.licenseNumber &&
    client.mobileNumber &&
    client.physicalAddress.addressLine1 &&
    client.physicalAddress.city &&
    client.physicalAddress.state &&
    client.physicalAddress.zipCode &&
    client.physicalAddress.country
  ) {
    setValid(true);
    console.log("client is valid:", client);
    return true;
  } else {
    setValid(false);
    console.log("client is invalid", client);
    return false;
  }
};

export const searchCustomers = async (query: string) => {
  const res = await fetch(baseUrl + `/customer/search/${query}`);
  const data = await res;
  return data;
};
