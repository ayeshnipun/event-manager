import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  getEvent,
  getCustomer,
  getStyleTypes,
  checkEvent,
  checkClient,
  postEvent,
  addNewCustomerToEvent,
  addExistingCustomerToEvent,
  postOrderWithPayment,
} from "../../hooks";
import type {
  Event,
  Client,
  Address,
  CustomerMeasurement,
  Accessory,
  EventAccessories,
} from "../../interfaces";
import Stepper from "../../components/Stepper";
import NewEventForm from "../../components/NewEventForm";
import ClientInfoForm from "../../components/ClientInfoForm";
import MeasurementForm from "../../components/MeasurementForm";
import Confirmation from "../../components/Confirmation";
import Buttons from "../../components/Buttons";
import { useRouter } from "next/router";

interface Props {
  event: Event;
  client: Client;
  step: number;
  styles: any;
  order: any;
  title: string;
}

const stepArray = [
  "Event Details",
  "Client Details",
  "Measurements",
  "Confirm",
];

export default function Page(props: Props) {
  const [step, setStep] = useState(props.step);
  const [valid, setValid] = useState(true);
  const [event, setEvent] = useState<Event>(props.event);
  const [client, setClient] = useState<Client>(props.client);
  const [order, setOrder] = useState<any>(props.order);
  const [orderValid, setOrderValid] = useState(true);

  const router = useRouter();

  // submit flow function
  const Submit = async () => {
    console.log(event);
    // if the event id is empty, post the new event with the new client
    if (!event.id) {
      postEvent(event, client)
        .then((response) => response.json())
        .then((res) => {
          console.log("Success:", res);
          // save the event id to redirect later
          const eventId = res.id;
          postOrderWithPayment(
            res.id,
            res.customers[0].id,
            client.firstName,
            order
          ).then(() => {
            // redirect to created event page
            router.push(`/events/${eventId}`);
          });
        })
        .catch((err) => console.log(err));
    }
    // if the event id is not empty, add the client to the event
    else if (event.id && !client.id) {
      addNewCustomerToEvent(event.id, client)
        .then((response) => response.json())
        .then((res) => {
          console.log("Success:", res);
          postOrderWithPayment(
            event.id,
            res[0].id,
            client.firstName,
            order
          ).then(() => {
            // redirect to event page
            router.push(`/events/${event.id}`);
          });
        })
        .catch((err) => console.log(err));
    }
    // if the event id and client id are not empty, attach the client to the event
    else if (event.id && client.id) {
      addExistingCustomerToEvent(event.id, client.id)
        .then((response) => response.json())
        .then((res) => {
          console.log("Success:", res);
          postOrderWithPayment(
            event.id,
            client.id,
            client.firstName,
            order
          ).then(() => {
            // redirect to event page
            router.push(`/events/${event.id}`);
          });
        })
        .catch((err) => console.log(err));
    }
  };

  // state change functions
  const handleEventChange = (e: any) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));

    // if the field being changed is the event date then update pickup and return dates to a week before and after the event respectively
    if (name === "date") {
      const date = new Date(value);
      const pickUpDate = new Date(date.setDate(date.getDate() - 7));
      const returnDate = new Date(date.setDate(date.getDate() + 14));
      setOrder((prevOrder: any) => ({
        ...prevOrder,
        pickUpDate: pickUpDate.toISOString().slice(0, 10),
        returnDate: returnDate.toISOString().slice(0, 10),
      }));
    }
  };

  const handleClientChange = (e: any) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleAccessoriesChange = (accessories: Accessory[]) => {
    const eventAccessories = convertToEventAccessories(accessories);

    setEvent((prevEvent) => ({
      ...prevEvent,
      eventAccesories: eventAccessories,
    }));

    console.log(eventAccessories);
  };

  const convertToEventAccessories = (
    accessories: Accessory[]
  ): EventAccessories[] => {
    const eventAccessories: EventAccessories[] = [];

    for (const accessory of accessories) {
      if (accessory.checked) {
        eventAccessories.push({
          accessoryId: accessory.name,
          accessoryInfo: accessory.note,
        });
      }
    }

    return eventAccessories;
  };

  const handleClientPhysicalAddressChange = (e: any) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      physicalAddress: {
        ...client.physicalAddress,
        [name]: value,
      },
    });
  };

  const handleClientPostalAddressChange = (e: any) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      postalAddress: {
        ...client.postalAddress,
        [name]: value,
      },
    });
  };

  const handleClientMeasurementChange = (e: any) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      customerMeasurement: {
        ...client.customerMeasurement,
        [name]: value,
      },
    });
  };

  const handleOrderChange = (e: any) => {
    const { name, value } = e.target;
    setOrder((prevOrder: any) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  // check functions
  const checkOrder = (order: any) => {
    // if customCheck is true make sure custom is filled out and is at least 50% of total
    if (order.customCheck) {
      if (order.custom < order.total * 0.5) {
        setOrderValid(false);
        return false;
      } else {
        setOrderValid(true);
        return true;
      }
    } else {
      setOrderValid(true);
      return true;
    }
  };

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-5xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {props.title}
          </h1>
          <div className="w-full">
            <Stepper steps={stepArray} currentStepNumber={step} />
          </div>
        </div>
      </header>
      <main className="max-w-5xl py-6 mx-auto px-3 sm:px-6 ">
        {step === 1 && (
          <NewEventForm
            event={event}
            handleChange={handleEventChange}
            handleAccessoriesChange={handleAccessoriesChange}
            styleTypes={props.styles}
          />
        )}
        {step === 2 && (
          <ClientInfoForm
            client={client}
            handleChange={handleClientChange}
            handleClientPhysicalAddressChange={
              handleClientPhysicalAddressChange
            }
            handleClientPostalAddressChange={handleClientPostalAddressChange}
          />
        )}
        {step === 3 && (
          <MeasurementForm
            measurements={client.customerMeasurement}
            handleChange={handleClientMeasurementChange}
          />
        )}
        {!valid && (
          <div className="flex ">
            <span className="w-full text-red-500 text-right">
              Please fill in all fields marked with *
            </span>
          </div>
        )}
        {step === 4 && (
          <Confirmation
            event={event}
            client={client}
            order={order}
            styleTypes={props.styles}
            handleOrderChange={setOrder}
          />
        )}
        {step === 4 && !orderValid && (
          <div className="flex ">
            <span className="w-full text-red-500 text-right">
              Custom amount must be at least 50% of total
            </span>
          </div>
        )}
        <Buttons
          step={step}
          setStep={setStep}
          event={event}
          client={client}
          checkEvent={checkEvent}
          checkClient={checkClient}
          order={order}
          handleOrderChange={handleOrderChange}
          checkOrder={checkOrder}
          submit={Submit}
          setValid={setValid}
        />
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  // get styles
  const styles = await getStyleTypes();

  // default client object
  const defaultClient = {
    firstName: "",
    lastName: "",
    secondLastName: "",
    mobileNumber: "",
    workNumber: "",
    licenseNumber: "",
    emailAddress: "",
    physicalAddress: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    } as Address,
    postalAddress: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    } as Address,
    customerMeasurement: {
      chestSize: 1,
      coatSleeveSize: 1,
      waistSize: "",
      outseam: "",
      pantAdditional: "",
      shirtSizeId: 3,
      shirtSleeveSize: "",
      coatAdditionalInfo: "",
      coatSizeId: 1,
      coatSleezeSize: 1,
      pantSizeId: 1,
    } as CustomerMeasurement,
  } as Client;

  // default order object
  const order = {
    pantPrice: 0,
    shirtPrice: 0,
    jacketPrice: 0,
    total: 0,
    minimum: 0,
    custom: 0,
    cash: false,
    card: false,
    minCheck: true,
    maxCheck: false,
    customCheck: false,
    amountLeft: 0,
    pickUpDate: "",
    returnDate: "",
  };

  // if no params in url, return default objects as props
  if (!context.query.slug) {
    return {
      props: {
        title: "Create New Event",
        step: 1,
        event: {
          organizer1: "",
          organizer1phone: "",
          organizer2: "",
          organizer2phone: "",
          time: "12:00",
          date: "",
          type: "Wedding",
          coatStyle: styles.coatTypes[0].id,
          shirtStyle: styles.shirtTypes[0].id,
          pantStyle: styles.pantTypes[0].id,
        } as Event,
        client: defaultClient,
        order,
        styles,
      },
    };
  }

  // if only one param in url, return event and default client props
  if (context.query.slug.length === 1) {
    const event = await getEvent(context.query.slug[0]);

    const date = new Date(event.date);
    const pickUpDate = new Date(date.setDate(date.getDate() - 7));
    const returnDate = new Date(date.setDate(date.getDate() + 14));
    return {
      props: {
        title: `New customer to ${event.organizer1}'s ${event.type}`,
        step: 2,
        event,
        client: defaultClient,
        order: {
          ...order,
          pickUpDate: pickUpDate.toISOString().slice(0, 10),
          returnDate: returnDate.toISOString().slice(0, 10),
        },
        styles,
      },
    };
  }

  // if more than two params in url, return event and customer props, ignore the rest
  if (context.query.slug.length > 1) {
    const event = await getEvent(context.query.slug[0]);
    const client = await getCustomer(context.query.slug[1]);

    const date = new Date(event.date);
    const pickUpDate = new Date(date.setDate(date.getDate() - 7));
    const returnDate = new Date(date.setDate(date.getDate() + 14));

    return {
      props: {
        title: `Add ${client.firstName} to ${event.organizer1}'s ${event.type}`,
        step: 4,
        event,
        client,
        order: {
          ...order,
          pickUpDate: pickUpDate.toISOString().slice(0, 10),
          returnDate: returnDate.toISOString().slice(0, 10),
        },
        styles,
      },
    };
  }
}
