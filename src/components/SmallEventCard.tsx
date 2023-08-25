import React from "react";
import type { Event } from "../interfaces";
import Link from "next/link";

const SmallEventCard = (event: Event) => {
  const formattedDate = new Date(event.date).toLocaleString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // display the time in 12-hour format with AM/PM
  const formattedTime = new Date(event.date).toLocaleString("en-US", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <Link
      href={`/events/${event.id}`}
      key={event.id}
      className="flex items-center space-x-4 px-4 py-3 rounded-md hover:bg-gray-100 hover:cursor-pointer"
    >
      <div className="flex-shrink-0">
        <div
          className={`
          h-10 w-10 rounded-full flex items-center justify-center
          ${
            // if event type wedding, use blue, if sweet 16 use pink, else use purple
            event.type === "Wedding"
              ? "bg-blue-200"
              : event.type === "Sweet 16"
              ? "bg-pink-200"
              : "bg-purple-200"
          }
        `}
        >
          <span
            className={`
            text-sm font-medium
            ${
              // if event type wedding, use blue, if sweet 16 use pink, else use purple
              event.type === "Wedding"
                ? "text-blue-600"
                : event.type === "Sweet 16"
                ? "text-pink-600"
                : "text-purple-600"
            }
          `}
          >
            {event.id}
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {event.organizer1}
          {"'s "}
          <span
            className={`
            text-sm font-medium
            ${
              // if event type wedding, use blue, if sweet 16 use pink, else use purple
              event.type === "Wedding"
                ? "text-blue-600"
                : event.type === "Sweet 16"
                ? "text-pink-600"
                : "text-purple-600"
            }
          `}
          >
            {event.type}
          </span>
        </p>
        <p className="text-sm text-gray-500 truncate">
          {formattedDate} at {formattedTime}
        </p>
      </div>
    </Link>
  );
};

export default SmallEventCard;
