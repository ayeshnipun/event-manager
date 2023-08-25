import Head from "next/head";
import type { NextPage } from "next";
import type { Event } from "../../../interfaces";
import { useState, useEffect } from "react";
import ClientInfoForm from "../../../components/ClientInfoForm";
import Stepper from "../../../components/Stepper";
import EventForm from "../../../components/EventForm";
import MeasurementForm from "../../../components/MeasurementForm";
import { useRouter } from "next/router";
import Confirmation from "../../../components/Confirmation";
import { getEvent } from "../../../hooks";
import Buttons from "../../../components/Buttons";
import type { Client } from "../../../interfaces";

const stepArray = [
  "Event Details",
  "Client Details",
  "Measurements",
  "Confirm",
];

interface Props {
  eventId?: string;
}

const NewCustomerPage: NextPage = ({ eventId }: Props) => {
  const router = useRouter();
  const [valid, setValid] = useState(true);
  const [step, setStep] = useState(2);
  const [event, setEvent] = useState<Event>();
  const [client, setClient] = useState<any>({
    firstName: "",
    lastName: "",
    secondLastName: "",
    emailAddress: "",
    mobileNumber: "",
    licenseNumber: "",
    workNumber: "",
    physicalAddress: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    postalAddress: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    customerMeasurement: {
      coatSizeId: 1,
      chestSize: 1,
      coatSleeveSize: 1,
      pantSizeId: 1,
      waistSize: "",
      outseam: "",
      pantAdditional: "",
      shirtSizeId: 3,
      shirtSleeveSize: "",
      coatAdditionalInfo: "",
    },
  });

  const [orderValid, setOrderValid] = useState(true);

  const [order, handleOrderChange] = useState({
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
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleAddressChange = (e: any) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      physicalAddress: { ...client.physicalAddress, [name]: value },
    });
  };

  const handlePostalAddressChange = (e: any) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      postalAddress: { ...client.postalAddress, [name]: value },
    });
  };

  const handleMeasurementChange = (e: any) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      customerMeasurement: { ...client.customerMeasurement, [name]: value },
    });
  };

  const checkClient = (client: Client) => {
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

  const checkEvent = (event: Event) => {
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

  const checkOrder = (order: any) => {
    // if customCheck is true make sure custom is filled out and is at least 20% of total
    if (order.customCheck) {
      if (order.custom < order.total * 0.2) {
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

  useEffect(() => {
    if (eventId) {
      getEvent(eventId).then((data) => setEvent(data));
    }
  }, [eventId]);

  const Submit = async () => {
    const builtClient = {
      ...client,
      customerMeasurement: {
        ...client.customerMeasurement,
        coatSizeId: parseInt(client.customerMeasurement.coatSizeId),
        coatSleezeSize: parseInt(client.customerMeasurement.coatSleezeSize),
        pantSizeId: parseInt(client.customerMeasurement.pantSizeId),
        shirtSizeId: 3,
      },
    };
    console.log(builtClient);
    const res = await fetch(
      "https://angelostuxedosapi.azurewebsites.net/api/events/" +
        eventId +
        "/customers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customers: [builtClient] }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.status === 201) {
      // post order info to api
      const orderRes = await fetch(
        "https://angelostuxedosapi.azurewebsites.net/api/order/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: data[0].id,
            eventId: eventId,
            orderDate: new Date(),
            pickUpDate: new Date(),
            price: order.total,
            returnDate: new Date(),
            storeId: 1,
          }),
        }
      );
      const orderData = await orderRes.json();
      console.log(orderData);
      if (orderRes.status === 201) {
        router.push("/events/" + eventId);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Add customer</title>
        <meta name="description" content="Add customer" />
      </Head>

      {event ? (
        <>
          <header className="bg-white shadow">
            <div className="mx-auto max-w-5xl py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Add customer to {event.organizer1 + "'s"} event
              </h1>
              <div className="w-full">
                <Stepper steps={stepArray} currentStepNumber={step} />
              </div>
            </div>
          </header>
          <main className="max-w-5xl py-6 mx-auto px-3 sm:px-6 ">
            {step === 1 && <EventForm event={event} />}
            {step === 2 && (
              <>
                <ClientInfoForm
                  client={client}
                  handleChange={handleChange}
                  handleClientPhysicalAddressChange={handleAddressChange}
                  handleClientPostalAddressChange={handlePostalAddressChange}
                />
              </>
            )}
            {step === 3 && (
              <MeasurementForm
                measurements={client.customerMeasurement}
                handleChange={handleMeasurementChange}
              />
            )}
            {step === 4 &&
              (console.log(JSON.stringify({ customers: [client] })),
              (
                <Confirmation
                  event={event}
                  client={client}
                  order={order}
                  handleOrderChange={handleOrderChange}
                />
              ))}
            {!valid && (
              <div className="flex ">
                <span className="w-full text-red-500 text-right">
                  Please fill in all fields marked with *
                </span>
              </div>
            )}
            {!orderValid && (
              <div className="flex ">
                <span className="w-full text-red-500 text-right">
                  Amount paid today must be at least minimum
                </span>
              </div>
            )}
            <Buttons
              step={step}
              setStep={setStep}
              submit={Submit}
              event={event}
              checkEvent={checkEvent}
              client={client}
              checkClient={checkClient}
              order={order}
              checkOrder={checkOrder}
            />
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

NewCustomerPage.getInitialProps = async (ctx) => {
  const { eventId } = ctx.query;
  return { eventId: eventId };
};

export default NewCustomerPage;
