import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Event } from "../../interfaces";
import Link from "next/link";
import { getAllEvents } from "../../hooks";
import EventTableByDay from "../../components/EventTablesByDay";
import EventTools from "../../components/EventTools";

// filter events to only show events that have not passed
const filterEventsByDate = (events: Event[]) => {
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

const SearchBox = ({ handleSearch }: any) => {
  return (
    <div className="ml-auto flex space-x-4">
      <div className="block">
        <div className="relative flex items-center text-gray-400 focus-within:text-sky-400">
          <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
            <svg
              xmlns="http://ww50w3.org/2000/svg"
              className="w-4 fill-current"
              viewBox="0 0 35.997 36.004"
            >
              <path
                id="Icon_awesome-search"
                data-name="search"
                d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
              ></path>
            </svg>
          </span>
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by organizer"
            className="w-full pl-14 pr-4 py-2.5 rounded text-sm text-gray-600 outline-none border-0 border-gray-300 focus:border-sky-500 transition"
          />
        </div>
      </div>
    </div>
  );
};

const EventsPage: NextPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsToDisplay, setEventsToDisplay] = useState<Event[]>([]);
  const [eventsLoaded, setEventsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  //todays date in the format of yyyy-mm-dd
  const dateToday = new Date().toISOString().slice(0, 10);

  // the date 7 days from now in the format of yyyy-mm-dd
  const date7DaysFromNow = new Date(
    new Date().setDate(new Date().getDate() + 7)
  )
    .toISOString()
    .slice(0, 10);

  const [dateRange, setDateRange] = useState({
    startDate: dateToday,
    endDate: date7DaysFromNow,
  });

  // fetch events from the database
  const fetchEvents = async () => {
    const events = await getAllEvents();
    setEvents(events);
    setEventsLoaded(true);
  };

  // function that sets eventloaded to false, which triggers the useEffect
  const refreshEvents = () => {
    setEventsLoaded(false);
  };

  // effect that refreshes events when an update is made
  useEffect(() => {
    fetchEvents();
  }, [eventsLoaded]);

  const handleSearch = (e: any) => {
    setSearch(e);
    if (showAll) {
      const filteredEvents = events.filter((event: any) => {
        // check if there is an organizer1
        if (event.organizer1 === null) return false;
        return event.organizer1.toLowerCase().includes(e.toLowerCase());
      });
      setEventsToDisplay(filteredEvents);
    } else {
      const filteredEvents = eventsToDisplay.filter((event: any) => {
        return event.organizer1.toLowerCase().includes(e.toLowerCase());
      });
      setEventsToDisplay(filteredEvents);
    }
  };

  const setEventsToDisplayByDateRange = () => {
    // function to filter events that are within the date range
    // the event dates are in the format of yyyy-mm-ddT00:00:00.000Z
    // so we need to slice the string to get the date
    const filteredEvents = events.filter((event: any) => {
      if (event.date === null) return false;
      const eventDate = event.date.slice(0, 10);
      return eventDate >= dateRange.startDate && eventDate <= dateRange.endDate;
    });

    // order the events by date, most recent first
    filteredEvents.sort((a: any, b: any) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA < dateB ? -1 : 1;
    });

    setEventsToDisplay(filteredEvents);
  };

  const handleDateRange = (e: any) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  // effect to filter events by date
  useEffect(() => {
    if (showAll) {
      setSearch("");
      setEventsToDisplay(events);
    } else {
      setSearch("");
      const filteredEventsByDate = filterEventsByDate(events);
      setEventsToDisplay(filteredEventsByDate);
    }
  }, [showAll, events]);

  return (
    <>
      <Head>
        <title>Events</title>
      </Head>
      <header className="bg-white shadow">
        <div className="flex mx-auto max-w-7xl items-center p-4 justify-between px-6 lg:px-8">
          <h1 className="text-2xl font-medium text-gray-600">Events</h1>
          <SearchBox handleSearch={handleSearch} />
          <div className="hidden md:flex ml-6 flex items-center">
            <input
              type="radio"
              name="showAll"
              id="showAll"
              checked={showAll}
              onChange={() => {
                setShowAll(true);
                setEventsLoaded(false);
                setSearch("");
                fetchEvents();
              }}
            />
            <label htmlFor="showAll" className="ml-2 mr-4">
              Show All
            </label>
            <input
              type="radio"
              name="showAll"
              id="showFuture"
              checked={!showAll}
              onChange={() => {
                setShowAll(false);
                setEventsLoaded(false);
                setSearch("");
                fetchEvents();
              }}
            />
            <label htmlFor="showFuture" className="ml-2">
              Show upcoming
            </label>
          </div>
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
      <main className="max-w-6xl sm:px-6 lg:px-8 mx-auto">
        <EventTools
          dateRange={dateRange}
          setEventsToDisplayByDateRange={setEventsToDisplayByDateRange}
          handleDateRange={handleDateRange}
        />
        {eventsLoaded ? (
          events.length === 0 ? (
            <div className="mt-10">No events found.</div>
          ) : search.length > 0 ? (
            eventsToDisplay.length > 0 ? (
              <>
                <EventTableByDay events={eventsToDisplay} />
              </>
            ) : (
              <div className="text-center text-2xl mt-10">No results found</div>
            )
          ) : !showAll ? (
            <>
              <EventTableByDay events={eventsToDisplay} />
            </>
          ) : (
            <>
              <EventTableByDay events={eventsToDisplay} />
            </>
          )
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
              {" "}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default EventsPage;
