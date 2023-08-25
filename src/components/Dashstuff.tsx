import React, { useState, useEffect } from "react";
import SmallEventCard from "./SmallEventCard";
import type { Event } from "../interfaces";
import { getAllEvents, filterEventsByDate } from "../hooks";
import Link from "next/link";

const UpcomingEventsCard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  // loading
  const [loading, setLoading] = useState(true);

  const getEvents = async () => {
    const events = await getAllEvents();
    const filteredEvents = filterEventsByDate(events);
    setEvents(filteredEvents);
    setLoading(false);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="h-full py-6 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
      <h5 className="text-xl text-gray-700">Upcoming events</h5>
      <div className="flex flex-col space-y-4">
        {
          // if loading, show loading spinner
          loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            // else, show events
            events.slice(0, 5).map((event: Event) => {
              return <SmallEventCard key={event.id} {...event} />;
            })
          )
        }
      </div>
    </div>
  );
};

const RecentlyAddedEventsCard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  // loading
  const [loading, setLoading] = useState(true);

  const getEvents = async () => {
    const events = await getAllEvents();
    setEvents(events.reverse());
    setLoading(false);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="h-full py-6 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
      <h5 className="text-xl text-gray-700">Recently added events</h5>
      <div className="flex flex-col space-y-4">
        {
          // if loading, show loading spinner
          loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            // else, show events
            events.slice(0, 5).map((event: Event) => {
              return <SmallEventCard key={event.id} {...event} />;
            })
          )
        }
      </div>
    </div>
  );
};

const Dashstuff = () => {
  return (
    <>
      <header className="bg-white shadow">
        <div className="flex mx-auto max-w-7xl items-center p-4 justify-between px-6 lg:px-8">
          <h1 className="text-2xl font-medium text-gray-600">Dashboard</h1>
          <Link
            href="/flow"
            className="ml-6 bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded flex justify-center"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
              />
            </svg>
            New Event
          </Link>
        </div>
      </header>

      <div className="px-6 pt-6 w-full flex justify-center mb-6">
        <div className="grid gap-4 max-w-7xl md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-1">
            <div className="h-full py-6 px-6 space-y-3 rounded-xl border border-gray-200 bg-white">
              <div>
                <h5 className="text-xl text-gray-700 mb-5">
                  Hoja de Ventas Diarias
                </h5>
                <div className="mt-2 flex gap-4">
                  <h3 className="text-4xl font-bold text-gray-700">$23,988</h3>
                  <div className="flex items-end gap-1 text-green-500">
                    <svg
                      className="w-3"
                      viewBox="0 0 12 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>2%</span>
                  </div>
                </div>
                <span className="block text-gray-500">Toda venta sin IVU</span>
              </div>
              <table className="w-full text-gray-600 ">
                <tbody>
                  <tr>
                    <td className="py-2">IVU Tax</td>
                    <td className="py-2 text-gray-500 flex justify-end">
                      $896
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">Toda venta incluyendo IVU</td>
                    <td className="py-2 text-gray-500 flex justify-end">
                      $1200
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">Tarjetas de crédito</td>
                    <td className="py-2 text-gray-500 flex justify-end">$12</td>
                  </tr>
                  <tr>
                    <td className="py-2">Efectivo</td>
                    <td className="py-2 text-gray-500 flex justify-end">$12</td>
                  </tr>
                </tbody>
              </table>
              <div className="w-full h-px bg-gradient-to-r from-blue-400 to-purple-400"></div>
              <table className="w-full text-gray-600 ">
                <tbody>
                  <tr>
                    <td className="py-2">Total de efectivo y tarteja</td>
                    <td className="py-2 text-gray-500 flex justify-end">$12</td>
                  </tr>
                  <tr>
                    <td className="py-2">Saldos</td>
                    <td className="py-2 text-gray-500 flex justify-end">$12</td>
                  </tr>
                  <tr>
                    <td className="py-2">Proposito</td>
                    <td className="py-2 text-gray-500 flex justify-end">$12</td>
                  </tr>
                  <tr>
                    <td className="py-2">Firma del Vendedor</td>
                    <td className="py-2 text-gray-500 flex justify-end">$12</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <UpcomingEventsCard />

          <RecentlyAddedEventsCard />
        </div>
      </div>
    </>
  );
};
export default Dashstuff;
