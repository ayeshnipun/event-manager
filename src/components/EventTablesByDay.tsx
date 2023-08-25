import React, { useEffect, useState } from "react";
import { Event } from "../interfaces";
import SmallEventCard from "./SmallEventCard";

const EventsTableByDay = ({ events }: { events: Event[] }) => {
  const [eventsToDisplay, seteventsToDisplay] = useState<Event[][]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // make an array of arrays of events
    const sortedEventsByDate = [] as Event[][];

    // sort the events by date into the array of arrays
    events.forEach((event) => {
      // check if there even is event date else return nothing
      if (!event.date) return;

      // slice the times off the dates
      const eventDate = event.date.slice(0, 10);
      // check if the date is already in the array of arrays
      const dateIndex = sortedEventsByDate.findIndex((day) => {
        return day[0].date.slice(0, 10) === eventDate;
      });
      // if the date is not in the array of arrays, add it
      if (dateIndex === -1) {
        sortedEventsByDate.push([event]);
      } else {
        // if the date is in the array of arrays, add the event to the array
        sortedEventsByDate[dateIndex].push(event);
      }
    });

    // update the state
    seteventsToDisplay(sortedEventsByDate);
    setLoaded(true);
  }, [events]);

  if (loaded) {
    return (
      <div className="py-6">
        <div className="bg-white shadow rounded-lg">
          <div className="flex-row p-6">
            {eventsToDisplay.map((day, index) => (
              <div key={index}>
                <div className="text-gray-900 text-lg font-bold">
                  {new Date(day[0].date).toLocaleString("en-US", {
                    timeZone: "UTC",
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="grid gap-4 my-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {day.map((event, i) => (
                    <SmallEventCard key={i} {...event} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default EventsTableByDay;
