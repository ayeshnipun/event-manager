import React, { useState, useEffect } from "react";
import type { Event } from "../interfaces";
import EditEventModal from "./EditEventModal";

const EventForm: React.FC<{ event: Event }> = ({ event }) => {
  const [editMode, setEditMode] = useState(false);
  const [eventState, setEventState] = useState(event);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventState({ ...eventState, [name]: value });
  };

  if (eventState) {
    return (
      <>
        <div className="text-gray-600">
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="organizer1"
                  className="mb-3 block text-base font-semibold"
                >
                  Name of organizer
                </label>
                <input
                  type="text"
                  placeholder="Name of organizer"
                  name="organizer1"
                  id="organizer1"
                  value={eventState.organizer1}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 font-thin text-gray-600 outline-none"
                />
              </div>
            </div>

            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="organizer1phone"
                  className="mb-3 block text-base font-semibold"
                >
                  Contact number
                </label>
                <input
                  type="text"
                  disabled={!editMode}
                  name="organizer1phone"
                  id="organizer1phone"
                  placeholder="Contact number 1"
                  value={eventState.organizer1phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 font-thin text-gray-600 outline-none"
                />
              </div>
            </div>
          </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="organizer2"
                  className="mb-3 block text-base font-semibold"
                >
                  Name of organizer 2
                </label>
                <input
                  disabled={!editMode}
                  type="text"
                  name="organizer2"
                  id="organizer2"
                  placeholder="Name of organizer"
                  value={eventState.organizer2}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 font-thin text-gray-600 outline-none"
                />
              </div>
            </div>

            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="organizer2phone"
                  className="mb-3 block text-base font-semibold"
                >
                  Contact number 2
                </label>
                <input
                  disabled={!editMode}
                  type="text"
                  name="organizer2phone"
                  id="organizer2phone"
                  placeholder="Contact number 2"
                  value={eventState.organizer2phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 font-thin text-gray-600 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="date"
                  className="mb-3 block text-base font-semibold"
                >
                  Event Date
                </label>
                <input
                  disabled={!editMode}
                  type="date"
                  name="date"
                  id="date"
                  value={eventState.date}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 font-thin text-gray-600 outline-none"
                />
              </div>
            </div>

            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="time"
                  className="mb-3 block text-base font-semibold"
                >
                  Time of event
                </label>
                <input
                  disabled={!editMode}
                  type="time"
                  name="time"
                  id="time"
                  value={eventState.time}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 font-thin text-gray-600 outline-none"
                />
              </div>
            </div>
          </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="type"
                  className="mb-3 block text-base font-semibold"
                >
                  Type of event
                </label>
                <div className="relative w-full">
                  <input
                    disabled={!editMode}
                    name="type"
                    id="type"
                    value={eventState.type}
                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 font-thin text-gray-600 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div>loading</div>;
  }
};

export default EventForm;
